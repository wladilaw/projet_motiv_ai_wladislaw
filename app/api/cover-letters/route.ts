import { type NextRequest, NextResponse } from "next/server"

// Simulation d'une base de données pour les lettres de motivation
let coverLettersDatabase: any[] = [
  {
    id: "1",
    jobTitle: "Développeur Frontend Junior",
    company: "TechCorp",
    content:
      "Madame, Monsieur,\n\nJe me permets de vous adresser ma candidature pour le poste de Développeur Frontend Junior au sein de votre entreprise TechCorp...",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    jobTitle: "Stage Marketing Digital",
    company: "StartupXYZ",
    content:
      "Madame, Monsieur,\n\nActuellement étudiant en Master Marketing Digital, je souhaite vous proposer ma candidature pour un stage au sein de StartupXYZ...",
    createdAt: "2024-01-10T14:20:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    // Trier par date de création (plus récent en premier)
    const sortedLetters = coverLettersDatabase.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    return NextResponse.json(sortedLetters)
  } catch (error) {
    console.error("Erreur lors de la récupération des lettres:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de la récupération" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, message: "ID requis" }, { status: 400 })
    }

    const initialLength = coverLettersDatabase.length
    coverLettersDatabase = coverLettersDatabase.filter((letter) => letter.id !== id)

    if (coverLettersDatabase.length === initialLength) {
      return NextResponse.json({ success: false, message: "Lettre non trouvée" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Lettre supprimée" })
  } catch (error) {
    console.error("Erreur lors de la suppression:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de la suppression" }, { status: 500 })
  }
}
