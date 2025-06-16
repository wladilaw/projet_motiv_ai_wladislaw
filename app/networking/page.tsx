"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Network, ArrowLeft, MessageCircle, UserPlus, Linkedin } from "lucide-react"
import Link from "next/link"

export default function NetworkingPage() {
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: "Marie Dubois",
      title: "Directrice RH chez TechCorp",
      company: "TechCorp",
      mutualConnections: 12,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "suggested",
    },
    {
      id: 2,
      name: "Pierre Martin",
      title: "Lead Developer",
      company: "StartupXYZ",
      mutualConnections: 8,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "connected",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      title: "Product Manager",
      company: "InnovateCorp",
      mutualConnections: 15,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "suggested",
    },
  ])

  const handleConnect = (id) => {
    setConnections((prev) => prev.map((conn) => (conn.id === id ? { ...conn, status: "pending" } : conn)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
              <Network className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Networking IA</h1>
              <p className="text-xl text-gray-600">Développez votre réseau professionnel intelligemment</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Suggestions de connexions
                </CardTitle>
                <CardDescription>L'IA a analysé votre profil et recommande ces professionnels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connections
                    .filter((conn) => conn.status === "suggested")
                    .map((person) => (
                      <div
                        key={person.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900">{person.name}</h3>
                            <p className="text-gray-600">{person.title}</p>
                            <p className="text-sm text-gray-500">{person.mutualConnections} connexions communes</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleConnect(person.id)}>
                            <UserPlus className="w-4 h-4 mr-1" />
                            Se connecter
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Messages générés par l'IA
                </CardTitle>
                <CardDescription>Messages personnalisés pour vos nouvelles connexions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Pour Marie Dubois</h4>
                    <p className="text-gray-700 mb-3">
                      "Bonjour Marie, j'ai remarqué votre expertise en transformation digitale RH chez TechCorp. Votre
                      approche innovante m'intéresse beaucoup. J'aimerais échanger sur les tendances du secteur."
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                        Envoyer
                      </Button>
                      <Button variant="outline" size="sm">
                        Personnaliser
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Pour Sophie Laurent</h4>
                    <p className="text-gray-700 mb-3">
                      "Salut Sophie, votre parcours en Product Management chez InnovateCorp est impressionnant.
                      J'aimerais discuter des défis du développement produit dans la tech."
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                        Envoyer
                      </Button>
                      <Button variant="outline" size="sm">
                        Personnaliser
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Votre réseau</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">247</div>
                    <p className="text-gray-600">Connexions</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-gray-900">12</div>
                      <p className="text-sm text-gray-600">Cette semaine</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">89%</div>
                      <p className="text-sm text-gray-600">Taux d'acceptation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Secteurs ciblés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mr-2">
                    Technologie
                  </Badge>
                  <Badge variant="secondary" className="mr-2">
                    Startup
                  </Badge>
                  <Badge variant="secondary" className="mr-2">
                    IA/ML
                  </Badge>
                  <Badge variant="secondary" className="mr-2">
                    Product
                  </Badge>
                  <Badge variant="secondary" className="mr-2">
                    RH
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conseils IA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-800">Optimisez votre profil</p>
                  <p className="text-sm text-yellow-700">Ajoutez 3 compétences pour augmenter vos suggestions de 40%</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800">Moment optimal</p>
                  <p className="text-sm text-blue-700">
                    Envoyez vos invitations mardi-jeudi entre 10h-16h pour +25% d'acceptation
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Intégrations</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Linkedin className="w-4 h-4 mr-2" />
                  Connecter LinkedIn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
