"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Briefcase, Plus, X, Building } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  type: "stage" | "emploi" | "freelance" | "projet"
}

interface Education {
  id: string
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
  current: boolean
  description: string
}

export default function ExperiencePage() {
  const router = useRouter()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience")

  useEffect(() => {
    // Charger les données sauvegardées
    const savedData = localStorage.getItem("onboarding-experience")
    if (savedData) {
      const { experiences: savedExp, education: savedEdu } = JSON.parse(savedData)
      setExperiences(savedExp || [])
      setEducation(savedEdu || [])
    }
  }, [])

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      type: "emploi",
    }
    setExperiences([...experiences, newExp])
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      current: false,
      description: "",
    }
    setEducation([...education, newEdu])
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const handleNext = () => {
    // Sauvegarder les données
    localStorage.setItem("onboarding-experience", JSON.stringify({ experiences, education }))
    router.push("/onboarding/skills")
  }

  const handleSkip = () => {
    router.push("/onboarding/skills")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/onboarding/personal-info" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Étape précédente</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Étape 2/4 - Expériences</span>
            </div>
            <div className="w-24">
              <Progress value={50} className="h-2" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Votre parcours</h1>
          <p className="text-gray-600">
            Ajoutez vos expériences professionnelles et votre formation pour enrichir votre profil.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "experience" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Briefcase className="w-4 h-4 inline mr-2" />
            Expériences professionnelles
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "education" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Building className="w-4 h-4 inline mr-2" />
            Formation
          </button>
        </div>

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Expériences professionnelles</CardTitle>
                    <CardDescription>Stages, emplois, projets freelance, etc.</CardDescription>
                  </div>
                  <Button onClick={addExperience} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {experiences.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune expérience ajoutée</h3>
                    <p className="text-gray-600 mb-4">Commencez par ajouter votre première expérience</p>
                    <Button onClick={addExperience}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une expérience
                    </Button>
                  </div>
                ) : (
                  experiences.map((exp) => (
                    <div key={exp.id} className="border rounded-lg p-6 space-y-4 bg-white">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-lg">Expérience professionnelle</h4>
                        <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Type d'expérience</Label>
                          <Select value={exp.type} onValueChange={(value) => updateExperience(exp.id, "type", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="stage">Stage</SelectItem>
                              <SelectItem value="emploi">Emploi</SelectItem>
                              <SelectItem value="freelance">Freelance</SelectItem>
                              <SelectItem value="projet">Projet</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Entreprise/Organisation</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Nom de l'entreprise"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Poste/Fonction</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          placeholder="Intitulé du poste"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Date de début</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Date de fin</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            disabled={exp.current}
                          />
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              id={`current-${exp.id}`}
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                              className="mr-2"
                            />
                            <Label htmlFor={`current-${exp.id}`} className="text-sm">
                              Poste actuel
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Description des missions</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          placeholder="Décrivez vos missions, réalisations et responsabilités..."
                          rows={3}
                        />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Formation et éducation</CardTitle>
                    <CardDescription>Diplômes, certifications, formations</CardDescription>
                  </div>
                  <Button onClick={addEducation} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.length === 0 ? (
                  <div className="text-center py-8">
                    <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation ajoutée</h3>
                    <p className="text-gray-600 mb-4">Ajoutez votre parcours scolaire et universitaire</p>
                    <Button onClick={addEducation}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une formation
                    </Button>
                  </div>
                ) : (
                  education.map((edu) => (
                    <div key={edu.id} className="border rounded-lg p-6 space-y-4 bg-white">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-lg">Formation</h4>
                        <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>École/Université</Label>
                          <Input
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                            placeholder="Nom de l'établissement"
                          />
                        </div>
                        <div>
                          <Label>Diplôme</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            placeholder="Ex: Master, Licence, BTS..."
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Domaine d'études</Label>
                        <Input
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                          placeholder="Ex: Informatique, Marketing, Ingénierie..."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Année de début</Label>
                          <Input
                            type="number"
                            value={edu.startYear}
                            onChange={(e) => updateEducation(edu.id, "startYear", e.target.value)}
                            placeholder="2020"
                          />
                        </div>
                        <div>
                          <Label>Année de fin</Label>
                          <Input
                            type="number"
                            value={edu.endYear}
                            onChange={(e) => updateEducation(edu.id, "endYear", e.target.value)}
                            placeholder="2024"
                            disabled={edu.current}
                          />
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              id={`current-edu-${edu.id}`}
                              checked={edu.current}
                              onChange={(e) => updateEducation(edu.id, "current", e.target.checked)}
                              className="mr-2"
                            />
                            <Label htmlFor={`current-edu-${edu.id}`} className="text-sm">
                              Formation en cours
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Description (optionnel)</Label>
                        <Textarea
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                          placeholder="Spécialisation, projets, mentions, etc..."
                          rows={2}
                        />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link href="/onboarding/personal-info">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleSkip}>
              Passer cette étape
            </Button>
            <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600">
              Continuer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
