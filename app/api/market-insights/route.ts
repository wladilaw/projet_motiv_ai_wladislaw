import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { cacheService, cacheKeys } from "@/lib/redis"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sector = searchParams.get("sector") || "tech"
    const forceRefresh = searchParams.get("refresh") === "true"

    // Check cache first
    if (!forceRefresh) {
      const cachedInsights = await cacheService.get(cacheKeys.jobTrends(sector))
      if (cachedInsights) {
        return NextResponse.json(cachedInsights)
      }
    }

    // Generate fresh insights with AI
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `
Génère des insights détaillés sur le marché de l'emploi pour le secteur "${sector}" en France.

Fournis les données suivantes au format JSON:
{
  "sector": "${sector}",
  "marketHealth": {
    "score": "score de 0 à 100",
    "trend": "up/down/stable",
    "description": "description courte"
  },
  "jobOpenings": {
    "total": "nombre total d'offres",
    "growth": "pourcentage de croissance",
    "hotRoles": ["top 5 des postes les plus demandés"]
  },
  "salaryTrends": {
    "median": "salaire médian en euros",
    "growth": "pourcentage d'évolution",
    "ranges": {
      "junior": "fourchette junior",
      "senior": "fourchette senior"
    }
  },
  "skills": {
    "hot": ["top 5 compétences en demande"],
    "emerging": ["top 3 compétences émergentes"]
  },
  "predictions": [
    {
      "title": "prédiction 1",
      "description": "description détaillée",
      "confidence": "pourcentage de confiance",
      "timeframe": "horizon temporel"
    }
  ],
  "companies": {
    "topHiring": ["top 5 entreprises qui recrutent"],
    "startupActivity": "niveau d'activité startup (high/medium/low)"
  },
  "geography": {
    "topCities": ["top 3 villes"],
    "remoteWork": "pourcentage de télétravail"
  }
}

Assure-toi que les données sont réalistes et cohérentes avec le marché français actuel.
`,
      maxTokens: 1500,
    })

    let insights
    try {
      insights = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      // Fallback data
      insights = {
        sector,
        marketHealth: { score: 75, trend: "up", description: "Marché dynamique" },
        jobOpenings: { total: "12,500", growth: "+15%", hotRoles: ["Développeur", "Data Scientist"] },
        salaryTrends: { median: "45,000€", growth: "+8%" },
        skills: { hot: ["JavaScript", "Python"], emerging: ["IA", "Blockchain"] },
        predictions: [],
        companies: { topHiring: ["Google", "Microsoft"], startupActivity: "high" },
        geography: { topCities: ["Paris", "Lyon"], remoteWork: "65%" },
      }
    }

    // Add metadata
    insights.lastUpdated = new Date().toISOString()
    insights.source = "MotivAI Analysis"

    // Cache for 6 hours
    await cacheService.set(cacheKeys.jobTrends(sector), insights, 21600)

    // Increment analytics
    await cacheService.incr(`analytics:insights:${sector}:${new Date().toISOString().split("T")[0]}`)

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Market insights error:", error)
    return NextResponse.json({ error: "Erreur lors de la génération des insights" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()

    if (action === "track_view") {
      // Track page view
      const { sector, userId } = data
      await cacheService.incr(`views:insights:${sector}`)
      if (userId) {
        await cacheService.incr(`user_views:${userId}`)
      }
      return NextResponse.json({ success: true })
    }

    if (action === "get_analytics") {
      // Get analytics data
      const today = new Date().toISOString().split("T")[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

      const [todayViews, yesterdayViews] = await Promise.all([
        cacheService.get(`analytics:insights:tech:${today}`) || 0,
        cacheService.get(`analytics:insights:tech:${yesterday}`) || 0,
      ])

      return NextResponse.json({
        views: {
          today: todayViews,
          yesterday: yesterdayViews,
          growth:
            yesterdayViews > 0 ? ((Number(todayViews) - Number(yesterdayViews)) / Number(yesterdayViews)) * 100 : 0,
        },
      })
    }

    return NextResponse.json({ error: "Action non reconnue" }, { status: 400 })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
