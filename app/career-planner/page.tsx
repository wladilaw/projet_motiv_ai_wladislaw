"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Briefcase,
  Target,
  TrendingUp,
  Users,
  Award,
  Calendar,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Code,
  FileText,
} from "lucide-react"
import Link from "next/link"

interface CareerPath {
  id: string
  title: string
  currentSalary: string
  targetSalary: string
  timeframe: string
  growthPercentage: string
  color: string
  icon: React.ReactNode
  description: string
}

interface Skill {
  name: string
  priority: "Haute" | "Moyenne" | "Faible"
  progress: number
  description: string
}

interface LearningStep {
  id: string
  quarter: string
  title: string
  type: "Formation" | "Mentorat" | "Lecture" | "Certification" | "Projet personnel" | "Conférence"
  completed: boolean
  description: string
}

export default function CareerPlannerPage() {
  const [currentProfile, setCurrentProfile] = useState({
    position: "Développeur Full Stack",
    experience: "3 ans d'expérience",
    competenceLevel: "Intermédiaire+",
    score: "78/10",
    objective: "Tech Lead",
    timeframe: "Dans 2-3 ans",
  })

  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([
    {
      id: "1",
      title: "Développeur Full Stack",
      currentSalary: "52K€",
      targetSalary: "52K€",
      timeframe: "Position actuelle",
      growthPercentage: "Salaire moyen",
      color: "from-blue-500 to-blue-600",
      icon: <Code className="w-6 h-6" />,
      description: "Position actuelle",
    },
    {
      id: "2",
      title: "Senior Developer",
      currentSalary: "68K€",
      targetSalary: "68K€",
      timeframe: "Dans 12-18 mois",
      growthPercentage: "+31% d'augmentation",
      color: "from-green-500 to-green-600",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Évolution naturelle",
    },
    {
      id: "3",
      title: "Tech Lead",
      currentSalary: "85K€",
      targetSalary: "85K€",
      timeframe: "Dans 2-3 ans",
      growthPercentage: "+25% d'augmentation",
      color: "from-purple-500 to-purple-600",
      icon: <Users className="w-6 h-6" />,
      description: "Objectif carrière",
    },
    {
      id: "4",
      title: "Engineering Manager",
      currentSalary: "110K€",
      targetSalary: "110K€",
      timeframe: "Dans 4-5 ans",
      growthPercentage: "+29% d'augmentation",
      color: "from-orange-500 to-orange-600",
      icon: <Award className="w-6 h-6" />,
      description: "Évolution management",
    },
  ])

  const [skillsToImprove, setSkillsToImprove] = useState<Skill[]>([
    {
      name: "Leadership & Management",
      priority: "Haute",
      progress: 25,
      description: "Essentiel pour évoluer vers Tech Lead",
    },
    {
      name: "Architecture & System Design",
      priority: "Haute",
      progress: 60,
      description: "Approfondissez les microservices et le cloud",
    },
    {
      name: "DevOps & Infrastructure",
      priority: "Moyenne",
      progress: 45,
      description: "Kubernetes, CI/CD, monitoring",
    },
  ])

  const [learningPlan, setLearningPlan] = useState<LearningStep[]>([
    {
      id: "1",
      quarter: "Q1 2024",
      title: "Leadership Foundations",
      type: "Formation",
      completed: true,
      description: 'Formation "Management pour développeurs"',
    },
    {
      id: "2",
      quarter: "Q1 2024",
      title: "Mentorat d'un développeur junior",
      type: "Mentorat",
      completed: false,
      description: "Mentorat d'un développeur junior",
    },
    {
      id: "3",
      quarter: "Q1 2024",
      title: 'Lecture: "The Manager\'s Path"',
      type: "Lecture",
      completed: false,
      description: 'Lecture: "The Manager\'s Path"',
    },
    {
      id: "4",
      quarter: "Q2 2024",
      title: "Architecture Avancée",
      type: "Certification",
      completed: false,
      description: "Certification AWS Solutions Architect",
    },
    {
      id: "5",
      quarter: "Q2 2024",
      title: "Projet personnel: Architecture microservices",
      type: "Projet personnel",
      completed: false,
      description: "Projet personnel: Architecture microservices",
    },
    {
      id: "6",
      quarter: "Q2 2024",
      title: "Conférence: Devoxx France",
      type: "Conférence",
      completed: false,
      description: "Conférence: Devoxx France",
    },
  ])

  const [alternativePaths, setAlternativePaths] = useState([
    {
      title: "Expert Technique",
      roles: [
        { title: "Staff Engineer", salary: "95K€" },
        { title: "Principal Engineer", salary: "120K€" },
        { title: "Distinguished Engineer", salary: "150K€" },
      ],
      description: "Focus sur l'expertise technique profonde",
      color: "from-blue-500 to-blue-600",
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: "Product & Strategy",
      roles: [
        { title: "Product Manager", salary: "75K€" },
        { title: "Senior PM", salary: "95K€" },
        { title: "VP Product", salary: "130K€" },
      ],
      description: "Transition vers le product management",
      color: "from-green-500 to-green-600",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Entrepreneuriat",
      roles: [
        { title: "Freelance Senior", salary: "600€/j" },
        { title: "Consultant Expert", salary: "800€/j" },
        { title: "Startup Founder", salary: "Variable" },
      ],
      description: "Indépendance et création d'entreprise",
      color: "from-purple-500 to-purple-600",
      icon: <Lightbulb className="w-6 h-6" />,
    },
  ])

  const [metrics, setMetrics] = useState({
    salaryIncrease: 31,
    promotionProbability: 85,
    newSkills: 12,
    timeToObjective: 24,
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "bg-red-100 text-red-800"
      case "Moyenne":
        return "bg-yellow-100 text-yellow-800"
      case "Faible":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Formation":
        return <BookOpen className="w-4 h-4" />
      case "Mentorat":
        return <Users className="w-4 h-4" />
      case "Lecture":
        return <FileText className="w-4 h-4" />
      case "Certification":
        return <Award className="w-4 h-4" />
      case "Projet personnel":
        return <Code className="w-4 h-4" />
      case "Conférence":
        return <Calendar className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-orange-500">MotivAI</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/career-planner" className="text-orange-500 font-medium">
                Carrière
              </Link>
              <Link href="/onboarding" className="text-gray-600 hover:text-gray-900">
                Compétences
              </Link>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Planificateur de Carrière IA</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez votre chemin de carrière idéal avec notre IA qui analyse le marché, vos compétences et vos
            aspirations pour créer un plan personnalisé.
          </p>
        </div>

        {/* Current Situation */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Target className="w-6 h-6 text-pink-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Votre situation actuelle</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Poste actuel</h3>
                <p className="text-lg font-medium text-gray-900">{currentProfile.position}</p>
                <p className="text-sm text-gray-600">{currentProfile.experience}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Niveau de compétences</h3>
                <p className="text-lg font-medium text-gray-900">{currentProfile.competenceLevel}</p>
                <p className="text-sm text-gray-600">Score: {currentProfile.score}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Objectif carrière</h3>
                <p className="text-lg font-medium text-gray-900">{currentProfile.objective}</p>
                <p className="text-sm text-gray-600">{currentProfile.timeframe}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Career Path */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-teal-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Votre chemin de carrière recommandé</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPaths.map((path, index) => (
              <Card key={path.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${path.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${path.color} rounded-lg flex items-center justify-center text-white`}
                    >
                      {path.icon}
                    </div>
                    {index === 2 && <Badge className="bg-purple-100 text-purple-800">Objectif</Badge>}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{path.targetSalary}</p>
                  <p className="text-sm text-gray-600 mb-2">{path.timeframe}</p>
                  <p className="text-sm font-medium text-green-600">{path.growthPercentage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills and Learning Plan */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Skills to Improve */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Target className="w-6 h-6 text-pink-500 mr-2" />
                <CardTitle>Compétences à développer</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillsToImprove.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{skill.name}</h4>
                    <Badge className={getPriorityColor(skill.priority)}>Priorité: {skill.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Plan */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
                <CardTitle>Plan d'apprentissage</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPlan.map((step) => (
                  <div key={step.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(step.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-blue-600">{step.quarter}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm font-medium text-gray-900">{step.title}</span>
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      <Badge variant="outline" className="mt-1">
                        {step.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Paths */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <ArrowRight className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Chemins alternatifs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {alternativePaths.map((path, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-gray-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${path.color} rounded-lg flex items-center justify-center text-white mr-3`}
                    >
                      {path.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{path.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{path.description}</p>
                  <div className="space-y-2">
                    {path.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{role.title}</span>
                        <span className="text-sm font-bold text-gray-900">{role.salary}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Plan */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white mb-12">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Votre plan d'action personnalisé</h3>
                <p className="text-purple-100 mb-4">
                  Basé sur votre profil et vos objectifs, voici les prochaines étapes concrètes pour accélérer votre
                  évolution de carrière.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Plan personnalisé sur 24 mois</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Formations et certifications recommandées</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Suivi des progrès et ajustements</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <TrendingUp className="w-16 h-16 text-purple-200 mb-4" />
                <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-gray-50">
                  Générer mon plan détaillé
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Métriques de succès</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">+{metrics.salaryIncrease}%</div>
                <p className="text-sm text-gray-600">Augmentation salariale prévue</p>
                <p className="text-xs text-gray-500 mt-1">Dans 18 mois</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">{metrics.promotionProbability}%</div>
                <p className="text-sm text-gray-600">Probabilité de promotion</p>
                <p className="text-xs text-gray-500 mt-1">Avec ce plan</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">{metrics.newSkills}</div>
                <p className="text-sm text-gray-600">Nouvelles compétences</p>
                <p className="text-xs text-gray-500 mt-1">À acquérir</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">{metrics.timeToObjective}</div>
                <p className="text-sm text-gray-600">Mois pour atteindre</p>
                <p className="text-xs text-gray-500 mt-1">Votre objectif</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
