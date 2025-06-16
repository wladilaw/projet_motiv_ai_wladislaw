import jsPDF from "jspdf"
import "jspdf-autotable"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export interface ReportData {
  title: string
  period: string
  stats: {
    totalUsers: number
    activeUsers: number
    lettersGenerated: number
    conversions: number
    revenue: number
    growthRate: number
  }
  topCompanies: Array<{
    name: string
    applications: number
    growth: number
  }>
  topSkills: Array<{
    skill: string
    demand: number
    growth: number
  }>
  chartData?: any[]
}

export class PDFReportGenerator {
  private doc: jsPDF

  constructor() {
    this.doc = new jsPDF()
  }

  async generateAnalyticsReport(data: ReportData): Promise<Blob> {
    // Configuration du document
    this.doc.setFontSize(20)
    this.doc.setTextColor(237, 124, 74) // Couleur coral
    this.doc.text(data.title, 20, 30)

    this.doc.setFontSize(12)
    this.doc.setTextColor(100, 100, 100)
    this.doc.text(`Période: ${data.period}`, 20, 45)
    this.doc.text(`Généré le: ${new Date().toLocaleDateString("fr-FR")}`, 20, 55)

    // Ligne de séparation
    this.doc.setDrawColor(237, 124, 74)
    this.doc.line(20, 65, 190, 65)

    // Section KPIs
    this.addKPISection(data.stats, 75)

    // Section Top Entreprises
    this.addTopCompaniesSection(data.topCompanies, 140)

    // Section Top Compétences
    this.addTopSkillsSection(data.topSkills, 200)

    // Footer
    this.addFooter()

    return this.doc.output("blob")
  }

  private addKPISection(stats: ReportData["stats"], yPosition: number) {
    this.doc.setFontSize(16)
    this.doc.setTextColor(0, 0, 0)
    this.doc.text("📊 Indicateurs Clés de Performance", 20, yPosition)

    const kpiData = [
      ["Métrique", "Valeur", "Croissance"],
      ["Utilisateurs totaux", stats.totalUsers.toLocaleString(), `+${stats.growthRate}%`],
      ["Utilisateurs actifs", stats.activeUsers.toLocaleString(), "+12.5%"],
      ["Lettres générées", stats.lettersGenerated.toLocaleString(), "+18.3%"],
      ["Conversions", stats.conversions.toLocaleString(), "+28.4%"],
      ["Revenus (€)", `${stats.revenue.toLocaleString()}€`, "+15.7%"],
    ]

    this.doc.autoTable({
      startY: yPosition + 10,
      head: [kpiData[0]],
      body: kpiData.slice(1),
      theme: "grid",
      headStyles: { fillColor: [237, 124, 74] },
      styles: { fontSize: 10 },
    })
  }

  private addTopCompaniesSection(companies: ReportData["topCompanies"], yPosition: number) {
    this.doc.setFontSize(16)
    this.doc.setTextColor(0, 0, 0)
    this.doc.text("🏢 Top Entreprises", 20, yPosition)

    const companyData = [
      ["Entreprise", "Candidatures", "Croissance"],
      ...companies.map((c) => [c.name, c.applications.toString(), `${c.growth > 0 ? "+" : ""}${c.growth}%`]),
    ]

    this.doc.autoTable({
      startY: yPosition + 10,
      head: [companyData[0]],
      body: companyData.slice(1),
      theme: "grid",
      headStyles: { fillColor: [237, 124, 74] },
      styles: { fontSize: 10 },
    })
  }

  private addTopSkillsSection(skills: ReportData["topSkills"], yPosition: number) {
    this.doc.setFontSize(16)
    this.doc.setTextColor(0, 0, 0)
    this.doc.text("🎯 Compétences en Demande", 20, yPosition)

    const skillsData = [
      ["Compétence", "Demande (%)", "Croissance"],
      ...skills.map((s) => [s.skill, `${s.demand}%`, `+${s.growth}%`]),
    ]

    this.doc.autoTable({
      startY: yPosition + 10,
      head: [skillsData[0]],
      body: skillsData.slice(1),
      theme: "grid",
      headStyles: { fillColor: [237, 124, 74] },
      styles: { fontSize: 10 },
    })
  }

  private addFooter() {
    const pageCount = this.doc.getNumberOfPages()

    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i)
      this.doc.setFontSize(8)
      this.doc.setTextColor(150, 150, 150)
      this.doc.text("Rapport généré par JobPlatform AI - Confidentiel", 20, this.doc.internal.pageSize.height - 20)
      this.doc.text(
        `Page ${i} sur ${pageCount}`,
        this.doc.internal.pageSize.width - 40,
        this.doc.internal.pageSize.height - 20,
      )
    }
  }
}

export const pdfGenerator = new PDFReportGenerator()
