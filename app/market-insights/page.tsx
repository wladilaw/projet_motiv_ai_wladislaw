"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Target,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  BarChart3,
  Share,
  Download,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function MarketInsightsPage() {
  const trends = [
    {
      title: "Intelligence Artificielle",
      growth: "+45%",
      trend: "up",
      description: "Forte demande pour les profils IA/ML",
      color: "green",
    },
    {
      title: "Développement Web",
      growth: "+12%",
      trend: "up",
      description: "Croissance stable du secteur",
      color: "blue",
    },
    {
      title: "Marketing Digital",
      growth: "-3%",
      trend: "down",
      description: "Légère baisse due à la saturation",
      color: "red",
    },
  ]

  const predictions = [
    {
      sector: "Cybersécurité",
      prediction: "Explosion de +60% des offres d'ici 6 mois",
      confidence: 92,
      impact: "Très élevé",
    },
    {
      sector: "Data Science",
      prediction: "Stabilisation après forte croissance",
      confidence: 78,
      impact: "Modéré",
    },
    {
      sector: "UX/UI Design",
      prediction: "Spécialisation vers l'IA design",
      confidence: 85,
      impact: "Élevé",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-60 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-40 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Insights Marché</h1>
                <p className="text-xl text-gray-600">Analyses et prédictions basées sur l'IA</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-coral-200 text-coral-600 hover:bg-coral-50">
                <Settings className="w-4 h-4 mr-2" />
                Configurer les alertes
              </Button>
              <Button variant="outline" size="sm" className="border-coral-200 text-coral-600 hover:bg-coral-50">
                <Download className="w-4 h-4 mr-2" />
                Exporter le rapport
              </Button>
              <Button variant="outline" size="sm" className="border-coral-200 text-coral-600 hover:bg-coral-50">
                <Share className="w-4 h-4 mr-2" />
                Partager les insights
              </Button>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tendances actuelles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {trends.map((trend, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{trend.title}</CardTitle>
                    <div
                      className={`flex items-center space-x-1 ${
                        trend.color === "green"
                          ? "text-green-600"
                          : trend.color === "blue"
                            ? "text-blue-600"
                            : "text-red-600"
                      }`}
                    >
                      {trend.trend === "up" ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      <span className="font-bold">{trend.growth}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{trend.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Predictions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prédictions IA</h2>
          <div className="space-y-4">
            {predictions.map((pred, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{pred.sector}</h3>
                        <Badge
                          variant={
                            pred.impact === "Très élevé"
                              ? "destructive"
                              : pred.impact === "Élevé"
                                ? "default"
                                : "secondary"
                          }
                          className={
                            pred.impact === "Très élevé"
                              ? "bg-coral-500 hover:bg-coral-600"
                              : pred.impact === "Élevé"
                                ? "bg-coral-400 hover:bg-coral-500"
                                : ""
                          }
                        >
                          {pred.impact}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{pred.prediction}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Confiance IA:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                          <div
                            className="bg-coral-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${pred.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-coral-600">{pred.confidence}%</span>
                      </div>
                    </div>
                    <AlertCircle className="w-6 h-6 text-coral-500 ml-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Analysis */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-coral-500" />
                Analyse sectorielle
              </CardTitle>
              <CardDescription>Répartition des opportunités par secteur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Technologie</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-coral-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Finance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">72%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Santé</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">68%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Éducation</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">45%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Recommandations personnalisées</CardTitle>
              <CardDescription>Basées sur votre profil et les tendances du marché</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-coral-50 rounded-lg border-l-4 border-coral-500">
                  <h4 className="font-semibold text-coral-900 mb-2">Opportunité immédiate</h4>
                  <p className="text-coral-800 text-sm">
                    Les postes en IA/ML correspondent parfaitement à votre profil. Postulez maintenant pour maximiser
                    vos chances.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-900 mb-2">Formation recommandée</h4>
                  <p className="text-yellow-800 text-sm">
                    Développez vos compétences en cybersécurité pour anticiper la forte demande prévue.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-2">Stratégie long terme</h4>
                  <p className="text-green-800 text-sm">
                    Positionnez-vous sur l'intersection IA/UX pour les opportunités futures.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
