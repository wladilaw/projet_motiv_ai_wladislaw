"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Search, Download, Eye, MoreHorizontal, Plus } from "lucide-react"

interface Company {
  id: string
  name: string
  sector: string
  size: string
  status: "Actif" | "Inactif" | "Partenaire"
  jobsPosted: number
  applicationsReceived: number
  location: string
  website: string
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "TechCorp",
      sector: "Technologie",
      size: "500-1000",
      status: "Partenaire",
      jobsPosted: 24,
      applicationsReceived: 156,
      location: "Paris",
      website: "techcorp.com",
    },
    {
      id: "2",
      name: "StartupXYZ",
      sector: "Startup",
      size: "10-50",
      status: "Actif",
      jobsPosted: 8,
      applicationsReceived: 42,
      location: "Lyon",
      website: "startupxyz.fr",
    },
    {
      id: "3",
      name: "BigCompany",
      sector: "Finance",
      size: "1000+",
      status: "Actif",
      jobsPosted: 45,
      applicationsReceived: 289,
      location: "La Défense",
      website: "bigcompany.com",
    },
    {
      id: "4",
      name: "DataFlow",
      sector: "Data Science",
      size: "100-500",
      status: "Inactif",
      jobsPosted: 12,
      applicationsReceived: 67,
      location: "Toulouse",
      website: "dataflow.ai",
    },
    {
      id: "5",
      name: "AdAgency",
      sector: "Marketing",
      size: "50-100",
      status: "Actif",
      jobsPosted: 18,
      applicationsReceived: 94,
      location: "Marseille",
      website: "adagency.fr",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sectorFilter, setSectorFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Inactif":
        return "bg-gray-100 text-gray-800"
      case "Partenaire":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    const matchesSector = sectorFilter === "all" || company.sector === sectorFilter
    return matchesSearch && matchesStatus && matchesSector
  })

  const stats = {
    totalCompanies: companies.length,
    activeCompanies: companies.filter((c) => c.status === "Actif").length,
    partners: companies.filter((c) => c.status === "Partenaire").length,
    totalJobs: companies.reduce((sum, c) => sum + c.jobsPosted, 0),
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des entreprises</h1>
            <p className="text-gray-600">Gérez les entreprises partenaires et leurs offres d'emploi</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter entreprise
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
                  <p className="text-sm font-medium text-gray-600">Total entreprises</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Entreprises actives</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeCompanies}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Partenaires</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.partners}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Offres totales</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-orange-600" />
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
                    placeholder="Rechercher par nom, secteur ou localisation..."
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
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                  <SelectItem value="Partenaire">Partenaire</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  <SelectItem value="Technologie">Technologie</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des entreprises ({filteredCompanies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Entreprise</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Secteur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Taille</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Offres</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Candidatures</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Localisation</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.website}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{company.sector}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{company.size}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium">{company.jobsPosted}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium">{company.applicationsReceived}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{company.location}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
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
