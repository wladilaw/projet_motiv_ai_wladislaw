"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Plus,
  Download,
  Eye,
  Sparkles,
  User,
  Briefcase,
  Target,
  Search,
  Crown,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react"
import Link from "next/link"
import { createClientComponentClient } from "@/lib/supabase"
import { SubscriptionModal } from "@/components/subscription-modal"
import { ApplicationTracker } from "@/components/application-tracker"

interface CoverLetter {
  id: string
  job_title: string
  company_name: string
  generated_content: string
  feedback_score?: number
  status: "draft" | "sent" | "responded" | "rejected"
  created_at: string
}

interface UserSubscription {
  plan: "free" | "premium" | "pro"
  letters_used: number
  letters_limit: number
  features: string[]
}

export default function DashboardPage() {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([])
  const [subscription, setSubscription] = useState<UserSubscription>({
    plan: "free",
    letters_used: 0,
    letters_limit: 3,
    features: ["Génération basique", "3 lettres/mois"],
  })
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalLetters: 0,
    responseRate: 0,
    averageScore: 0,
    thisMonth: 0,
  })

  const supabase = createClientComponentClient()

  useEffect(() => {
    checkUser()
    fetchDashboardData()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchDashboardData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Fetch letters
      const { data: letters } = await supabase
        .from("cover_letters")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (letters) {
        setCoverLetters(letters)

        // Calculate stats
        const totalLetters = letters.length
        const responded = letters.filter((l) => l.status === "responded").length
        const responseRate = totalLetters > 0 ? (responded / totalLetters) * 100 : 0
        const averageScore = letters.reduce((acc, l) => acc + (l.feedback_score || 0), 0) / totalLetters || 0
        const thisMonth = letters.filter((l) => new Date(l.created_at).getMonth() === new Date().getMonth()).length

        setStats({
          totalLetters,
          responseRate,
          averageScore,
          thisMonth,
        })
      }

      // Fetch subscription
      const { data: sub } = await supabase.from("user_subscriptions").select("*").eq("user_id", user.id).single()

      if (sub) {
        setSubscription(sub)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  const canCreateLetter = subscription.letters_used < subscription.letters_limit

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "premium":
        return <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Premium</Badge>
      case "pro":
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Pro</Badge>
      default:
        return <Badge variant="outline">Gratuit</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-rose-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-coral-500">MotivAI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/predictive-analytics">
                <Button variant="ghost">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="ghost">
                  <Search className="w-4 h-4 mr-2" />
                  Emplois
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                {getPlanBadge(subscription.plan)}
                {subscription.plan === "free" && (
                  <Button
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade
                  </Button>
                )}
                <Button variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  {user?.user_metadata?.first_name || "Profil"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header avec stats */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
              <p className="text-gray-600">Gérez vos lettres de motivation avec feedback IA et suivi complet</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {subscription.letters_used}/{subscription.letters_limit} lettres utilisées ce mois
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-gradient-to-r from-coral-500 to-rose-500 h-2 rounded-full"
                  style={{ width: `${(subscription.letters_used / subscription.letters_limit) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Lettres</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalLetters}</p>
                  </div>
                  <FileText className="w-8 h-8 text-coral-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Taux de Réponse</p>
                    <p className="text-2xl font-bold text-green-600">{stats.responseRate.toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Score Moyen</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.averageScore.toFixed(0)}/100</p>
                  </div>
                  <Star className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ce Mois</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.thisMonth}</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="letters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="letters" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Mes lettres ({coverLetters.length})
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Générer
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Suivi
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="letters" className="space-y-6">
            {coverLetters.length === 0 ? (
              <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune lettre de motivation</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Commencez par créer votre première lettre avec feedback IA !
                  </p>
                  <Button
                    onClick={() => document.querySelector('[value="generate"]')?.click()}
                    disabled={!canCreateLetter}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer ma première lettre
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {coverLetters.map((letter) => (
                  <Card
                    key={letter.id}
                    className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-coral-500" />
                            {letter.job_title}
                          </CardTitle>
                          <CardDescription>
                            {letter.company_name} • {new Date(letter.created_at).toLocaleDateString("fr-FR")}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {letter.feedback_score && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              Score: {letter.feedback_score}/100
                            </Badge>
                          )}
                          <Badge
                            variant={
                              letter.status === "responded"
                                ? "default"
                                : letter.status === "sent"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              letter.status === "responded"
                                ? "bg-green-100 text-green-700"
                                : letter.status === "sent"
                                  ? "bg-blue-100 text-blue-700"
                                  : ""
                            }
                          >
                            {letter.status === "draft" && <AlertCircle className="w-3 h-3 mr-1" />}
                            {letter.status === "sent" && <Clock className="w-3 h-3 mr-1" />}
                            {letter.status === "responded" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {letter.status === "draft" ? "Brouillon" : ""}
                            {letter.status === "sent" ? "Envoyée" : ""}
                            {letter.status === "responded" ? "Réponse" : ""}
                            {letter.status === "rejected" ? "Refusée" : ""}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Link href={`/letter-editor/${letter.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Éditer avec Feedback
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/api/export-pdf?letterId=${letter.id}`} target="_blank" rel="noreferrer">
                            <Download className="w-4 h-4 mr-2" />
                            Export PDF
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="generate" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-coral-500" />
                  Générer une nouvelle lettre avec feedback IA
                </CardTitle>
                <CardDescription>
                  {canCreateLetter
                    ? "Créez une lettre personnalisée avec analyse et feedback en temps réel"
                    : `Limite atteinte (${subscription.letters_limit}/mois). Passez à Premium pour plus de lettres !`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {canCreateLetter ? (
                  <Link href="/letter-generator">
                    <Button className="w-full bg-gradient-to-r from-coral-500 to-rose-500">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Créer une lettre avec IA
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Passer à Premium
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <ApplicationTracker applications={coverLetters} onUpdate={fetchDashboardData} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Performance des Lettres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Taux de réponse</span>
                      <span className="font-semibold text-green-600">{stats.responseRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Score moyen IA</span>
                      <span className="font-semibold text-blue-600">{stats.averageScore.toFixed(0)}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Lettres ce mois</span>
                      <span className="font-semibold">{stats.thisMonth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recommandations IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">💡 Vos lettres avec score &gt;80 ont 3x plus de réponses</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">🎯 Personnalisez plus pour améliorer vos scores</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">📈 Meilleur moment : Mardi-Jeudi 10h-16h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <SubscriptionModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  )
}
