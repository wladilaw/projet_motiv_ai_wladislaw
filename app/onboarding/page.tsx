"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, User, FileText, Briefcase, Target } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    id: 1,
    title: "Profil personnel",
    description: "Vos informations de base",
    icon: User,
    completed: false,
    href: "/onboarding/personal-info",
  },
  {
    id: 2,
    title: "Expériences",
    description: "Votre parcours professionnel",
    icon: Briefcase,
    completed: false,
    href: "/onboarding/experience",
  },
  {
    id: 3,
    title: "Compétences",
    description: "Vos savoir-faire",
    icon: Target,
    completed: false,
    href: "/onboarding/skills",
  },
  {
    id: 4,
    title: "Finalisation",
    description: "Validation de votre profil",
    icon: FileText,
    completed: false,
    href: "/onboarding/review",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const completedSteps = 0
  const progressPercentage = (completedSteps / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MotivAI
              </span>
            </Link>
            <Badge variant="secondary">Processus guidé</Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Créons votre profil professionnel</h1>
          <p className="text-gray-600 mb-6">
            Suivez notre processus guidé pour créer un profil complet et générer des lettres de motivation
            personnalisées
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progression</span>
              <span>
                {completedSteps}/{steps.length} étapes
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Steps Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {steps.map((step) => {
            const Icon = step.icon
            const isCompleted = step.completed
            const isCurrent = step.id === currentStep
            const isAccessible = step.id <= currentStep || isCompleted

            return (
              <Card
                key={step.id}
                className={`relative transition-all duration-200 ${
                  isCurrent
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : isCompleted
                      ? "bg-green-50 border-green-200"
                      : "hover:shadow-md"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-100 text-green-600"
                            : isCurrent
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {isCompleted && <Badge variant="secondary">Terminé</Badge>}
                      {isCurrent && <Badge>En cours</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={step.href}>
                    <Button
                      variant={isCurrent ? "default" : isCompleted ? "outline" : "ghost"}
                      className="w-full"
                      disabled={!isAccessible}
                    >
                      {isCompleted ? "Modifier" : isCurrent ? "Continuer" : "Commencer"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Prêt à commencer ?</h3>
            <p className="text-blue-100 mb-6">
              Notre processus guidé vous accompagne étape par étape pour créer un profil professionnel complet
            </p>
            <Link href="/onboarding/personal-info">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
