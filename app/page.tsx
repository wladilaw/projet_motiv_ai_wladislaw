import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  FileText,
  CheckCircle,
  Star,
  Play,
  Brain,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Network,
  Target,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-60 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full opacity-60 blur-2xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-rose-500 rounded-lg flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-coral-500">MotivAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Fonctionnalités
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Tarifs
              </Link>
              <Link href="/market-insights" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Insights
              </Link>
              <Link href="/testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Témoignages
              </Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Connexion
              </Link>
              <Link href="/auth/register">
                <Button className="bg-coral-500 hover:bg-coral-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Commencer gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Révolutionnez <br />
                  votre <span className="text-coral-500">carrière</span>
                  <br />
                  avec l'IA
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  MotivAI combine intelligence artificielle et expertise RH pour vous offrir un accompagnement
                  personnalisé : lettres de motivation, préparation d'entretiens, analyse de marché et coaching
                  carrière.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Essayer gratuitement
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Voir la démo
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-700 font-semibold ml-2">4.9/5</span>
                  <span className="text-gray-500">(2,847 avis)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 font-semibold">+50K utilisateurs</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                {/* Interface mockup recreated */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto">
                  {/* Browser header */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-coral-500 to-rose-500 h-3 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Content lines */}
                  <div className="space-y-3 mb-6">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Colored blocks */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="h-16 bg-blue-200 rounded-lg"></div>
                    <div className="h-16 bg-green-200 rounded-lg"></div>
                    <div className="h-16 bg-purple-200 rounded-lg"></div>
                  </div>

                  {/* Success notification */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-700">Lettre générée !</span>
                    </div>
                  </div>

                  {/* Coach IA badge */}
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold text-blue-700">Coach IA actif</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-coral-500/20 to-blue-500/20 rounded-2xl blur-3xl transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-semibold">
              Pourquoi choisir MotivAI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Une solution complète pour votre réussite professionnelle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment notre intelligence artificielle transforme votre approche de la recherche d'emploi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Coach IA Personnel */}
            <Link href="/coach" className="group">
              <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Coach IA Personnel</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                    Un mentor IA disponible 24/7 qui analyse votre profil et vous guide vers vos objectifs de carrière
                    avec des conseils personnalisés.
                  </CardDescription>
                  <div className="text-coral-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Découvrir →
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Préparation Entretiens */}
            <Link href="/interview-prep" className="group">
              <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Préparation Entretiens</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                    Entraînez-vous avec des simulations d'entretiens réalistes. L'IA analyse vos réponses et vous donne
                    des feedbacks précis.
                  </CardDescription>
                  <div className="text-coral-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    S'entraîner →
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Analyseur de Salaire */}
            <Link href="/salary-analyzer" className="group">
              <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Analyseur de Salaire</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                    Découvrez votre valeur sur le marché avec une analyse en temps réel basée sur des millions de
                    données salariales.
                  </CardDescription>
                  <div className="text-coral-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Analyser →
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Planificateur de Carrière */}
            <Link href="/career-planner" className="group">
              <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Planificateur de Carrière</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                    Visualisez votre évolution professionnelle avec un plan personnalisé et des étapes concrètes pour
                    atteindre vos objectifs.
                  </CardDescription>
                  <div className="text-coral-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Planifier →
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Networking IA */}
            <Link href="/networking" className="group">
              <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Networking IA</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                    Développez votre réseau professionnel avec des recommandations intelligentes et des messages
                    personnalisés générés par l'IA.
                  </CardDescription>
                  <div className="text-coral-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Networker →
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Insights Marché */}
            <Link href="/market-insights" className="group">
              <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Insights Marché</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                    Restez informé des tendances du marché de l'emploi avec des analyses en temps réel et des
                    prédictions basées sur l'IA.
                  </CardDescription>
                  <div className="text-coral-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Explorer →
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 group cursor-pointer">
              <div className="text-4xl font-bold text-coral-500 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Utilisateurs actifs</div>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="text-4xl font-bold text-blue-500 group-hover:scale-110 transition-transform duration-300">
                200K+
              </div>
              <div className="text-gray-600 font-medium">Lettres générées</div>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="text-4xl font-bold text-green-500 group-hover:scale-110 transition-transform duration-300">
                85%
              </div>
              <div className="text-gray-600 font-medium">Taux de réponse</div>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="text-4xl font-bold text-purple-500 group-hover:scale-110 transition-transform duration-300">
                4.9/5
              </div>
              <div className="text-gray-600 font-medium">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Integrations Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-semibold">
              Intégrations IA
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Alimenté par les meilleures IA du marché
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MotivAI s'appuie sur un écosystème d'intelligences artificielles de pointe pour vous offrir la meilleure
              expérience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">GPT</span>
                </div>
                <h3 className="text-lg font-bold mb-2">OpenAI GPT-4</h3>
                <p className="text-gray-600 text-sm">Génération de lettres de motivation ultra-personnalisées</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">CL</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Claude AI</h3>
                <p className="text-gray-600 text-sm">Analyse approfondie des offres d'emploi et matching intelligent</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">GR</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Grok AI</h3>
                <p className="text-gray-600 text-sm">Insights marché en temps réel et prédictions sectorielles</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">FL</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Fal AI</h3>
                <p className="text-gray-600 text-sm">Génération d'images pour CV et portfolios professionnels</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/docs">
              <Button className="bg-gradient-to-r from-coral-500 to-rose-500 hover:from-coral-600 hover:to-rose-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <FileText className="w-5 h-5 mr-2" />
                Consulter la documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-coral-500 to-rose-500 rounded-3xl p-12 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Prêt à transformer vos candidatures ?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'étudiants et professionnels qui ont déjà trouvé leur emploi idéal grâce à MotivAI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-white text-coral-500 hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Créer mon compte gratuit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-4 text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                >
                  Découvrir les opportunités
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">MotivAI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                L'intelligence artificielle au service de votre réussite professionnelle
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Produit</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/auth/register" className="hover:text-white transition-colors">
                    Créer un compte
                  </Link>
                </li>
                <li>
                  <Link href="/career-planner" className="hover:text-white transition-colors">
                    Plan de carrière
                  </Link>
                </li>
                <li>
                  <Link href="/coach" className="hover:text-white transition-colors">
                    Coach IA
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-white transition-colors">
                    Recherche d'emploi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Ressources</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/examples" className="hover:text-white transition-colors">
                    Exemples
                  </Link>
                </li>
                <li>
                  <Link href="/market-insights" className="hover:text-white transition-colors">
                    Insights Marché
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Légal</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MotivAI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
