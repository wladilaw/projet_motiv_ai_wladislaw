"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  MapPin,
  Building,
  Clock,
  Euro,
  Briefcase,
  Heart,
  ExternalLink,
  Filter,
  Star,
  Users,
  FileText,
  Sparkles,
  Eye,
} from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "CDI" | "CDD" | "Stage" | "Freelance" | "Alternance"
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  applicationDeadline: string
  remote: boolean
  experience: string
  sector: string
  companySize: string
  logo?: string
  featured: boolean
  saved: boolean
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Développeur Frontend React",
      company: "TechCorp",
      location: "Paris",
      type: "CDI",
      salary: "45-55K€",
      description:
        "Nous recherchons un développeur Frontend passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant React, TypeScript et les dernières technologies web.",
      requirements: ["React", "TypeScript", "CSS/SCSS", "Git", "3+ ans d'expérience"],
      benefits: ["Télétravail partiel", "Formation continue", "Tickets restaurant", "Mutuelle"],
      postedDate: "2024-01-15",
      applicationDeadline: "2024-02-15",
      remote: true,
      experience: "3-5 ans",
      sector: "Technologie",
      companySize: "50-200",
      featured: true,
      saved: false,
    },
    {
      id: "2",
      title: "Designer UX/UI Senior",
      company: "StartupXYZ",
      location: "Lyon",
      type: "CDI",
      salary: "40-50K€",
      description:
        "Rejoignez notre startup en pleine croissance en tant que Designer UX/UI Senior. Vous serez responsable de la conception d'interfaces utilisateur intuitives et engageantes.",
      requirements: ["Figma", "Adobe Creative Suite", "Prototypage", "Design System", "5+ ans d'expérience"],
      benefits: ["Stock-options", "Télétravail complet", "Budget formation", "Team building"],
      postedDate: "2024-01-14",
      applicationDeadline: "2024-02-10",
      remote: true,
      experience: "5+ ans",
      sector: "Design",
      companySize: "10-50",
      featured: false,
      saved: true,
    },
    {
      id: "3",
      title: "Stage Data Science",
      company: "DataFlow",
      location: "Toulouse",
      type: "Stage",
      salary: "800-1200€",
      description:
        "Stage de 6 mois en Data Science dans une entreprise spécialisée dans l'analyse de données. Vous travaillerez sur des projets de machine learning et d'analyse prédictive.",
      requirements: ["Python", "Pandas", "Scikit-learn", "SQL", "Étudiant en Master"],
      benefits: ["Encadrement expert", "Projet concret", "Possibilité d'embauche", "Formation"],
      postedDate: "2024-01-13",
      applicationDeadline: "2024-02-05",
      remote: false,
      experience: "Débutant",
      sector: "Data Science",
      companySize: "100-500",
      featured: false,
      saved: false,
    },
    {
      id: "4",
      title: "Chef de Projet Digital",
      company: "BigCompany",
      location: "La Défense",
      type: "CDI",
      salary: "55-65K€",
      description:
        "Nous recherchons un Chef de Projet Digital expérimenté pour piloter nos projets de transformation numérique. Vous coordonnerez les équipes techniques et métier.",
      requirements: ["Gestion de projet", "Agile/Scrum", "Digital", "Leadership", "5+ ans d'expérience"],
      benefits: ["Voiture de fonction", "Primes objectives", "CE", "Mutuelle premium"],
      postedDate: "2024-01-12",
      applicationDeadline: "2024-02-20",
      remote: true,
      experience: "5+ ans",
      sector: "Management",
      companySize: "1000+",
      featured: true,
      saved: false,
    },
    {
      id: "5",
      title: "Développeur Full Stack",
      company: "WebAgency",
      location: "Marseille",
      type: "CDD",
      salary: "35-45K€",
      description:
        "Mission de 12 mois pour développer une plateforme e-commerce innovante. Vous travaillerez avec Node.js, React et MongoDB dans une équipe agile.",
      requirements: ["Node.js", "React", "MongoDB", "API REST", "2+ ans d'expérience"],
      benefits: ["Horaires flexibles", "Télétravail", "Matériel fourni", "Formation"],
      postedDate: "2024-01-11",
      applicationDeadline: "2024-02-01",
      remote: true,
      experience: "2-5 ans",
      sector: "Développement",
      companySize: "20-50",
      featured: false,
      saved: false,
    },
    {
      id: "6",
      title: "Marketing Manager",
      company: "AdAgency",
      location: "Bordeaux",
      type: "CDI",
      salary: "42-52K€",
      description:
        "Poste de Marketing Manager dans une agence créative. Vous développerez les stratégies marketing pour nos clients et piloterez les campagnes digitales.",
      requirements: ["Marketing digital", "Google Ads", "Analytics", "Créativité", "3+ ans d'expérience"],
      benefits: ["Bonus performance", "Télétravail partiel", "Formation", "Événements"],
      postedDate: "2024-01-10",
      applicationDeadline: "2024-02-12",
      remote: true,
      experience: "3-5 ans",
      sector: "Marketing",
      companySize: "50-100",
      featured: false,
      saved: true,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sectorFilter, setSectorFilter] = useState("all")
  const [remoteFilter, setRemoteFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const toggleSaveJob = (jobId: string) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, saved: !job.saved } : job)))
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = locationFilter === "all" || job.location === locationFilter
    const matchesType = typeFilter === "all" || job.type === typeFilter
    const matchesSector = sectorFilter === "all" || job.sector === sectorFilter
    const matchesRemote = remoteFilter === "all" || (remoteFilter === "remote" ? job.remote : !job.remote)
    const matchesExperience = experienceFilter === "all" || job.experience === experienceFilter

    const matchesTab =
      activeTab === "all" || (activeTab === "saved" && job.saved) || (activeTab === "featured" && job.featured)

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesSector &&
      matchesRemote &&
      matchesExperience &&
      matchesTab
    )
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CDI":
        return "bg-green-100 text-green-800"
      case "CDD":
        return "bg-blue-100 text-blue-800"
      case "Stage":
        return "bg-purple-100 text-purple-800"
      case "Freelance":
        return "bg-orange-100 text-orange-800"
      case "Alternance":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    totalJobs: jobs.length,
    savedJobs: jobs.filter((j) => j.saved).length,
    featuredJobs: jobs.filter((j) => j.featured).length,
    newJobs: jobs.filter((j) => {
      const posted = new Date(j.postedDate)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - posted.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 7
    }).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-rose-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-coral-500">MotivAI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/career-planner">
                <Button variant="ghost">Plan de carrière</Button>
              </Link>
              <span className="text-coral-500 font-medium">Offres d'emploi</span>
              <Link href="/auth/login">
                <Button className="bg-coral-500 hover:bg-coral-600">Connexion</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Recherche d'emploi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les meilleures opportunités d'emploi et générez des lettres de motivation personnalisées avec
            notre IA
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-coral-500 mb-2">{stats.totalJobs}</div>
              <p className="text-gray-600 font-medium">Offres disponibles</p>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{stats.newJobs}</div>
              <p className="text-gray-600 font-medium">Nouvelles cette semaine</p>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">{stats.featuredJobs}</div>
              <p className="text-gray-600 font-medium">Offres premium</p>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">{stats.savedJobs}</div>
              <p className="text-gray-600 font-medium">Offres sauvegardées</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-white/60 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                <Input
                  placeholder="Rechercher par poste, entreprise ou compétence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 text-lg h-14 bg-white/80 border-0 shadow-lg"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="bg-white/80 border-0 shadow-md">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Localisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    <SelectItem value="Paris">Paris</SelectItem>
                    <SelectItem value="Lyon">Lyon</SelectItem>
                    <SelectItem value="Marseille">Marseille</SelectItem>
                    <SelectItem value="Toulouse">Toulouse</SelectItem>
                    <SelectItem value="Bordeaux">Bordeaux</SelectItem>
                    <SelectItem value="La Défense">La Défense</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="bg-white/80 border-0 shadow-md">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Type de contrat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
                    <SelectItem value="Stage">Stage</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Alternance">Alternance</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sectorFilter} onValueChange={setSectorFilter}>
                  <SelectTrigger className="bg-white/80 border-0 shadow-md">
                    <Building className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les secteurs</SelectItem>
                    <SelectItem value="Technologie">Technologie</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Développement">Développement</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={remoteFilter} onValueChange={setRemoteFilter}>
                  <SelectTrigger className="bg-white/80 border-0 shadow-md">
                    <Users className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Télétravail" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="remote">Télétravail possible</SelectItem>
                    <SelectItem value="onsite">Présentiel uniquement</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger className="bg-white/80 border-0 shadow-md">
                    <Star className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous niveaux</SelectItem>
                    <SelectItem value="Débutant">Débutant</SelectItem>
                    <SelectItem value="2-5 ans">2-5 ans</SelectItem>
                    <SelectItem value="3-5 ans">3-5 ans</SelectItem>
                    <SelectItem value="5+ ans">5+ ans</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="w-full bg-white/80 border-0 shadow-md">
                  <Filter className="w-4 h-4 mr-2" />
                  Plus de filtres
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="all">Toutes les offres ({filteredJobs.length})</TabsTrigger>
            <TabsTrigger value="featured">Premium ({jobs.filter((j) => j.featured).length})</TabsTrigger>
            <TabsTrigger value="saved">Sauvegardées ({jobs.filter((j) => j.saved).length})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Search className="w-16 h-16 text-gray-400 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Aucune offre trouvée</h3>
                <p className="text-gray-600 text-center text-lg">
                  Essayez de modifier vos critères de recherche pour voir plus d'offres
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="bg-white/60 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        {job.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1">
                            <Star className="w-4 h-4 mr-1" />
                            Premium
                          </Badge>
                        )}
                        {job.remote && (
                          <Badge variant="outline" className="px-3 py-1">
                            Télétravail
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Building className="w-5 h-5" />
                          <span className="font-semibold">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Euro className="w-5 h-5" />
                          <span className="font-semibold">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          <span>
                            Il y a{" "}
                            {Math.ceil(
                              (new Date().getTime() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24),
                            )}{" "}
                            jours
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-6 text-lg leading-relaxed line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                        <Badge variant="outline">{job.experience}</Badge>
                        <Badge variant="outline">{job.sector}</Badge>
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <Badge key={index} variant="secondary">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 3 && (
                          <Badge variant="secondary">+{job.requirements.length - 3} autres</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 ml-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveJob(job.id)}
                        className={`${job.saved ? "text-red-500" : "text-gray-400"} hover:scale-110 transition-transform`}
                      >
                        <Heart className={`w-6 h-6 ${job.saved ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedJob(job)} className="bg-white/80">
                          <Eye className="w-4 h-4 mr-2" />
                          Voir détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-2xl">
                            {job.title} - {job.company}
                            {job.featured && (
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </DialogTitle>
                          <DialogDescription>
                            <div className="flex items-center gap-4 text-base">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Euro className="w-4 h-4" />
                                {job.salary}
                              </span>
                              <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-8">
                          <div>
                            <h4 className="font-bold text-lg mb-3">Description du poste</h4>
                            <p className="text-gray-700 leading-relaxed">{job.description}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-3">Compétences requises</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.requirements.map((req, index) => (
                                <Badge key={index} variant="secondary">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-3">Avantages</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.benefits.map((benefit, index) => (
                                <Badge key={index} variant="outline">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <span className="font-semibold">Date limite de candidature:</span>
                              <p className="text-gray-700">
                                {new Date(job.applicationDeadline).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                            <div>
                              <span className="font-semibold">Taille de l'entreprise:</span>
                              <p className="text-gray-700">{job.companySize} employés</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Link href={`/generate-letter?jobId=${job.id}`}>
                      <Button className="bg-gradient-to-r from-coral-500 to-rose-500 hover:from-coral-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Générer lettre IA
                      </Button>
                    </Link>
                    <Button variant="outline" className="bg-white/80">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Postuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Charger plus d'offres
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
