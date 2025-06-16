"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Search, Download, Eye, MoreHorizontal, Plus, MapPin, Clock } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "CDI" | "CDD" | "Stage" | "Freelance"
  salary: string
  status: "Actif" | "Fermé" | "Brouillon"
  applications: number
  postedDate: string
  sector: string
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Développeur Frontend React",
      company: "TechCorp",
      location: "Paris",
      type: "CDI",
      salary: "45-55K€",
      status: "Actif",
      applications: 24,
      postedDate: "2024-01-15",
      sector: "Tech",
    },
    {
      id: "2",
      title: "Designer UX/UI Senior",
      company: "StartupXYZ",
      location: "Lyon",
      type: "CDI",
      salary: "40-50K€",
      status: "Actif",
      applications: 18,
      postedDate: "2024-01-14",
      sector: "Design",
    },
    {
      id: "3",
      title: "Chef de Projet Digital",
      company: "BigCompany",
      location: "La Défense",
      type: "CDI",
      salary: "50-60K€",
      status: "Fermé",
      applications: 45,
      postedDate: "2024-01-10",
      sector: "Management",
    },
    {
      id: "4",
      title: "Data Scientist",
      company: "DataFlow",
      location: "Toulouse",
      type: "CDD",
      salary: "35-45K€",
      status: "Brouillon",
      applications: 0,
      postedDate: "2024-01-16",
      sector: "Data",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Fermé":
        return "bg-red-100 text-red-800"
      case "Brouillon":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CDI":
        return "bg-coral-100 text-coral-800"
      case "CDD":
        return "bg-blue-100 text-blue-800"
      case "Stage":
        return "bg-purple-100 text-purple-800"
      case "Freelance":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesType = typeFilter === "all" || job.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter((j) => j.status === "Actif").length,
    totalApplications: jobs.reduce((sum, j) => sum + j.applications, 0),
    avgApplications: Math.round(jobs.reduce((sum, j) => sum + j.applications, 0) / jobs.length),
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des offres d'emploi</h1>
            <p className="text-gray-600">Gérez toutes les offres d'emploi de la plateforme</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm" className="bg-coral-500 hover:bg-coral-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle offre
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
                  <p className="text-sm font-medium text-gray-600">Total offres</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
                </div>
                <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-coral-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Offres actives</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Candidatures totales</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Moyenne candidatures</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgApplications}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-purple-600" />
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
                    placeholder="Rechercher par titre, entreprise ou localisation..."
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
                  <SelectItem value="Fermé">Fermé</SelectItem>
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="CDI">CDI</SelectItem>
                  <SelectItem value="CDD">CDD</SelectItem>
                  <SelectItem value="Stage">Stage</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Offres d'emploi ({filteredJobs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Poste</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Entreprise</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Candidatures</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Salaire</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{job.title}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{job.company}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium">{job.applications}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{job.salary}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.postedDate}
                        </div>
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
