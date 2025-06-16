import { type NextRequest, NextResponse } from "next/server"

// Simulation d'une base de données en mémoire
const cvDatabase: any[] = []

export async function POST(request: NextRequest) {
  try {
    const cvData = await request.json()

    // Générer un ID unique
    const id = Date.now().toString()

    // Ajouter l'ID et la date de création
    const cvWithMetadata = {
      id,
      ...cvData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Sauvegarder dans la "base de données"
    cvDatabase.push(cvWithMetadata)

    return NextResponse.json({
      success: true,
      id,
      message: "CV sauvegardé avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du CV:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de la sauvegarde" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      // Récupérer un CV spécifique
      const cv = cvDatabase.find((cv) => cv.id === id)
      if (!cv) {
        return NextResponse.json({ success: false, message: "CV non trouvé" }, { status: 404 })
      }
      return NextResponse.json(cv)
    } else {
      // Récupérer tous les CVs
      return NextResponse.json(cvDatabase)
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du CV:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de la récupération" }, { status: 500 })
  }
}
