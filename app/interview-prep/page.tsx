"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Play, ArrowLeft, CheckCircle, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function InterviewPrepPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)

  const questions = [
    "Parlez-moi de vous et de votre parcours professionnel",
    "Pourquoi souhaitez-vous rejoindre notre entreprise ?",
    "Quelles sont vos principales forces et faiblesses ?",
    "Décrivez une situation difficile que vous avez surmontée",
    "Où vous voyez-vous dans 5 ans ?",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Préparation Entretiens</h1>
              <p className="text-xl text-gray-600">Entraînez-vous avec des simulations réalistes</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Interview Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Simulation d'entretien</CardTitle>
                  <Badge variant="secondary">Question {currentQuestion + 1}/5</Badge>
                </div>
                <CardDescription>Répondez naturellement, l'IA analysera votre performance</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-16 h-16 text-white" />
                  </div>

                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h3>
                    <p className="text-xl text-gray-700 leading-relaxed">{questions[currentQuestion]}</p>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      size="lg"
                      onClick={() => setIsRecording(!isRecording)}
                      className={`px-8 py-4 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                      {isRecording ? (
                        <>
                          <div className="w-4 h-4 bg-white rounded-full mr-2 animate-pulse" />
                          Arrêter l'enregistrement
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Commencer à répondre
                        </>
                      )}
                    </Button>

                    {currentQuestion < questions.length - 1 && (
                      <Button variant="outline" size="lg" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                        Question suivante
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {questions.map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index < currentQuestion
                            ? "bg-green-500"
                            : index === currentQuestion
                              ? "bg-blue-500"
                              : "bg-gray-200"
                        }`}
                      >
                        {index < currentQuestion ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-sm font-semibold text-white">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-sm ${index <= currentQuestion ? "text-gray-900" : "text-gray-500"}`}>
                        Question {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conseils IA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Prenez votre temps</p>
                    <p className="text-sm text-gray-600">Réfléchissez avant de répondre</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Soyez spécifique</p>
                    <p className="text-sm text-gray-600">Donnez des exemples concrets</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Restez naturel</p>
                    <p className="text-sm text-gray-600">Exprimez-vous avec authenticité</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Entretiens simulés</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Score moyen</span>
                    <span className="font-semibold text-green-600">8.5/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Temps de réponse</span>
                    <span className="font-semibold">45s</span>
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
