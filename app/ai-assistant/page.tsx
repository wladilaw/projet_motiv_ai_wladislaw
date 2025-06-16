import { AIChat } from "@/components/ai-chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, MessageCircle, Target, FileText, TrendingUp } from "lucide-react"

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Assistant IA Carrière
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">Ton coach personnel propulsé par l'IA Groq ultra-rapide</p>
          <Badge variant="secondary" className="flex items-center gap-1 w-fit mx-auto">
            <Zap className="h-3 w-3" />
            100% Gratuit • Réponses instantanées
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <AIChat />
          </div>

          {/* Features Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  Que puis-je faire ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Optimiser ton CV</h4>
                    <p className="text-sm text-gray-600">Conseils personnalisés pour améliorer ton CV</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Préparer tes entretiens</h4>
                    <p className="text-sm text-gray-600">Questions types et stratégies de réponse</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Planifier ta carrière</h4>
                    <p className="text-sm text-gray-600">Conseils d'évolution et opportunités</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Questions d'exemple</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-gray-50 rounded text-sm">
                  "Comment améliorer mon CV pour un poste de développeur ?"
                </div>
                <div className="p-2 bg-gray-50 rounded text-sm">"Quelles questions poser en entretien ?"</div>
                <div className="p-2 bg-gray-50 rounded text-sm">"Comment négocier mon salaire ?"</div>
                <div className="p-2 bg-gray-50 rounded text-sm">"Quelles compétences développer en 2024 ?"</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5" />
                  <h4 className="font-medium">Groq AI</h4>
                </div>
                <p className="text-sm opacity-90">
                  Réponses ultra-rapides grâce à l'infrastructure Groq optimisée pour l'IA
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
