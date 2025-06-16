"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Save, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string
}

interface Education {
  id: string
  school: string
  degree: string
  year: string
  description: string
}

export default function CVFormPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
  })

  // Professional Summary
  const [summary, setSummary] = useState("")

  // Skills
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  // Experience
  const [experiences, setExperiences] = useState<Experience[]>([])

  // Education
  const [education, setEducation] = useState<Education[]>([])

  // Languages
  const [languages, setLanguages] = useState<{ language: string; level: string }[]>([])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      duration: "",
      description: "",
    }
    setExperiences([...experiences, newExp])
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
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
      year: "",
      description: "",
    }
    setEducation([...education, newEdu])
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const addLanguage = () => {
    setLanguages([...languages, { language: "", level: "" }])
  }

  const updateLanguage = (index: number, field: "language" | "level", value: string) => {
    const newLanguages = [...languages]
    newLanguages[index][field] = value
    setLanguages(newLanguages)
  }

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const cvData = {
      personalInfo,
      summary,
      skills,
      experiences,
      education,
      languages,
    }

    try {
      const response = await fetch("/api/cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cvData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/dashboard?cvId=${result.id}`)
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Création de CV</span>
            </div>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Créez votre profil professionnel</h1>
          <p className="text-gray-600">
            Remplissez vos informations pour générer des lettres de motivation personnalisées
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>Vos coordonnées et informations de contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={personalInfo.linkedin}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/votre-profil"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio/Site web</Label>
                  <Input
                    id="portfolio"
                    value={personalInfo.portfolio}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                    placeholder="https://votre-portfolio.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résumé professionnel */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé professionnel</CardTitle>
              <CardDescription>Décrivez brièvement votre profil et vos objectifs professionnels</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Ex: Étudiant en informatique passionné par le développement web, à la recherche d'un stage pour mettre en pratique mes compétences..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Compétences */}
          <Card>
            <CardHeader>
              <CardTitle>Compétences</CardTitle>
              <CardDescription>Ajoutez vos compétences techniques et soft skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Ex: JavaScript, Communication, Gestion de projet..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expériences */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Expériences professionnelles</CardTitle>
                  <CardDescription>Vos stages, emplois et expériences professionnelles</CardDescription>
                </div>
                <Button type="button" onClick={addExperience} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Expérience</h4>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Entreprise</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                    <div>
                      <Label>Poste</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        placeholder="Intitulé du poste"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Période</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                      placeholder="Ex: Janvier 2023 - Mars 2023"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Décrivez vos missions et réalisations..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Formation */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Formation</CardTitle>
                  <CardDescription>Votre parcours scolaire et universitaire</CardDescription>
                </div>
                <Button type="button" onClick={addEducation} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Formation</h4>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
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
                        placeholder="Ex: Master en Informatique"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Année</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                      placeholder="Ex: 2023-2024"
                    />
                  </div>
                  <div>
                    <Label>Description (optionnel)</Label>
                    <Textarea
                      value={edu.description}
                      onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                      placeholder="Spécialisation, projets, mentions..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Langues */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Langues</CardTitle>
                  <CardDescription>Les langues que vous maîtrisez</CardDescription>
                </div>
                <Button type="button" onClick={addLanguage} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {languages.map((lang, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label>Langue</Label>
                    <Input
                      value={lang.language}
                      onChange={(e) => updateLanguage(index, "language", e.target.value)}
                      placeholder="Ex: Anglais"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Niveau</Label>
                    <Select value={lang.level} onValueChange={(value) => updateLanguage(index, "level", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le niveau" />
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
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeLanguage(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/">
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-purple-600">
              {isLoading ? (
                <>Sauvegarde...</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder mon profil
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
