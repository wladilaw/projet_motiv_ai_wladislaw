import { NextResponse } from "next/server"
import { realTimeAnalytics } from "@/lib/real-time-analytics"

export async function GET() {
  try {
    // Démarrer le tracking temps réel si pas déjà fait
    await realTimeAnalytics.startRealTimeTracking()

    // Récupérer les stats actuelles
    const stats = await realTimeAnalytics.getCurrentStats()
    const system = await realTimeAnalytics.getSystemStatus()

    return NextResponse.json({
      success: true,
      data: {
        stats,
        system,
        lastUpdate: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Erreur API temps réel:", error)

    // Retourner des données par défaut en cas d'erreur
    return NextResponse.json({
      success: false,
      data: {
        stats: {
          activeUsers: 0,
          lettersGenerated: 0,
          conversions: 0,
          revenue: 0,
          timestamp: new Date().toISOString(),
        },
        system: {
          cpuUsage: 0,
          memoryUsage: 0,
          responseTime: 0,
          errorRate: 0,
        },
        lastUpdate: new Date().toISOString(),
      },
      error: "Service temps réel indisponible",
    })
  }
}

export async function POST() {
  try {
    // Forcer une mise à jour des métriques
    await realTimeAnalytics.startRealTimeTracking()

    return NextResponse.json({
      success: true,
      message: "Tracking temps réel activé",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur activation tracking",
      },
      { status: 500 },
    )
  }
}
