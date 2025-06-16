"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, User, Mail, Phone, MapPin, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PersonalInfoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
    summary: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis"
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis"
    if (!formData.email.trim()) newErrors.email = "L'email est requis"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      // Sauvegarder les données dans le localStorage ou l'état global
      localStorage.setItem("onboarding-personal", JSON.stringify(formData))
      router.push("/onboarding/experience")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/onboarding" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Retour au processus</span>
            </Link>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Étape 1/4 - Informations personnelles</span>
            </div>
            <div className="w-24">
              <Progress value={25} className="h-2" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parlez-nous de vous</h1>
          <p className="text-gray-600">
            Ces informations nous aideront à personnaliser vos lettres de motivation et à créer votre profil
            professionnel.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Informations personnelles
            </CardTitle>
            <CardDescription>Remplissez vos coordonnées et informations de contact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nom et Prénom */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                    placeholder="Jean"
                  />
                  <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                    placeholder="Dupont"
                  />
                  <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email et Téléphone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="jean.dupont@email.com"
                  />
                  <Mail className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="06 12 34 56 78"
                  />
                  <Phone className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Adresse */}
            <div>
              <Label htmlFor="address">Adresse</Label>
              <div className="relative">
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Rue de la Paix, 75001 Paris"
                />
                <MapPin className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* LinkedIn et Portfolio */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="relative">
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/jean-dupont"
                  />
                  <Globe className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio/Site web</Label>
                <div className="relative">
                  <Input
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={(e) => handleInputChange("portfolio", e.target.value)}
                    placeholder="mon-portfolio.com"
                  />
                  <Globe className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Résumé professionnel */}
            <div>
              <Label htmlFor="summary">Résumé professionnel (optionnel)</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                placeholder="Décrivez brièvement votre profil, vos objectifs et ce qui vous motive..."
                rows={4}
                className="resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                Ce résumé sera utilisé pour personnaliser vos lettres de motivation
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link href="/onboarding">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Continuer
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
