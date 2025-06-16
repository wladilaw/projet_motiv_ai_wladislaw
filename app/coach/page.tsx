"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Brain, MessageCircle, Target, TrendingUp, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function CoachPage() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState([
    {
      type: "ai",
      content:
        "Bonjour ! Je suis votre coach IA personnel. Comment puis-je vous aider dans votre parcours professionnel aujourd'hui ?",
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    setConversation((prev) => [...prev, { type: "user", content: message }])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "Excellente question ! Basé sur votre profil, je recommande de vous concentrer sur le développement de vos compétences en leadership. Voici un plan personnalisé...",
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Coach IA Personnel</h1>
              <p className="text-xl text-gray-600">Votre mentor disponible 24/7</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conversation avec votre Coach IA
                </CardTitle>
                <CardDescription>
                  Posez vos questions sur votre carrière, vos objectifs ou vos défis professionnels
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {conversation.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          msg.type === "user" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Posez votre question au coach IA..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  />
                  <Button onClick={handleSendMessage} className="bg-purple-500 hover:bg-purple-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggestions de coaching</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-left h-auto p-4">
                  <Target className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Comment définir mes objectifs de carrière ?</span>
                </Button>
                <Button variant="outline" className="w-full justify-start text-left h-auto p-4">
                  <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Stratégies pour une promotion</span>
                </Button>
                <Button variant="outline" className="w-full justify-start text-left h-auto p-4">
                  <Brain className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Développer mes compétences</span>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Votre progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Objectifs définis</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Plan d'action</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
