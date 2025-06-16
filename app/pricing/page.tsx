"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "/mois",
      description: "Parfait pour commencer",
      features: [
        "3 lettres de motivation/mois",
        "Feedback IA basique",
        "Export texte",
        "Analyse CV simple",
        "Support communautaire",
      ],
      buttonText: "Commencer gratuitement",
      buttonVariant: "outline" as const,
      popular: false,
      icon: <Star className="h-6 w-6" />,
    },
    {
      name: "Premium",
      price: "9€",
      period: "/mois",
      description: "Pour les chercheurs d'emploi actifs",
      features: [
        "25 lettres de motivation/mois",
        "Feedback IA avancé en temps réel",
        "Export PDF professionnel",
        "Suivi des candidatures",
        "Analytics détaillés",
        "Recherche entreprise automatique",
        "Templates premium",
        "Support prioritaire",
      ],
      buttonText: "Choisir Premium",
      buttonVariant: "default" as const,
      popular: true,
      icon: <Zap className="h-6 w-6" />,
    },
    {
      name: "Pro",
      price: "19€",
      period: "/mois",
      description: "Pour les professionnels exigeants",
      features: [
        "Lettres illimitées",
        "IA feedback expert",
        "Analytics prédictifs avancés",
        "API access",
        "Intégrations tierces",
        "Coach carrière IA",
        "Rapports personnalisés",
        "Support dédié 24/7",
        "Accès bêta nouvelles fonctionnalités",
      ],
      buttonText: "Choisir Pro",
      buttonVariant: "default" as const,
      popular: false,
      icon: <Crown className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 to-coral-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-coral-500 hover:bg-coral-600 text-white">Tarifs transparents</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Choisissez votre plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accélérez votre recherche d'emploi avec notre IA avancée. Commencez gratuitement, évoluez selon vos besoins.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-coral-500 shadow-2xl shadow-coral-500/20 ring-2 ring-coral-500"
                  : "border-gray-200 hover:border-coral-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-1">⭐ Plus populaire</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div
                  className={`mx-auto mb-4 p-3 rounded-full ${
                    plan.popular ? "bg-coral-500 text-white" : "bg-coral-100 text-coral-600"
                  }`}
                >
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-coral-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-6 text-lg font-semibold ${
                    plan.buttonVariant === "default"
                      ? "bg-coral-500 hover:bg-coral-600 text-white"
                      : "border-coral-500 text-coral-600 hover:bg-coral-50"
                  }`}
                  variant={plan.buttonVariant}
                  asChild
                >
                  <Link href="/auth/register">{plan.buttonText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Questions fréquentes</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-coral-200 hover:border-coral-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-coral-600">Puis-je changer de plan à tout moment ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet
                  immédiatement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-coral-200 hover:border-coral-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-coral-600">Y a-t-il une période d'essai ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Le plan gratuit vous permet de tester nos fonctionnalités. Aucune carte de crédit requise pour
                  commencer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-coral-200 hover:border-coral-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-coral-600">Comment fonctionne le support ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Support communautaire pour le plan gratuit, prioritaire pour Premium, et dédié 24/7 pour Pro.
                </p>
              </CardContent>
            </Card>

            <Card className="border-coral-200 hover:border-coral-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-coral-600">Puis-je annuler à tout moment ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Oui, aucun engagement. Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de
                  bord.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-coral-500 to-coral-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold mb-4">Prêt à transformer votre recherche d'emploi ?</h3>
              <p className="text-coral-100 mb-8 text-lg">
                Rejoignez des milliers de candidats qui ont déjà trouvé leur emploi de rêve
              </p>
              <Button
                size="lg"
                className="bg-white text-coral-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/auth/register">Commencer maintenant →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
