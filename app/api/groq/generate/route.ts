import { type NextRequest, NextResponse } from "next/server"
import { groqService } from "@/lib/groq"
import { createServerComponentClient } from "@/lib/supabase"
import { cacheService } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const { type, userProfile, jobDetails, cvContent, targetJob, userId } = await request.json()

    let result = ""

    switch (type) {
      case "cover_letter":
        if (!userProfile || !jobDetails) {
          return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
        }
        result = await groqService.generateCoverLetter(userProfile, jobDetails)
        break

      case "career_advice":
        if (!userProfile) {
          return NextResponse.json({ error: "Profil utilisateur requis" }, { status: 400 })
        }
        result = await groqService.generateCareerAdvice(userProfile)
        break

      case "cv_optimization":
        if (!cvContent || !targetJob) {
          return NextResponse.json({ error: "CV et poste cible requis" }, { status: 400 })
        }
        result = await groqService.optimizeCV(cvContent, targetJob)
        break

      default:
        return NextResponse.json({ error: "Type non supporté" }, { status: 400 })
    }

    // Sauvegarder en base si userId fourni
    if (userId && type === "cover_letter") {
      const supabase = createServerComponentClient()
      await supabase.from("cover_letters").insert({
        user_id: userId,
        job_title: jobDetails.title,
        company_name: jobDetails.company,
        generated_content: result,
        ai_provider: "groq",
      })
    }

    // Cache pour éviter les régénérations
    const cacheKey = `groq:${type}:${userId || "anonymous"}:${Date.now()}`
    await cacheService.set(cacheKey, result, 3600) // 1h

    return NextResponse.json({
      success: true,
      content: result,
      provider: "groq",
      model: "llama3-8b-8192",
    })
  } catch (error) {
    console.error("Groq API error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la génération",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
