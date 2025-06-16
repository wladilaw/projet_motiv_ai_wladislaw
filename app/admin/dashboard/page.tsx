"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, FileText, Euro, TrendingUp, ActivityIcon, Settings, Bell, Search, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface DashboardStats {
  activeUsers: number
  lettersGenerated: number
  monthlyRevenue: number
  conversionRate: number
  userGrowth: number
  revenueGrowth: number
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: "Free" | "Premium" | "Pro"
  status: "Actif" | "En attente"
  registrationDate: string
  lastActivity: string
}

interface Activity {
  id: string
  user: string
  action: string
  time: string
  type: "success" | "warning" | "error"
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeUsers: 2438,
    lettersGenerated: 8754,
    monthlyRevenue: 45280,
    conversionRate: 67,
    userGrowth: 12.5,
    revenueGrowth: 28.4,
  })

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Marie Laurent",
      email: "marie.laurent@email.com",
      plan: "Premium",
      status: "Actif",
      registrationDate: "Il y a 30 min",
      lastActivity: "Il y a 2 min",
    },
    {
      id: "2",
      name: "Pierre Dubois",
      email: "p.dubois@gmail.com",
      plan: "Free",
      status: "Actif",
      registrationDate: "Il y a 25 min",
      lastActivity: "Il y a 5 min",
    },
    {
      id: "3",
      name: "Sophie Bernard",
      email: "s.bernard@outlook.fr",
      plan: "Pro",
      status: "En attente",
      registrationDate: "Il y a 3h",
      lastActivity: "Il y a 1h",
    },
  ])

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      user: "Marie Laurent",
      action: "a généré une lettre de motivation",
      time: "Il y a 2 min",
      type: "success",
    },
    {
      id: "2",
      user: "Tech Corp",
      action: "a publié 3 nouvelles offres",
      time: "Il y a 15 min",
      type: "success",
    },
    {
      id: "3",
      user: "Pic d'utilisation détecté",
      action: "142 utilisateurs en ligne",
      time: "Il y a 30 min",
      type: "warning",
    },
    {
      id: "4",
      user: "5 utilisateurs",
      action: "ont upgradé vers Premium",
      time: "Il y a 45 min",
      type: "success",
    },
    {
      id: "5",
      user: "Erreur API détectée",
      action: "corrigée",
      time: "Il y a 1h",
      type: "error",
    },
  ])

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

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">MotivAI</span>
            <Badge variant="secondary" className="text-xs">
              Admin Panel
            </Badge>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-orange-500 text-white text-sm">AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin Principal</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>

          <div className="space-y-1 px-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-orange-600 text-white"
            >
              <ActivityIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <Users className="w-5 h-5" />
              <span>Utilisateurs</span>
              <Badge variant="secondary" className="ml-auto">
                2.4k
              </Badge>
            </Link>
            <Link
              href="/admin/letters"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <FileText className="w-5 h-5" />
              <span>Lettres</span>
            </Link>
            <Link
              href="/admin/companies"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <Users className="w-5 h-5" />
              <span>Entreprises</span>
            </Link>
            <Link
              href="/admin/jobs"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <FileText className="w-5 h-5" />
              <span>Offres d'emploi</span>
            </Link>
            <Link
              href="/admin/subscriptions"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <Euro className="w-5 h-5" />
              <span>Abonnements</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/admin/messages"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <Bell className="w-5 h-5" />
              <span>Messages</span>
              <Badge variant="destructive" className="ml-auto">
                3
              </Badge>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <Settings className="w-5 h-5" />
              <span>Paramètres</span>
            </Link>
          </div>
        </nav>

        {/* System Status */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="text-xs text-gray-400">Statut système</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">CPU</span>
              <span className="text-white">42%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-orange-500 h-1 rounded-full" style={{ width: "42%" }}></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">RAM</span>
              <span className="text-white">68%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-orange-500 h-1 rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Dernière mise à jour: il y a 2 min</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Avatar>
                <AvatarFallback className="bg-orange-500 text-white">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">+{stats.userGrowth}%</span>
                    </div>
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
                    <p className="text-sm font-medium text-gray-600">Lettres générées</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.lettersGenerated.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">+124 aujourd'hui</span>
                    </div>
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
                    <p className="text-sm font-medium text-gray-600">Revenus du mois</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.monthlyRevenue.toLocaleString()} €</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">+{stats.revenueGrowth}%</span>
                      <span className="text-xs text-gray-500 ml-2">Premium 3D</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Euro className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taux de conversion</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.conversionRate}%</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">+5.2%</span>
                      <span className="text-xs text-gray-500 ml-2">Free → Premium</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Croissance des utilisateurs</CardTitle>
                <CardDescription>30 derniers jours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Graphique de croissance des utilisateurs</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenus</CardTitle>
                <CardDescription>Répartition Premium vs Pro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Graphique des revenus par plan</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Nouveaux utilisateurs</CardTitle>
                  <Button variant="outline" size="sm">
                    Voir tous
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getPlanColor(user.plan)}>{user.plan}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{user.registrationDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`}></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Utilisation IA</p>
                    <p className="text-2xl font-bold">2.4M / 5M</p>
                    <p className="text-sm text-purple-100">Requêtes utilisées</p>
                  </div>
                  <ActivityIcon className="w-8 h-8 text-purple-200" />
                </div>
                <div className="mt-4">
                  <div className="w-full bg-purple-400 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: "48%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Santé serveur</p>
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-sm text-green-100">Uptime ce mois</p>
                  </div>
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Support</p>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-blue-100">Tickets ouverts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Temps de réponse</p>
                    <p className="text-lg font-bold">~15min</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
