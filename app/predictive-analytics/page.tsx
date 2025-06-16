"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Brain,
  Zap,
  Shield,
  MapPin,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"

export default function PredictiveAnalyticsPage() {
  const [insights, setInsights] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState(0)

  const generateInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/predictive-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvData: {
            skills: ["React", "TypeScript", "Node.js"],
            experience: "3 ans",
            sector: "Tech",
            currentRole: "Développeur Frontend",
          },
          preferences: {
            targetRole: "Senior Frontend",
            location: "Paris",
            salaryExpectation: "55000",
          },
        }),
      })
      const data = await response.json()
      setInsights(data.insights)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateInsights()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Brain className="h-12 w-12 animate-pulse mx-auto mb-4 text-blue-600" />
            <p className="text-lg font-medium">Analyse prédictive en cours...</p>
            <p className="text-sm text-gray-600">L'IA analyse votre profil et les tendances marché</p>
          </div>
        </div>
      </div>
    )
  }

  if (!insights) return null

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyses Prédictives IA</h1>
        <p className="text-gray-600">Intelligence artificielle pour optimiser votre carrière</p>
      </div>

      <Tabs defaultValue="trajectory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trajectory">Trajectoire</TabsTrigger>
          <TabsTrigger value="market">Marché</TabsTrigger>
          <TabsTrigger value="recommendations">Conseils</TabsTrigger>
          <TabsTrigger value="risks">Risques</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunités</TabsTrigger>
        </TabsList>

        <TabsContent value="trajectory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Évolution Prédite
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Niveau actuel</p>
                  <p className="font-semibold">{insights.careerTrajectory.currentLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Prochain rôle prédit</p>
                  <p className="font-semibold text-blue-600">{insights.careerTrajectory.predictedNextRole}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Temps estimé</p>
                  <p className="font-semibold">{insights.careerTrajectory.timeToPromotion}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Probabilité de succès</p>
                  <div className="flex items-center gap-2">
                    <Progress value={insights.careerTrajectory.probabilityOfSuccess} className="flex-1" />
                    <span className="font-semibold">{insights.careerTrajectory.probabilityOfSuccess}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Progression Salariale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Actuel</span>
                  <span className="font-semibold">{insights.careerTrajectory.salaryProgression.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dans 6 mois</span>
                  <span className="font-semibold text-green-600">
                    {insights.careerTrajectory.salaryProgression.in6Months}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dans 1 an</span>
                  <span className="font-semibold text-green-600">
                    {insights.careerTrajectory.salaryProgression.in1Year}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dans 3 ans</span>
                  <span className="font-semibold text-blue-600">
                    {insights.careerTrajectory.salaryProgression.in3Years}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Croissance Secteur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+{insights.marketTrends.sectorGrowth}%</div>
                <p className="text-sm text-gray-600">Croissance annuelle</p>
                <Badge variant="secondary" className="mt-2">
                  {insights.marketTrends.demandForecast}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Tendance Salaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {insights.marketTrends.salaryTrends.direction === "up" ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  )}
                  <span className="text-2xl font-bold">{insights.marketTrends.salaryTrends.percentage}%</span>
                </div>
                <p className="text-sm text-gray-600">Évolution annuelle</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Compétences Émergentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.marketTrends.emergingSkills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Entreprises qui Recrutent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.marketTrends.hotCompanies.map((company: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {company}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Compétences à Développer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.personalizedRecommendations.skillsToLearn.map((skill: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{skill.skill}</h4>
                      <Badge
                        variant={
                          skill.priority === "critical"
                            ? "destructive"
                            : skill.priority === "high"
                              ? "default"
                              : skill.priority === "medium"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {skill.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{skill.impact}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {skill.timeToMaster}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Ressources:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {skill.resources.map((resource: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications Recommandées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.personalizedRecommendations.certifications.map((cert: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{cert.name}</h4>
                      <div className="text-right">
                        <div className="text-sm font-semibold">Valeur: {cert.value}/100</div>
                        <div className="text-xs text-gray-600">{cert.provider}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Difficulté: {cert.difficulty}</span>
                      <span className="text-green-600 font-semibold">{cert.roi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Risque Automatisation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{insights.riskAnalysis.automationRisk}%</div>
                  <Progress value={insights.riskAnalysis.automationRisk} className="mb-2" />
                  <p className="text-sm text-gray-600">Risque sur 10 ans</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Saturation Marché
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{insights.riskAnalysis.marketSaturation}%</div>
                  <Progress value={insights.riskAnalysis.marketSaturation} className="mb-2" />
                  <p className="text-sm text-gray-600">Niveau de concurrence</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Obsolescence Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{insights.riskAnalysis.skillObsolescence}%</div>
                  <Progress value={insights.riskAnalysis.skillObsolescence} className="mb-2" />
                  <p className="text-sm text-gray-600">Risque d'obsolescence</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommandations de Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {insights.riskAnalysis.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Marchés Cachés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.opportunityMapping.hiddenJobMarkets.map((market: string, index: number) => (
                    <Badge key={index} variant="secondary" className="mr-2">
                      {market}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Compétences Sous-valorisées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.opportunityMapping.undervaluedSkills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Niches Émergentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.opportunityMapping.emergingNiches.map((niche: string, index: number) => (
                    <Badge key={index} variant="default" className="mr-2">
                      {niche}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Opportunités Géographiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.opportunityMapping.geographicOpportunities.map((location: string, index: number) => (
                    <Badge key={index} variant="secondary" className="mr-2">
                      {location}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button onClick={generateInsights} disabled={loading}>
          <Brain className="h-4 w-4 mr-2" />
          Actualiser l'Analyse
        </Button>
      </div>
    </div>
  )
}
