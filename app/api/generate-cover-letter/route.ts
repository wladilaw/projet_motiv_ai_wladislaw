import { type NextRequest, NextResponse } from "next/server"
import { groqService } from "@/lib/groq"
import { companyResearchService } from "@/lib/company-research"
import { createServerComponentClient } from "@/lib/supabase"
import { cacheService, cacheKeys } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, companyName, jobDescription, userId, generateImage } = await request.json()

    if (!jobTitle || !companyName || !jobDescription) {
      return NextResponse.json({ success: false, message: "Tous les champs sont requis" }, { status: 400 })
    }

    const supabase = createServerComponentClient()

    // 1. Récupérer le profil utilisateur
    let userProfile = null
    if (userId) {
      userProfile = await cacheService.get(cacheKeys.userProfile(userId))

      if (!userProfile) {
        const { data } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()

        if (data) {
          userProfile = data
          await cacheService.set(cacheKeys.userProfile(userId), data, 3600)
        }
      }
    }

    // Profil par défaut si pas d'utilisateur connecté
    if (!userProfile) {
      userProfile = {
        name: "Candidat Motivé",
        email: "candidat@email.com",
        summary: "Professionnel passionné recherchant de nouveaux défis",
        skills: ["Communication", "Travail en équipe", "Adaptabilité", "Résolution de problèmes"],
        experience: ["Expérience professionnelle pertinente", "Projets réalisés avec succès"],
        education: ["Formation solide dans le domaine"],
        languages: ["Français: Natif", "Anglais: Courant"],
        interests: ["Innovation", "Technologie", "Développement personnel"],
      }
    }

    // 2. Recherche automatique sur l'entreprise
    console.log(`🔍 Recherche d'informations sur ${companyName}...`)

    // Vérifier le cache pour les infos entreprise
    let companyInfo = await cacheService.get(cacheKeys.companyInfo(companyName))

    if (!companyInfo) {
      companyInfo = await companyResearchService.researchCompany(companyName)
      // Cache pour 24h (les infos entreprise changent peu)
      await cacheService.set(cacheKeys.companyInfo(companyName), companyInfo, 86400)
    }

    console.log(`✅ Informations trouvées sur ${companyName}:`, {
      industry: companyInfo.industry,
      valuesCount: companyInfo.values?.length || 0,
      newsCount: companyInfo.recentNews?.length || 0,
    })

    // 3. Analyser le contexte du poste
    const jobContext = await companyResearchService.analyzeJobPosition(jobTitle, jobDescription, companyName)

    // 4. Générer des points de connexion personnalisés
    const connectionPoints = await companyResearchService.generateConnectionPoints(userProfile, companyInfo, {
      title: jobTitle,
      description: jobDescription,
      company: companyName,
    })

    console.log(`🎯 Points de connexion générés:`, connectionPoints.length)

    // 5. Générer la lettre ultra-personnalisée
    console.log(`✍️ Génération de la lettre personnalisée...`)

    const generatedContent = await groqService.generatePersonalizedCoverLetter(
      userProfile,
      companyInfo,
      { title: jobTitle, description: jobDescription, company: companyName },
      connectionPoints,
    )

    // 6. Générer l'image de l'entreprise (gratuit)
    let companyImage = null
    if (generateImage) {
      const companyInitials = companyName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
      companyImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(companyInitials)}&size=200&background=0D8ABC&color=fff&format=png`
    }

    // 7. Sauvegarder en base
    const coverLetter = {
      user_id: userId,
      job_title: jobTitle,
      company_name: companyName,
      job_description: jobDescription,
      generated_content: generatedContent,
      company_image: companyImage,
      ai_provider: "groq",
      ai_model: "llama3-8b-8192",
      company_research: companyInfo,
      connection_points: connectionPoints,
      personalization_level: "ultra-high",
    }

    const { data: savedLetter, error: saveError } = await supabase
      .from("cover_letters")
      .insert(coverLetter)
      .select()
      .single()

    if (saveError) {
      console.error("Save error:", saveError)
      return NextResponse.json({ success: false, message: "Erreur lors de la sauvegarde" }, { status: 500 })
    }

    // 8. Cache et métriques
    await cacheService.set(cacheKeys.coverLetter(savedLetter.id), savedLetter, 86400)
    await cacheService.incr(`usage:personalized_letters:${new Date().toISOString().split("T")[0]}`)

    console.log(`🎉 Lettre ultra-personnalisée générée avec succès!`)

    return NextResponse.json({
      ...savedLetter,
      success: true,
      provider: "groq",
      model: "llama3-8b-8192",
      personalization: {
        companyResearch: true,
        connectionPoints: connectionPoints.length,
        personalizedLevel: "ultra-high",
      },
    })
  } catch (error) {
    console.error("Erreur lors de la génération:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la génération de la lettre",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
