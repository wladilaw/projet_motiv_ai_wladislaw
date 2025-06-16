import { groqService } from "./groq"
import { cacheService } from "./redis"

export interface CVAnalysis {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  skillsGap: string[]
  experienceLevel: "junior" | "mid" | "senior" | "expert"
  marketValue: {
    salaryRange: string
    demandLevel: "low" | "medium" | "high" | "very_high"
    competitiveness: number
  }
  atsCompatibility: {
    score: number
    issues: string[]
    improvements: string[]
  }
}

export interface JobMatchAnalysis {
  matchScore: number
  compatibility: {
    skills: number
    experience: number
    education: number
    culture: number
  }
  strengths: string[]
  concerns: string[]
  recommendations: string[]
  probabilityOfSuccess: number
  salaryNegotiation: {
    expectedRange: string
    negotiationPower: "low" | "medium" | "high"
    justifications: string[]
  }
}

export interface CareerStats {
  profileCompleteness: number
  marketPosition: number
  growthPotential: number
  applicationSuccess: {
    estimatedResponseRate: number
    interviewProbability: number
    factors: string[]
  }
  careerTrajectory: {
    currentLevel: string
    nextSteps: string[]
    timeToPromotion: string
  }
}

export const cvAnalyzerService = {
  // Analyse complète du CV
  async analyzeCVComprehensive(cvData: any): Promise<CVAnalysis> {
    const cacheKey = `cv_analysis:${JSON.stringify(cvData).slice(0, 50)}`

    // Check cache
    const cached = await cacheService.get(cacheKey)
    if (cached) return cached

    try {
      const analysis = await groqService.analyzeCVDetailed(cvData)

      // Cache for 24 hours
      await cacheService.set(cacheKey, analysis, 86400)

      return analysis
    } catch (error) {
      console.error("CV Analysis error:", error)
      return this.getFallbackCVAnalysis()
    }
  },

  // Analyse de matching avec un poste
  async analyzeJobMatch(cvData: any, jobDetails: any, companyInfo: any): Promise<JobMatchAnalysis> {
    try {
      const matchAnalysis = await groqService.analyzeJobMatching({
        cv: cvData,
        job: jobDetails,
        company: companyInfo,
      })

      // Track matching analytics
      await this.trackMatchingAnalytics(matchAnalysis.matchScore, jobDetails.title)

      return matchAnalysis
    } catch (error) {
      console.error("Job matching error:", error)
      return this.getFallbackJobMatch()
    }
  },

  // Statistiques de carrière personnalisées
  async generateCareerStats(cvData: any, jobHistory: any[]): Promise<CareerStats> {
    try {
      const stats = await groqService.generateCareerStatistics({
        cv: cvData,
        history: jobHistory,
      })

      return stats
    } catch (error) {
      console.error("Career stats error:", error)
      return this.getFallbackCareerStats()
    }
  },

  // Analyse comparative avec le marché
  async compareWithMarket(cvData: any, sector: string) {
    try {
      const comparison = await groqService.compareWithMarketStandards({
        cv: cvData,
        sector,
      })

      return comparison
    } catch (error) {
      console.error("Market comparison error:", error)
      return null
    }
  },

  // Suivi des analytics de matching
  async trackMatchingAnalytics(score: number, jobTitle: string) {
    const today = new Date().toISOString().split("T")[0]

    await Promise.all([
      cacheService.incr(`analytics:matches:${today}`),
      cacheService.incr(`analytics:matches:${jobTitle}:${today}`),
      cacheService.lpush(`analytics:scores:${today}`, score.toString()),
    ])
  },

  // Fallbacks
  getFallbackCVAnalysis(): CVAnalysis {
    return {
      overallScore: 75,
      strengths: ["Profil équilibré", "Expérience pertinente"],
      weaknesses: ["Quelques compétences à développer"],
      recommendations: ["Continuer à développer vos compétences"],
      skillsGap: [],
      experienceLevel: "mid",
      marketValue: {
        salaryRange: "35-45K€",
        demandLevel: "medium",
        competitiveness: 70,
      },
      atsCompatibility: {
        score: 80,
        issues: [],
        improvements: ["Optimiser les mots-clés"],
      },
    }
  },

  getFallbackJobMatch(): JobMatchAnalysis {
    return {
      matchScore: 70,
      compatibility: {
        skills: 75,
        experience: 70,
        education: 80,
        culture: 65,
      },
      strengths: ["Profil adapté"],
      concerns: ["Quelques compétences à développer"],
      recommendations: ["Mettre en avant vos points forts"],
      probabilityOfSuccess: 65,
      salaryNegotiation: {
        expectedRange: "40-50K€",
        negotiationPower: "medium",
        justifications: ["Expérience pertinente"],
      },
    }
  },

  getFallbackCareerStats(): CareerStats {
    return {
      profileCompleteness: 80,
      marketPosition: 70,
      growthPotential: 75,
      applicationSuccess: {
        estimatedResponseRate: 15,
        interviewProbability: 25,
        factors: ["Profil standard"],
      },
      careerTrajectory: {
        currentLevel: "Intermédiaire",
        nextSteps: ["Développer expertise"],
        timeToPromotion: "12-18 mois",
      },
    }
  },
}
