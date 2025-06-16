"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Search, Download, Eye, MoreHorizontal, TrendingUp } from "lucide-react"

interface Subscription {
  id: string
  user: string
  email: string
  plan: "Premium" | "Pro"
  status: "Actif" | "Annulé" | "Expiré"
  startDate: string
  nextBilling: string
  amount: number
  paymentMethod: string
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      user: "Marie Laurent",
      email: "marie.laurent@email.com",
      plan: "Premium",
      status: "Actif",
      startDate: "2024-01-15",
      nextBilling: "2024-02-15",
      amount: 9.99,
      paymentMethod: "Visa ****1234",
    },
    {
      id: "2",
      user: "Sophie Bernard",
      email: "s.bernard@outlook.fr",
      plan: "Pro",
      status: "Actif",
      startDate: "2024-01-08",
      nextBilling: "2024-02-08",
      amount: 19.99,
      paymentMethod: "Mastercard ****5678",
    },
    {
      id: "3",
      user: "Thomas Martin",
      email: "thomas.m@yahoo.fr",
      plan: "Premium",
      status: "Annulé",
      startDate: "2024-01-05",
      nextBilling: "-",
      amount: 9.99,
      paymentMethod: "Visa ****9012",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Annulé":
        return "bg-red-100 text-red-800"
      case "Expiré":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium":
        return "bg-coral-100 text-coral-800"
      case "Pro":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    const matchesPlan = planFilter === "all" || sub.plan === planFilter
    return matchesSearch && matchesStatus && matchesPlan
  })

  const stats = {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter((s) => s.status === "Actif").length,
    monthlyRevenue: subscriptions.filter((s) => s.status === "Actif").reduce((sum, s) => sum + s.amount, 0),
    churnRate: 15.2,
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des abonnements</h1>
            <p className="text-gray-600">Suivez et gérez tous les abonnements de la plateforme</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm" className="bg-coral-500 hover:bg-coral-600">
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
                  <p className="text-sm font-medium text-gray-600">Total abonnements</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSubscriptions}</p>
                </div>
                <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-coral-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Abonnements actifs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus mensuels</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.monthlyRevenue.toFixed(2)}€</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux de churn</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.churnRate}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
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
                  <SelectItem value="Annulé">Annulé</SelectItem>
                  <SelectItem value="Expiré">Expiré</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les plans</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Abonnements ({filteredSubscriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Montant</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Prochaine facture</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Paiement</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{subscription.user}</p>
                          <p className="text-sm text-gray-500">{subscription.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPlanColor(subscription.plan)}>{subscription.plan}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(subscription.status)}>{subscription.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium">{subscription.amount}€/mois</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{subscription.nextBilling}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{subscription.paymentMethod}</span>
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
