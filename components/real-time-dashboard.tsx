"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Users, FileText, TrendingUp, Download, RefreshCw } from "lucide-react"

interface RealTimeStats {
  activeUsers: number
  lettersGenerated: number
  conversions: number
  revenue: number
  timestamp: string
}

interface SystemMetrics {
  cpuUsage: number
  memoryUsage: number
  responseTime: number
  errorRate: number
}

export function RealTimeDashboard() {
  const [stats, setStats] = useState<RealTimeStats | null>(null)
  const [system, setSystem] = useState<SystemMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const fetchRealTimeData = async () => {
    try {
      const response = await fetch("/api/analytics/realtime")
      const data = await response.json()

      if (data.success) {
        setStats(data.data.stats)
        setSystem(data.data.system)
        setLastUpdate(data.data.lastUpdate)
      }
    } catch (error) {
      console.error("Erreur récupération données temps réel:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generatePDFReport = async () => {
    setIsGeneratingPDF(true)
    try {
      const response = await fetch("/api/reports/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportType: "admin",
          period: "Derniers 30 jours",
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `rapport-analytics-${Date.now()}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Erreur génération PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  useEffect(() => {
    fetchRealTimeData()

    // Mise à jour automatique toutes les 5 secondes
    const interval = setInterval(fetchRealTimeData, 5000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Temps Réel</h2>
          <p className="text-sm text-gray-500">
            Dernière mise à jour: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString("fr-FR") : "Jamais"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={fetchRealTimeData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
          <Button
            size="sm"
            className="bg-coral-500 hover:bg-coral-600"
            onClick={generatePDFReport}
            disabled={isGeneratingPDF}
          >
            <Download className={`w-4 h-4 mr-2 ${isGeneratingPDF ? "animate-spin" : ""}`} />
            {isGeneratingPDF ? "Génération..." : "Rapport PDF"}
          </Button>
        </div>
      </div>

      {/* Stats temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.activeUsers || 0}</p>
                <Badge className="mt-2 bg-green-100 text-green-800">
                  <Activity className="w-3 h-3 mr-1" />
                  En ligne
                </Badge>
              </div>
              <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-coral-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lettres générées</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.lettersGenerated || 0}</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">Dernière heure</Badge>
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
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.conversions || 0}</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Free → Premium</Badge>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus temps réel</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.revenue?.toFixed(2) || "0.00"}€</p>
                <Badge className="mt-2 bg-purple-100 text-purple-800">Dernière heure</Badge>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métriques système */}
      {system && (
        <Card>
          <CardHeader>
            <CardTitle>État du Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">CPU</p>
                <p className="text-2xl font-bold text-gray-900">{system.cpuUsage}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-coral-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${system.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Mémoire</p>
                <p className="text-2xl font-bold text-gray-900">{system.memoryUsage}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${system.memoryUsage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Temps de réponse</p>
                <p className="text-2xl font-bold text-gray-900">{system.responseTime}ms</p>
                <Badge
                  className={`mt-2 ${system.responseTime < 200 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                >
                  {system.responseTime < 200 ? "Excellent" : "Correct"}
                </Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Taux d'erreur</p>
                <p className="text-2xl font-bold text-gray-900">{system.errorRate.toFixed(1)}%</p>
                <Badge
                  className={`mt-2 ${system.errorRate < 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {system.errorRate < 1 ? "Stable" : "Attention"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
