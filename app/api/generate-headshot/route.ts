// Simplifier l'API pour utiliser des services gratuits
import { type NextRequest, NextResponse } from "next/server"
import { falService } from "@/lib/fal"
import { createServerComponentClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { userId, type = "professional", style = "business" } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "userId requis" }, { status: 400 })
    }

    // Générer une image placeholder professionnelle
    const imageResult = await falService.generateHeadshot(`${type} ${style} headshot`)

    // Optionnel: sauvegarder l'URL en base
    const supabase = createServerComponentClient()
    const { data: imageRecord } = await supabase
      .from("user_files")
      .insert({
        user_id: userId,
        file_type: "generated_avatar",
        file_name: `headshot-${Date.now()}.png`,
        file_url: imageResult.url,
        file_size: 0, // Placeholder
        mime_type: "image/png",
      })
      .select()
      .single()

    return NextResponse.json({
      success: true,
      image: imageResult,
      file: imageRecord,
    })
  } catch (error) {
    console.error("Generate headshot error:", error)
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 })
  }
}
