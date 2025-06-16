import { type NextRequest, NextResponse } from "next/server"
import { pdfGenerator, type ReportData } from "@/lib/pdf-generator"
import { realTimeAnalytics } from "@/lib/real-time-analytics"

export async function POST(request: NextRequest) {
  try {
    const { reportType, period } = await request.json()

    // Récupérer les données pour le rapport
    const stats = await realTimeAnalytics.getCurrentStats()

    const reportData: ReportData = {
      title: `Rapport Analytics ${reportType === "admin" ? "Admin" : "Utilisateur"}`,
      period: period || "Derniers 30 jours",
      stats: {
        totalUsers: 2438,
        activeUsers: stats.activeUsers,
        lettersGenerated: stats.lettersGenerated,
        conversions: stats.conversions,
        revenue: stats.revenue,
        growthRate: 12.5,
      },
      topCompanies: [
        { name: "TechCorp", applications: 156, growth: 24 },
        { name: "StartupXYZ", applications: 142, growth: 18 },
        { name: "BigCompany", applications: 128, growth: -5 },
        { name: "DataFlow", applications: 98, growth: 32 },
      ],
      topSkills: [
        { skill: "React", demand: 89, growth: 15 },
        { skill: "TypeScript", demand: 76, growth: 22 },
        { skill: "Node.js", demand: 68, growth: 8 },
        { skill: "Python", demand: 64, growth: 12 },
      ],
    }

    // Générer le PDF
    const pdfBlob = await pdfGenerator.generateAnalyticsReport(reportData)

    // Convertir le Blob en Buffer pour Next.js
    const buffer = Buffer.from(await pdfBlob.arrayBuffer())

    // Retourner le PDF
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="rapport-analytics-${Date.now()}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Erreur génération PDF:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la génération du rapport PDF",
      },
      { status: 500 },
    )
  }
}
