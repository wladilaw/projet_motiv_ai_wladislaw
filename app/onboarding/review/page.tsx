"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, User, Briefcase, Target, Edit, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ReviewPage() {
  const router = useRouter()
  const [personalInfo, setPersonalInfo] = useState<any>({})
  const [experienceData, setExperienceData] = useState<any>({})
  const [skillsData, setSkillsData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Charger toutes les données sauvegardées
    const personal = localStorage.getItem("onboarding-personal")
    const experience = localStorage.getItem("onboarding-experience")
    const skills = localStorage.getItem("onboarding-skills")

    if (personal) setPersonalInfo(JSON.parse(personal))
    if (experience) setExperienceData(JSON.parse(experience))
    if (skills) setSkillsData(JSON.parse(skills))
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const completeProfile = {
      personalInfo,
      experiences: experienceData.experiences || [],
      education: experienceData.education || [],
      skills: skillsData.skills || [],
      languages: skillsData.languages || [],
      createdAt: new Date().toISOString(),
    }

    try {
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeProfile),
      })

      if (response.ok) {
        const result = await response.json()
        // Nettoyer le localStorage
        localStorage.removeItem("onboarding-personal")
        localStorage.removeItem("onboarding-experience")
        localStorage.removeItem("onboarding-skills")

        // Rediriger vers le dashboard
        router.push(`/dashboard?welcome=true&profileId=${result.id}`)
      }
    } catch (error) {
      console.error("Erreur lors de la finalisation:", error)
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/onboarding/skills" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Étape précédente</span>
            </Link>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Étape 4/4 - Finalisation</span>
            </div>
            <div className="w-24">
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Récapitulatif de votre profil</h1>
          <p className="text-gray-600">Vérifiez vos informations avant de finaliser votre profil professionnel.</p>
        </div>

        <div className="space-y-6">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <CardTitle>Informations personnelles</CardTitle>
                </div>
                <Link href="/onboarding/personal-info">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="font-medium">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{personalInfo.email}</p>
                </div>
                {personalInfo.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">{personalInfo.phone}</p>
                  </div>
                )}
                {personalInfo.address && (
                  <div>
                    <p className="text-sm text-gray-600">Adresse</p>
                    <p className="font-medium">{personalInfo.address}</p>
                  </div>
                )}
              </div>
              {personalInfo.summary && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Résumé professionnel</p>
                  <p className="font-medium">{personalInfo.summary}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Expériences */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <CardTitle>
                    Expériences ({(experienceData.experiences || []).length + (experienceData.education || []).length})
                  </CardTitle>
                </div>
                <Link href="/onboarding/experience">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Expériences professionnelles */}
              {experienceData.experiences && experienceData.experiences.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Expériences professionnelles</h4>
                  <div className="space-y-2">
                    {experienceData.experiences.map((exp: any, index: number) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <p className="font-medium">
                          {exp.position} - {exp.company}
                        </p>
                        <p className="text-sm text-gray-600">
                          {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {exp.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formation */}
              {experienceData.education && experienceData.education.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Formation</h4>
                  <div className="space-y-2">
                    {experienceData.education.map((edu: any, index: number) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4">
                        <p className="font-medium">
                          {edu.degree} en {edu.field}
                        </p>
                        <p className="text-sm text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-600">
                          {edu.startYear} - {edu.current ? "En cours" : edu.endYear}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!experienceData.experiences || experienceData.experiences.length === 0) &&
                (!experienceData.education || experienceData.education.length === 0) && (
                  <p className="text-gray-500 italic">Aucune expérience ou formation ajoutée</p>
                )}
            </CardContent>
          </Card>

          {/* Compétences */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <CardTitle>
                    Compétences ({(skillsData.skills || []).length + (skillsData.languages || []).length})
                  </CardTitle>
                </div>
                <Link href="/onboarding/skills">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Compétences */}
              {skillsData.skills && skillsData.skills.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Compétences</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.skills.map((skill: any, index: number) => (
                      <Badge key={index} className={getLevelColor(skill.level)}>
                        {skill.name} • {skill.level}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Langues */}
              {skillsData.languages && skillsData.languages.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Langues</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.languages.map((lang: any, index: number) => (
                      <Badge key={index} className={getLevelColor(lang.level)}>
                        {lang.language} • {lang.level}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(!skillsData.skills || skillsData.skills.length === 0) &&
                (!skillsData.languages || skillsData.languages.length === 0) && (
                  <p className="text-gray-500 italic">Aucune compétence ou langue ajoutée</p>
                )}
            </CardContent>
          </Card>

          {/* Finalisation */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="py-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Profil prêt à être finalisé !</h3>
              <p className="text-gray-600 mb-6">
                Votre profil professionnel est maintenant complet. Vous pourrez générer des lettres de motivation
                personnalisées avec l'IA.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/onboarding/skills">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour aux compétences
                  </Button>
                </Link>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-blue-600"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>Finalisation...</>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Finaliser mon profil
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
