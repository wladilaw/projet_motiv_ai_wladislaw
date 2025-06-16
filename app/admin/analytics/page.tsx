"use client"

import { RealTimeDashboard } from "@/components/real-time-dashboard"

export default function AdminAnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics avancés</h1>
            <p className="text-gray-600">Insights détaillés sur les performances de la plateforme</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        <RealTimeDashboard />
      </main>
    </div>
  )
}
