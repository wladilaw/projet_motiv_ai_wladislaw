import { groqService } from "./groq"

export interface CompanyInfo {
  name: string
  industry: string
  description: string
  values: string[]
  recentNews: string[]
  culture: string
  size: string
  founded: string
  headquarters: string
  keyPeople: string[]
  products: string[]
  competitors: string[]
  socialImpact: string
  workEnvironment: string
}

export const companyResearchService = {
  // Recherche automatique d'infos sur l'entreprise
  async researchCompany(companyName: string): Promise<CompanyInfo> {
    try {
      // 1. Recherche générale sur l'entreprise
      const generalInfo = await groqService.researchCompanyGeneral(companyName)

      // 2. Recherche sur la culture et les valeurs
      const cultureInfo = await groqService.researchCompanyCulture(companyName)

      // 3. Recherche sur l'actualité récente
      const newsInfo = await groqService.researchCompanyNews(companyName)

      return {
        name: companyName,
        ...generalInfo,
        ...cultureInfo,
        ...newsInfo,
      }
    } catch (error) {
      console.error("Erreur recherche entreprise:", error)
      // Fallback avec infos basiques
      return this.getFallbackCompanyInfo(companyName)
    }
  },

  // Analyse du poste pour adapter la recherche
  async analyzeJobPosition(jobTitle: string, jobDescription: string, companyName: string) {
    const analysis = await groqService.analyzeJobContext({
      title: jobTitle,
      description: jobDescription,
      company: companyName,
    })

    return analysis
  },

  // Génère des points de connexion personnalisés
  async generateConnectionPoints(userProfile: any, companyInfo: CompanyInfo, jobDetails: any) {
    const connectionPoints = await groqService.generatePersonalConnections({
      userProfile,
      companyInfo,
      jobDetails,
    })

    return connectionPoints
  },

  // Fallback si la recherche échoue
  getFallbackCompanyInfo(companyName: string): CompanyInfo {
    return {
      name: companyName,
      industry: "Secteur d'activité",
      description: `${companyName} est une entreprise reconnue dans son secteur`,
      values: ["Innovation", "Excellence", "Collaboration"],
      recentNews: [],
      culture: "Culture d'entreprise dynamique",
      size: "Entreprise établie",
      founded: "Entreprise établie",
      headquarters: "Siège social",
      keyPeople: [],
      products: [],
      competitors: [],
      socialImpact: "Engagement social",
      workEnvironment: "Environnement de travail collaboratif",
    }
  },
}
