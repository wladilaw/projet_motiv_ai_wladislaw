"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Target, Plus, X, Code, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Skill {
  name: string
  level: "debutant" | "intermediaire" | "avance" | "expert"
  category: "technique" | "soft" | "langue" | "autre"
}

interface Language {
  language: string
  level: "debutant" | "intermediaire" | "avance" | "courant" | "natif"
}

const skillSuggestions = {
  technique: [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "HTML/CSS",
    "SQL",
    "Git",
    "Docker",
    "AWS",
    "Figma",
    "Photoshop",
    "Excel",
  ],
  soft: [
    "Communication",
    "Travail en équipe",
    "Leadership",
    "Gestion de projet",
    "Résolution de problèmes",
    "Créativité",
    "Adaptabilité",
    "Organisation",
  ],
}

export default function SkillsPage() {
  const router = useRouter()
  const [skills, setSkills] = useState<Skill[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [skillCategory, setSkillCategory] = useState<Skill["category"]>("technique")
  const [skillLevel, setSkillLevel] = useState<Skill["level"]>("intermediaire")
  const [activeTab, setActiveTab] = useState<"skills" | "languages">("skills")

  useEffect(() => {
    // Charger les données sauvegardées
    const savedData = localStorage.getItem("onboarding-skills")
    if (savedData) {
      const { skills: savedSkills, languages: savedLanguages } = JSON.parse(savedData)
      setSkills(savedSkills || [])
      setLanguages(savedLanguages || [])
    }
  }, [])

  const addSkill = (skillName?: string) => {
    const name = skillName || newSkill.trim()
    if (name && !skills.find((s) => s.name.toLowerCase() === name.toLowerCase())) {
      const newSkillObj: Skill = {
        name,
        level: skillLevel,
        category: skillCategory,
      }
      setSkills([...skills, newSkillObj])
      setNewSkill("")
    }
  }

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter((skill) => skill.name !== skillName))
  }

  const addLanguage = () => {
    const newLang: Language = {
      language: "",
      level: "intermediaire",
    }
    setLanguages([...languages, newLang])
  }

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const newLanguages = [...languages]
    newLanguages[index][field] = value as any
    setLanguages(newLanguages)
  }

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    // Sauvegarder les données
    localStorage.setItem("onboarding-skills", JSON.stringify({ skills, languages }))
    router.push("/onboarding/review")
  }

  const handleSkip = () => {
    router.push("/onboarding/review")
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "debutant":
        return "bg-gray-100 text-gray-800"
      case "intermediaire":
        return "bg-blue-100 text-blue-800"
      case "avance":
        return "bg-green-100 text-green-800"
      case "expert":
      case "courant":
      case "natif":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technique":
        return <Code className="w-4 h-4" />
      case "soft":
        return <Users className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/onboarding/experience" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Étape précédente</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Étape 3/4 - Compétences</span>
            </div>
            <div className="w-24">
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vos compétences</h1>
          <p className="text-gray-600">
            Ajoutez vos compétences techniques, soft skills et langues pour enrichir votre profil.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "skills" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            Compétences ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab("languages")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "languages" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Langues ({languages.length})
          </button>
        </div>

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter une compétence</CardTitle>
                <CardDescription>Sélectionnez dans nos suggestions ou ajoutez vos propres compétences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Catégorie</Label>
                    <Select value={skillCategory} onValueChange={(value) => setSkillCategory(value as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technique">Technique</SelectItem>
                        <SelectItem value="soft">Soft Skills</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Niveau</Label>
                    <Select value={skillLevel} onValueChange={(value) => setSkillLevel(value as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debutant">Débutant</SelectItem>
                        <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                        <SelectItem value="avance">Avancé</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Compétence</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Ex: JavaScript, Communication..."
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <Button onClick={() => addSkill()} disabled={!newSkill.trim()}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Compétences techniques suggérées
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions.technique.map((skill) => (
                        <Button
                          key={skill}
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(skill)}
                          disabled={skills.some((s) => s.name === skill)}
                        >
                          {skill}
                          <Plus className="w-3 h-3 ml-1" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Soft skills suggérées
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions.soft.map((skill) => (
                        <Button
                          key={skill}
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(skill)}
                          disabled={skills.some((s) => s.name === skill)}
                        >
                          {skill}
                          <Plus className="w-3 h-3 ml-1" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills List */}
            <Card>
              <CardHeader>
                <CardTitle>Vos compétences ({skills.length})</CardTitle>
                <CardDescription>Compétences ajoutées à votre profil</CardDescription>
              </CardHeader>
              <CardContent>
                {skills.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune compétence ajoutée</h3>
                    <p className="text-gray-600">Commencez par ajouter vos compétences principales</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {["technique", "soft", "autre"].map((category) => {
                      const categorySkills = skills.filter((skill) => skill.category === category)
                      if (categorySkills.length === 0) return null

                      return (
                        <div key={category}>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            {getCategoryIcon(category)}
                            {category === "technique"
                              ? "Compétences techniques"
                              : category === "soft"
                                ? "Soft skills"
                                : "Autres compétences"}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {categorySkills.map((skill) => (
                              <Badge
                                key={skill.name}
                                variant="secondary"
                                className={`${getLevelColor(skill.level)} flex items-center gap-1`}
                              >
                                {skill.name} • {skill.level}
                                <X
                                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                                  onClick={() => removeSkill(skill.name)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Languages Tab */}
        {activeTab === "languages" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Langues</CardTitle>
                    <CardDescription>Ajoutez les langues que vous maîtrisez</CardDescription>
                  </div>
                  <Button onClick={addLanguage} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une langue
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {languages.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune langue ajoutée</h3>
                    <p className="text-gray-600 mb-4">Ajoutez les langues que vous parlez</p>
                    <Button onClick={addLanguage}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une langue
                    </Button>
                  </div>
                ) : (
                  languages.map((lang, index) => (
                    <div key={index} className="flex gap-4 items-end p-4 border rounded-lg">
                      <div className="flex-1">
                        <Label>Langue</Label>
                        <Input
                          value={lang.language}
                          onChange={(e) => updateLanguage(index, "language", e.target.value)}
                          placeholder="Ex: Anglais, Espagnol..."
                        />
                      </div>
                      <div className="flex-1">
                        <Label>Niveau</Label>
                        <Select value={lang.level} onValueChange={(value) => updateLanguage(index, "level", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="debutant">Débutant</SelectItem>
                            <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                            <SelectItem value="avance">Avancé</SelectItem>
                            <SelectItem value="courant">Courant</SelectItem>
                            <SelectItem value="natif">Natif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeLanguage(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link href="/onboarding/experience">
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
