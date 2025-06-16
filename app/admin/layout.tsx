"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, FileText, Euro, TrendingUp, ActivityIcon, Settings, Bell, Building, Briefcase } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: ActivityIcon, current: pathname === "/admin/dashboard" },
    { name: "Utilisateurs", href: "/admin/users", icon: Users, current: pathname === "/admin/users", badge: "2.4k" },
    { name: "Lettres", href: "/admin/letters", icon: FileText, current: pathname === "/admin/letters" },
    { name: "Entreprises", href: "/admin/companies", icon: Building, current: pathname === "/admin/companies" },
    { name: "Offres d'emploi", href: "/admin/jobs", icon: Briefcase, current: pathname === "/admin/jobs" },
    { name: "Abonnements", href: "/admin/subscriptions", icon: Euro, current: pathname === "/admin/subscriptions" },
    { name: "Analytics", href: "/admin/analytics", icon: TrendingUp, current: pathname === "/admin/analytics" },
    { name: "Messages", href: "/admin/messages", icon: Bell, current: pathname === "/admin/messages", badge: "3" },
    { name: "Paramètres", href: "/admin/settings", icon: Settings, current: pathname === "/admin/settings" },
  ]

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
              Admin
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
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.current ? "bg-orange-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge variant={item.badge === "3" ? "destructive" : "secondary"} className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
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
      <div className="ml-64">{children}</div>
    </div>
  )
}
