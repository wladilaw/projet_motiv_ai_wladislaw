import { type NextRequest, NextResponse } from "next/server"
import { blobService } from "@/lib/blob"
import { createServerComponentClient } from "@/lib/supabase"
import { cacheService } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const userId = formData.get("userId") as string
    const type = formData.get("type") as string // 'avatar', 'cv', 'document'

    if (!file || !userId || !type) {
      return NextResponse.json({ error: "Fichier, userId et type requis" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = {
      avatar: ["image/jpeg", "image/png", "image/webp"],
      cv: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      document: ["application/pdf", "image/jpeg", "image/png"],
    }

    if (!allowedTypes[type as keyof typeof allowedTypes]?.includes(file.type)) {
      return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split(".").pop()
    const filename = `${type}/${userId}/${timestamp}.${extension}`

    // Upload to Vercel Blob
    const blob = await blobService.uploadFile(file, filename)

    // Save file info to database
    const supabase = createServerComponentClient()
    const { data: fileRecord, error: dbError } = await supabase
      .from("user_files")
      .insert({
        user_id: userId,
        file_type: type,
        file_name: file.name,
        file_url: blob.url,
        file_size: file.size,
        mime_type: file.type,
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      // Try to cleanup uploaded file
      try {
        await blobService.deleteFile(blob.url)
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError)
      }
      return NextResponse.json({ error: "Erreur lors de la sauvegarde" }, { status: 500 })
    }

    // Update user profile if avatar
    if (type === "avatar") {
      await supabase.from("users").update({ avatar_url: blob.url }).eq("id", userId)

      // Clear user profile cache
      await cacheService.del(`user:profile:${userId}`)
    }

    return NextResponse.json({
      success: true,
      file: fileRecord,
      url: blob.url,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Erreur lors du téléchargement" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get("fileId")
    const userId = searchParams.get("userId")

    if (!fileId || !userId) {
      return NextResponse.json({ error: "fileId et userId requis" }, { status: 400 })
    }

    const supabase = createServerComponentClient()

    // Get file info
    const { data: fileRecord, error: fetchError } = await supabase
      .from("user_files")
      .select("*")
      .eq("id", fileId)
      .eq("user_id", userId)
      .single()

    if (fetchError || !fileRecord) {
      return NextResponse.json({ error: "Fichier non trouvé" }, { status: 404 })
    }

    // Delete from Blob storage
    await blobService.deleteFile(fileRecord.file_url)

    // Delete from database
    const { error: deleteError } = await supabase.from("user_files").delete().eq("id", fileId)

    if (deleteError) {
      console.error("Delete error:", deleteError)
      return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
