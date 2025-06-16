import { type NextRequest, NextResponse } from "next/server"

// Simulation d'une base de données d'utilisateurs
const users = [
  {
    id: "1",
    email: "admin@jobcraft.ai",
    password: "admin123",
    firstName: "Admin",
    lastName: "Principal",
    role: "admin",
  },
  {
    id: "2",
    email: "user@jobcraft.ai",
    password: "user123",
    firstName: "Jean",
    lastName: "Dupont",
    role: "user",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Rechercher l'utilisateur
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ success: false, message: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Générer un token simple (dans une vraie app, utilisez JWT)
    const token = `token_${user.id}_${Date.now()}`

    // Retourner les données utilisateur (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword,
      message: "Connexion réussie",
    })
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 })
  }
}
