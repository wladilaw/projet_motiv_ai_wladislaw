import { type NextRequest, NextResponse } from "next/server"
import { predictiveAnalyticsService } from "@/lib/predictive-analytics"

export async function POST(request: NextRequest) {
  try {
    const { cvData, preferences, jobHistory = [] } = await request.json()

    if (!cvData) {
      return NextResponse.json({ error: "CV data is required" }, { status: 400 })
    }

    // Génération des insights prédictifs
    const insights = await predictiveAnalyticsService.generatePredictiveInsights(cvData, jobHistory, preferences)

    return NextResponse.json({
      success: true,
      insights,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Predictive analytics error:", error)
    return NextResponse.json({ error: "Failed to generate predictive insights" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Predictive Analytics API",
    endpoints: {
      "POST /": "Generate predictive insights",
      "POST /application-prediction": "Predict application success",
      "POST /career-simulation": "Simulate career paths",
    },
  })
}
