"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Download, Eye, MoreHorizontal, TrendingUp } from "lucide-react"

interface Letter {
  id: string
  user: string
  jobTitle: string
  company: string
  status: "Générée" | "Téléchargée" | "Envoyée"
  createdAt: string
  quality: "Excellente" | "Bonne" | "Moyenne"
  wordCount: number
}

export default function AdminLettersPage() {
  const [letters, setLetters] = useState<Letter[]>([
    {
      id: "1",
      user: "Marie Laurent",
      jobTitle: "Développeur Frontend",
      company: "TechCorp",
      status: "Envoyée",
      createdAt: "2024-01-15",
      quality: "Excellente",
      wordCount: 342,
    },
    {
      id: "2",
      user: "Pierre Dubois",
      jobTitle: "Designer UX/UI",
      company: "StartupXYZ",
      status: "Téléchargée",
      createdAt: "2024-01-14",
      quality: "Bonne",
      wordCount: 298,
    },
    {
      id: "3",
      user: "Sophie Bernard",
      jobTitle: "Chef de projet",
      company: "BigCompany",
      status: "Générée",
      createdAt: "2024-01-13",
      quality: "Excellente",
      wordCount: 387,
    },
    {
      id: "4",
      user: "Thomas Martin",
      jobTitle: "Data Scientist",
      company: "DataFlow",
      status: "Téléchargée",
      createdAt: "2024-01-12",
      quality: "Moyenne",
      wordCount: 256,
    },
    {
      id: "5",
      user: "Julie Moreau",
      jobTitle: "Marketing Manager",
      company: "AdAgency",
      status: "Envoyée",
      createdAt: "2024-01-11",
      quality: "Bonne",
      wordCount: 324,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [qualityFilter, setQualityFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Générée":
        return "bg-blue-100 text-blue-800"
      case "Téléchargée":
        return "bg-yellow-100 text-yellow-800"
      case "Envoyée":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Excellente":
        return "bg-green-100 text-green-800"
      case "Bonne":
        return "bg-blue-100 text-blue-800"
      case "Moyenne":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredLetters = letters.filter((letter) => {
    const matchesSearch =
      letter.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || letter.status === statusFilter
    const matchesQuality = qualityFilter === "all" || letter.quality === qualityFilter
    return matchesSearch && matchesStatus && matchesQuality
  })

  const stats = {
    totalLetters: letters.length,
    todayLetters: 24,
    avgQuality: 4.2,
    avgWordCount: Math.round(letters.reduce((sum, l) => sum + l.wordCount, 0) / letters.length),
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des lettres</h1>
            <p className="text-gray-600">Surveillez et analysez toutes les lettres de motivation générées</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total lettres</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalLetters}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.todayLetters}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Qualité moyenne</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgQuality}/5</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Mots moyens</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgWordCount}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par utilisateur, poste ou entreprise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Générée">Générée</SelectItem>
                  <SelectItem value="Téléchargée">Téléchargée</SelectItem>
                  <SelectItem value="Envoyée">Envoyée</SelectItem>
                </SelectContent>
              </Select>
              <Select value={qualityFilter} onValueChange={setQualityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par qualité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les qualités</SelectItem>
                  <SelectItem value="Excellente">Excellente</SelectItem>
                  <SelectItem value="Bonne">Bonne</SelectItem>
                  <SelectItem value="Moyenne">Moyenne</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Letters Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lettres de motivation ({filteredLetters.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Poste</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Entreprise</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Qualité</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Mots</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLetters.map((letter) => (
                    <tr key={letter.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{letter.user}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{letter.jobTitle}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{letter.company}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(letter.status)}>{letter.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getQualityColor(letter.quality)}>{letter.quality}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium">{letter.wordCount}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{letter.createdAt}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
