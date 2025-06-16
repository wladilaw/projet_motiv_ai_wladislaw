"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Search, Reply, Archive, Trash2, Clock } from "lucide-react"

interface Message {
  id: string
  user: string
  email: string
  subject: string
  message: string
  status: "Nouveau" | "En cours" | "Résolu" | "Fermé"
  priority: "Faible" | "Normale" | "Élevée" | "Urgente"
  createdAt: string
  category: "Support" | "Bug" | "Fonctionnalité" | "Facturation"
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "Marie Laurent",
      email: "marie.laurent@email.com",
      subject: "Problème de génération de lettre",
      message: "Bonjour, j'ai un problème avec la génération de ma lettre de motivation...",
      status: "Nouveau",
      priority: "Élevée",
      createdAt: "2024-01-16 14:30",
      category: "Bug",
    },
    {
      id: "2",
      user: "Pierre Dubois",
      email: "p.dubois@gmail.com",
      subject: "Question sur l'abonnement Premium",
      message: "Je souhaiterais savoir quelles sont les fonctionnalités incluses...",
      status: "En cours",
      priority: "Normale",
      createdAt: "2024-01-16 10:15",
      category: "Support",
    },
    {
      id: "3",
      user: "Sophie Bernard",
      email: "s.bernard@outlook.fr",
      subject: "Demande de remboursement",
      message: "Je souhaite annuler mon abonnement et demander un remboursement...",
      status: "Nouveau",
      priority: "Urgente",
      createdAt: "2024-01-15 16:45",
      category: "Facturation",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nouveau":
        return "bg-coral-100 text-coral-800"
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "Résolu":
        return "bg-green-100 text-green-800"
      case "Fermé":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Faible":
        return "bg-gray-100 text-gray-800"
      case "Normale":
        return "bg-blue-100 text-blue-800"
      case "Élevée":
        return "bg-yellow-100 text-yellow-800"
      case "Urgente":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    totalMessages: messages.length,
    newMessages: messages.filter((m) => m.status === "Nouveau").length,
    inProgress: messages.filter((m) => m.status === "En cours").length,
    avgResponseTime: "2h 15min",
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des messages</h1>
            <p className="text-gray-600">Support client et gestion des tickets</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Archiver
            </Button>
            <Button size="sm" className="bg-coral-500 hover:bg-coral-600">
              <Reply className="w-4 h-4 mr-2" />
              Répondre
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
                  <p className="text-sm font-medium text-gray-600">Total messages</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalMessages}</p>
                </div>
                <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-coral-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Nouveaux messages</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.newMessages}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps de réponse</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgResponseTime}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
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
                    placeholder="Rechercher par nom, email ou sujet..."
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
                  <SelectItem value="Nouveau">Nouveau</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Résolu">Résolu</SelectItem>
                  <SelectItem value="Fermé">Fermé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les priorités</SelectItem>
                  <SelectItem value="Faible">Faible</SelectItem>
                  <SelectItem value="Normale">Normale</SelectItem>
                  <SelectItem value="Élevée">Élevée</SelectItem>
                  <SelectItem value="Urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Messages Table */}
        <Card>
          <CardHeader>
            <CardTitle>Messages support ({filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Sujet</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Priorité</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Catégorie</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{message.user}</p>
                          <p className="text-sm text-gray-500">{message.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{message.subject}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{message.message}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{message.category}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{message.createdAt}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Reply className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
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
