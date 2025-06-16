"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Download, MoreHorizontal, Mail } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  plan: "Free" | "Premium" | "Pro"
  status: "Actif" | "Inactif" | "Suspendu"
  registrationDate: string
  lastActivity: string
  lettersGenerated: number
  revenue: number
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Marie Laurent",
      email: "marie.laurent@email.com",
      plan: "Premium",
      status: "Actif",
      registrationDate: "2024-01-15",
      lastActivity: "Il y a 2 min",
      lettersGenerated: 24,
      revenue: 29.99,
    },
    {
      id: "2",
      name: "Pierre Dubois",
      email: "p.dubois@gmail.com",
      plan: "Free",
      status: "Actif",
      registrationDate: "2024-01-10",
      lastActivity: "Il y a 5 min",
      lettersGenerated: 3,
      revenue: 0,
    },
    {
      id: "3",
      name: "Sophie Bernard",
      email: "s.bernard@outlook.fr",
      plan: "Pro",
      status: "Actif",
      registrationDate: "2024-01-08",
      lastActivity: "Il y a 1h",
      lettersGenerated: 45,
      revenue: 49.99,
    },
    {
      id: "4",
      name: "Thomas Martin",
      email: "thomas.m@yahoo.fr",
      plan: "Premium",
      status: "Inactif",
      registrationDate: "2024-01-05",
      lastActivity: "Il y a 3 jours",
      lettersGenerated: 12,
      revenue: 29.99,
    },
    {
      id: "5",
      name: "Julie Moreau",
      email: "julie.moreau@hotmail.com",
      plan: "Free",
      status: "Suspendu",
      registrationDate: "2024-01-03",
      lastActivity: "Il y a 1 semaine",
      lettersGenerated: 8,
      revenue: 0,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Free":
        return "bg-gray-100 text-gray-800"
      case "Premium":
        return "bg-blue-100 text-blue-800"
      case "Pro":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Inactif":
        return "bg-yellow-100 text-yellow-800"
      case "Suspendu":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesPlan = planFilter === "all" || user.plan === planFilter
    return matchesSearch && matchesStatus && matchesPlan
  })

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "Actif").length,
    premiumUsers: users.filter((u) => u.plan !== "Free").length,
    totalRevenue: users.reduce((sum, u) => sum + u.revenue, 0),
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
            <p className="text-gray-600">Gérez et surveillez tous les utilisateurs de la plateforme</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm">
              <Users className="w-4 h-4 mr-2" />
              Ajouter utilisateur
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
                  <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilisateurs Premium</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.premiumUsers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toFixed(2)}€</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
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
                    placeholder="Rechercher par nom ou email..."
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
                  <SelectItem value="Suspendu">Suspendu</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les plans</SelectItem>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Lettres</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Revenus</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Dernière activité</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="text-sm">{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPlanColor(user.plan)}>{user.plan}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium">{user.lettersGenerated}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium">{user.revenue.toFixed(2)}€</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{user.lastActivity}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
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
