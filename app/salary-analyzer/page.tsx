"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, ArrowLeft, TrendingUp, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"

export default function SalaryAnalyzerPage() {
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")
  const [experience, setExperience] = useState("")
  const [results, setResults] = useState(null)

  const handleAnalyze = () => {
    // Simulate analysis
    setResults({
      averageSalary: 65000,
      minSalary: 45000,
      maxSalary: 85000,
      marketPosition: "Compétitif",
      recommendations: [
        "Votre profil correspond à la fourchette haute du marché",
        "Considérez négocier une augmentation de 8-12%",
        "Les compétences en IA sont très demandées dans votre secteur",
      ],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Analyseur de Salaire</h1>
              <p className="text-xl text-gray-600">Découvrez votre valeur sur le marché</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Analysez votre salaire</CardTitle>
              <CardDescription>Renseignez vos informations pour obtenir une analyse personnalisée</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="job-title">Intitulé du poste</Label>
                <Input
                  id="job-title"
                  placeholder="Ex: Développeur Full Stack"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="marseille">Marseille</SelectItem>
                    <SelectItem value="toulouse">Toulouse</SelectItem>
                    <SelectItem value="nantes">Nantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Années d'expérience</Label>
                <Select value={experience} onValueChange={setExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 ans</SelectItem>
                    <SelectItem value="3-5">3-5 ans</SelectItem>
                    <SelectItem value="6-10">6-10 ans</SelectItem>
                    <SelectItem value="10+">10+ ans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAnalyze}
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={!jobTitle || !location || !experience}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyser mon salaire
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Analyse salariale
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {results.averageSalary.toLocaleString()}€
                      </div>
                      <p className="text-gray-600">Salaire moyen pour votre profil</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-700">{results.minSalary.toLocaleString()}€</div>
                        <p className="text-sm text-gray-600">Minimum</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-700">{results.maxSalary.toLocaleString()}€</div>
                        <p className="text-sm text-gray-600">Maximum</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Position: {results.marketPosition}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommandations IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center">
                    Remplissez le formulaire pour obtenir votre analyse salariale personnalisée
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Market Insights */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tendances du marché</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Par région
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Île-de-France</span>
                    <span className="font-semibold">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auvergne-Rhône-Alpes</span>
                    <span className="font-semibold">+8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Occitanie</span>
                    <span className="font-semibold">+12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Par secteur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tech/IA</span>
                    <span className="font-semibold text-green-600">+22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finance</span>
                    <span className="font-semibold">+7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Santé</span>
                    <span className="font-semibold">+11%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Évolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>2024 vs 2023</span>
                    <span className="font-semibold text-green-600">+9.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prévision 2025</span>
                    <span className="font-semibold">+6.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inflation ajustée</span>
                    <span className="font-semibold">+4.1%</span>
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
