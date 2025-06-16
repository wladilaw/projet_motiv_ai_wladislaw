"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  ArrowLeft,
  Code,
  Zap,
  Shield,
  Rocket,
  Database,
  Brain,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  ExternalLink,
  Copy,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const features = [
    {
      icon: Brain,
      title: "IA Générative",
      description: "Génération automatique de lettres de motivation personnalisées",
      tech: "OpenAI GPT-4, Claude AI",
    },
    {
      icon: BarChart3,
      title: "Analyse de Marché",
      description: "Insights en temps réel sur les tendances emploi",
      tech: "Grok AI, APIs sectorielles",
    },
    {
      icon: MessageSquare,
      title: "Coach Virtuel",
      description: "Assistant IA disponible 24/7 pour conseils carrière",
      tech: "LangChain, Vector DB",
    },
    {
      icon: Database,
      title: "Base de Données",
      description: "Stockage sécurisé des profils et historiques",
      tech: "Supabase, PostgreSQL",
    },
  ]

  const integrations = [
    {
      name: "OpenAI",
      description: "Génération de contenu IA",
      endpoint: "/api/openai/generate",
      status: "Active",
    },
    {
      name: "Supabase",
      description: "Base de données et authentification",
      endpoint: "/api/supabase/auth",
      status: "Active",
    },
    {
      name: "Vercel AI SDK",
      description: "Framework IA unifié",
      endpoint: "/api/ai/chat",
      status: "Active",
    },
    {
      name: "Fal AI",
      description: "Génération d'images",
      endpoint: "/api/fal/generate-image",
      status: "Beta",
    },
  ]

  const codeExamples = [
    {
      id: "generate-letter",
      title: "Générer une lettre de motivation",
      language: "TypeScript",
      code: `import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function generateCoverLetter(
  userProfile: UserProfile,
  jobOffer: JobOffer
) {
  const { text } = await generateText({
    model: openai('gpt-4'),
    prompt: \`Génère une lettre de motivation personnalisée pour:
    Profil: \${JSON.stringify(userProfile)}
    Offre: \${JSON.stringify(jobOffer)}\`,
    maxTokens: 1000,
  })
  
  return text
}`,
    },
    {
      id: "market-analysis",
      title: "Analyser les tendances marché",
      language: "TypeScript",
      code: `import { grok } from '@ai-sdk/grok'

export async function analyzeMarketTrends(sector: string) {
  const { text } = await generateText({
    model: grok('grok-beta'),
    prompt: \`Analyse les tendances du marché \${sector} 
    et fournis des insights sur les opportunités d'emploi\`,
  })
  
  return JSON.parse(text)
}`,
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
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-coral-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-xl">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">Documentation MotivAI</h1>
              <p className="text-xl text-gray-600">Guide complet pour développeurs et utilisateurs</p>
              <div className="flex items-center space-x-4 mt-4">
                <Badge className="bg-coral-500 hover:bg-coral-600">v2.1.0</Badge>
                <Badge variant="outline">Dernière mise à jour: 16 Déc 2024</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Rocket className="w-8 h-8 mr-3 text-coral-500" />
            Démarrage rapide
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Pour les utilisateurs
                </CardTitle>
                <CardDescription>Commencez à utiliser MotivAI en quelques étapes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-coral-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Créez votre compte</h4>
                      <p className="text-gray-600 text-sm">Inscription gratuite en 30 secondes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-coral-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Complétez votre profil</h4>
                      <p className="text-gray-600 text-sm">Ajoutez vos compétences et expériences</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-coral-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Générez votre première lettre</h4>
                      <p className="text-gray-600 text-sm">L'IA crée une lettre personnalisée</p>
                    </div>
                  </div>
                </div>
                <Link href="/auth/register" className="mt-6 block">
                  <Button className="w-full bg-coral-500 hover:bg-coral-600">Commencer maintenant</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-purple-500" />
                  Pour les développeurs
                </CardTitle>
                <CardDescription>Intégrez MotivAI dans vos applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Obtenez votre clé API</h4>
                      <p className="text-gray-600 text-sm">Accès aux endpoints MotivAI</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Installez le SDK</h4>
                      <p className="text-gray-600 text-sm">npm install @motivai/sdk</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Première intégration</h4>
                      <p className="text-gray-600 text-sm">Générez du contenu IA en quelques lignes</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6 border-purple-200 text-purple-600 hover:bg-purple-50">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir l'API Reference
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-coral-500" />
            Fonctionnalités principales
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-coral-500 to-rose-500 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {feature.tech}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Code className="w-8 h-8 mr-3 text-coral-500" />
            Exemples de code
          </h2>
          <div className="space-y-8">
            {codeExamples.map((example) => (
              <Card key={example.id} className="bg-white/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{example.title}</CardTitle>
                      <Badge variant="outline">{example.language}</Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(example.code, example.id)}
                      className="border-coral-200 text-coral-600 hover:bg-coral-50"
                    >
                      {copiedCode === example.id ? (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      {copiedCode === example.id ? "Copié !" : "Copier"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Settings className="w-8 h-8 mr-3 text-coral-500" />
            Intégrations disponibles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{integration.name}</h3>
                    <Badge
                      variant={integration.status === "Active" ? "default" : "secondary"}
                      className={integration.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {integration.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{integration.description}</p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <code className="text-sm text-gray-800">{integration.endpoint}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-coral-500" />
            Sécurité et confidentialité
          </h2>
          <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Chiffrement End-to-End</h3>
                  <p className="text-gray-600 text-sm">Toutes vos données sont chiffrées en transit et au repos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Conformité RGPD</h3>
                  <p className="text-gray-600 text-sm">Respect total de la réglementation européenne</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Contrôle des données</h3>
                  <p className="text-gray-600 text-sm">Vous gardez le contrôle total de vos informations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-coral-500 to-rose-500 text-white shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Besoin d'aide ?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Notre équipe est là pour vous accompagner dans votre utilisation de MotivAI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-coral-500 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat support
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Centre d'aide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
