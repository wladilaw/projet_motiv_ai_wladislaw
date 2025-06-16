"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Sparkles, FileText, Download, ArrowLeft, CheckCircle, Copy } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface JobData {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  requirements: string[]
}

export default function GenerateLetterPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")

  const [jobData, setJobData] = useState<JobData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState("")
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(1)

  useEffect(() => {
    // Simuler le chargement des données de l'offre
    if (jobId) {
      const mockJobData: JobData = {
        id: jobId,
        title: "Développeur Frontend React",
        company: "TechCorp",
        location: "Paris",
        type: "CDI",
        salary: "45-55K€",
        description:
          "Nous recherchons un développeur Frontend passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant React, TypeScript et les dernières technologies web.",
        requirements: ["React", "TypeScript", "CSS/SCSS", "Git", "3+ ans d'expérience"],
      }
      setJobData(mockJobData)
    }
  }, [jobId])

  const generateLetter = async () => {
    if (!jobData) return

    setIsGenerating(true)
    setProgress(0)
    setStep(1)

    // Simulation du processus de génération
    const steps = [
      { step: 1, message: "Analyse de votre profil...", duration: 1000 },
      { step: 2, message: "Analyse de l'offre d'emploi...", duration: 1500 },
      { step: 3, message: "Génération du contenu personnalisé...", duration: 2000 },
      { step: 4, message: "Optimisation et finalisation...", duration: 1000 },
    ]

    for (let i = 0; i < steps.length; i++) {
      setStep(steps[i].step)
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration))
      setProgress(((i + 1) / steps.length) * 100)
    }

    // Simuler la génération de la lettre
    const mockLetter = `Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste de ${jobData.title} au sein de votre entreprise ${jobData.company}. Actuellement développeur avec 3 ans d'expérience, je suis particulièrement attiré par votre approche innovante et votre utilisation des technologies modernes.

Mon expertise en React et TypeScript, acquise lors de mes précédents projets, me permettra de contribuer efficacement à vos développements. J'ai notamment travaillé sur des applications web complexes utilisant ces technologies, ce qui m'a permis de développer une solide compréhension des bonnes pratiques et des patterns de développement moderne.

Votre offre m'intéresse particulièrement car elle correspond parfaitement à mon profil technique et à mes aspirations professionnelles. Je suis convaincu que mon expérience en développement frontend et ma passion pour les nouvelles technologies seront des atouts précieux pour votre équipe.

Je serais ravi de pouvoir échanger avec vous lors d'un entretien pour vous présenter plus en détail ma motivation et mes compétences.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.

Jean Dupont`

    setGeneratedLetter(mockLetter)
    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter)
  }

  const downloadLetter = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedLetter], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `lettre-motivation-${jobData?.company}-${jobData?.title}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Offre non trouvée</h2>
          <p className="text-gray-600 mb-4">L'offre d'emploi demandée n'existe pas ou n'est plus disponible.</p>
          <Link href="/jobs">
            <Button>Retour aux offres</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/jobs" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Retour aux offres</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">Génération de lettre IA</span>
            </div>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Génération de lettre de motivation</h1>
          <p className="text-gray-600">
            Notre IA va analyser votre profil et l'offre d'emploi pour créer une lettre personnalisée
          </p>
        </div>

        {/* Job Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Offre sélectionnée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{jobData.title}</h3>
                <p className="text-gray-600 mb-3">
                  {jobData.company} • {jobData.location}
                </p>
                <div className="flex gap-2 mb-3">
                  <Badge variant="outline">{jobData.type}</Badge>
                  <Badge variant="outline">{jobData.salary}</Badge>
                </div>
                <p className="text-gray-700 mb-4">{jobData.description}</p>
                <div className="flex flex-wrap gap-2">
                  {jobData.requirements.map((req, index) => (
                    <Badge key={index} variant="secondary">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generation Process */}
        {!generatedLetter && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Génération IA
              </CardTitle>
              <CardDescription>
                Notre intelligence artificielle va créer une lettre de motivation personnalisée pour cette offre
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-900 mb-2">
                      Étape {step}/4 - Génération en cours...
                    </div>
                    <Progress value={progress} className="h-3 mb-4" />
                    <div className="text-sm text-gray-600">
                      {step === 1 && "Analyse de votre profil..."}
                      {step === 2 && "Analyse de l'offre d'emploi..."}
                      {step === 3 && "Génération du contenu personnalisé..."}
                      {step === 4 && "Optimisation et finalisation..."}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Prêt à générer votre lettre</h3>
                  <p className="text-gray-600 mb-6">
                    Cliquez sur le bouton ci-dessous pour lancer la génération de votre lettre de motivation
                    personnalisée
                  </p>
                  <Button onClick={generateLetter} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Générer ma lettre de motivation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Generated Letter */}
        {generatedLetter && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Lettre de motivation générée
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadLetter}>
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
              <CardDescription>
                Votre lettre de motivation personnalisée est prête ! Vous pouvez la modifier si nécessaire.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {generatedLetter.split(" ").length} mots • {generatedLetter.length} caractères
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={generateLetter}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Régénérer
                    </Button>
                    <Link href="/dashboard">
                      <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Sauvegarder dans mon dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
