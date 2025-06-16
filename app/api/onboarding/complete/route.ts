import { type NextRequest, NextResponse } from "next/server"

// Simulation d'une base de données pour les profils complets
const profilesDatabase: any[] = []

export async function POST(request: NextRequest) {
  try {
    const profileData = await request.json()

    // Générer un ID unique
    const id = Date.now().toString()

    // Ajouter l'ID et les métadonnées
    const completeProfile = {
      id,
      ...profileData,
      status: "completed",
      completedAt: new Date().toISOString(),
    }

    // Sauvegarder dans la "base de données"
    profilesDatabase.push(completeProfile)

    return NextResponse.json({
      success: true,
      id,
      message: "Profil finalisé avec succès",
      profile: completeProfile,
    })
  } catch (error) {
    console.error("Erreur lors de la finalisation du profil:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de la finalisation" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      // Récupérer un profil spécifique
      const profile = profilesDatabase.find((p) => p.id === id)
      if (!profile) {
        return NextResponse.json({ success: false, message: "Profil non trouvé" }, { status: 404 })
      }
      return NextResponse.json(profile)
    } else {
      // Récupérer tous les profils
      return NextResponse.json(profilesDatabase)
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de la récupération" }, { status: 500 })
  }
}
