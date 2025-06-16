import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Building, GraduationCap } from "lucide-react"

const examples = [
  {
    id: 1,
    jobTitle: "Développeur Frontend Junior",
    company: "TechCorp",
    industry: "Technologie",
    level: "Junior",
    content: `Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste de Développeur Frontend Junior au sein de votre entreprise TechCorp. Actuellement étudiant en Master Informatique à l'Université Paris-Saclay, je suis passionné par le développement web et particulièrement attiré par les technologies modernes que votre entreprise utilise.

Lors de mon stage de 3 mois chez TechStart, j'ai eu l'opportunité de développer une application web complète en React, ce qui m'a permis de maîtriser les concepts avancés de cette bibliothèque ainsi que l'écosystème JavaScript moderne. Cette expérience m'a également appris l'importance du travail en équipe et de la communication dans un environnement de développement agile.

Mes compétences en JavaScript, TypeScript, React et Node.js, combinées à ma capacité d'adaptation et mon désir d'apprendre, me permettront de contribuer efficacement à vos projets. Je suis particulièrement intéressé par votre approche innovante du développement frontend et votre engagement envers les meilleures pratiques de l'industrie.

Je serais ravi de pouvoir discuter de ma candidature lors d'un entretien et vous démontrer ma motivation à rejoindre votre équipe.

Cordialement,
Jean Dupont`,
  },
  {
    id: 2,
    jobTitle: "Stage Marketing Digital",
    company: "StartupXYZ",
    industry: "Marketing",
    level: "Stage",
    content: `Madame, Monsieur,

Actuellement étudiant en Master Marketing Digital, je souhaite vous proposer ma candidature pour un stage au sein de StartupXYZ. Votre approche innovante du marketing digital et votre croissance impressionnante dans le secteur m'inspirent particulièrement.

Au cours de mes études, j'ai développé une solide compréhension des stratégies de marketing digital, incluant le SEO, les réseaux sociaux, et l'analyse de données. Mon projet de fin d'études sur l'optimisation des campagnes publicitaires digitales m'a permis d'approfondir mes connaissances pratiques et d'obtenir des résultats concrets avec une augmentation de 35% du taux de conversion.

Mes compétences en analyse de données, ma créativité et ma capacité à travailler dans un environnement dynamique font de moi un candidat idéal pour contribuer à vos campagnes marketing. Je suis particulièrement attiré par votre utilisation innovante des nouvelles technologies pour créer des expériences client uniques.

Un stage au sein de votre équipe représenterait une opportunité exceptionnelle d'appliquer mes connaissances théoriques dans un contexte professionnel stimulant et d'apporter ma contribution à vos projets ambitieux.

Dans l'attente de votre retour, je vous prie d'agréer mes salutations distinguées.

Marie Martin`,
  },
  {
    id: 3,
    jobTitle: "Ingénieur Data Junior",
    company: "DataFlow",
    industry: "Data Science",
    level: "Junior",
    content: `Madame, Monsieur,

Je vous écris pour exprimer mon vif intérêt pour le poste d'Ingénieur Data Junior chez DataFlow. Diplômé d'un Master en Science des Données, je suis passionné par l'analyse de données et l'intelligence artificielle, domaines dans lesquels votre entreprise excelle.

Durant mes études, j'ai acquis une expertise solide en Python, SQL, et dans l'utilisation de frameworks comme TensorFlow et Scikit-learn. Mon projet de fin d'études, qui consistait à développer un modèle de prédiction pour l'optimisation des stocks d'une entreprise e-commerce, m'a permis d'obtenir une précision de 92% et de réduire les coûts de stockage de 15%.

Mes compétences techniques, combinées à ma capacité d'analyse et ma rigueur scientifique, me permettront de contribuer efficacement à vos projets de data science. Je suis particulièrement attiré par votre approche éthique de l'IA et votre engagement envers l'innovation responsable.

Je serais honoré de pouvoir contribuer à vos projets innovants et d'apporter ma passion pour les données au service de votre équipe.

Cordialement,
Alexandre Dubois`,
  },
]

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Exemples de lettres</span>
            </div>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exemples de lettres de motivation</h1>
          <p className="text-gray-600">
            Découvrez des exemples de lettres générées par notre IA pour différents secteurs et niveaux
          </p>
        </div>

        <div className="space-y-8">
          {examples.map((example) => (
            <Card key={example.id} className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-600" />
                      {example.jobTitle}
                    </CardTitle>
                    <CardDescription className="text-lg">{example.company}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{example.industry}</Badge>
                    <Badge variant={example.level === "Stage" ? "outline" : "default"}>{example.level}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">
                    {example.content}
                  </pre>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 inline mr-1" />
                    Générée par MotivAI
                  </p>
                  <Link href="/cv-form">
                    <Button variant="outline">Créer ma lettre similaire</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à créer votre lettre personnalisée ?</h3>
              <p className="text-gray-600 mb-6">
                Notre IA génère des lettres uniques adaptées à votre profil et à chaque offre d'emploi
              </p>
              <Link href="/cv-form">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Commencer maintenant
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
