import { type NextRequest, NextResponse } from "next/server"

// Simulation d'une base de données d'utilisateurs
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Un compte avec cet email existe déjà" }, { status: 400 })
    }

    // Créer un nouvel utilisateur
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password, // Dans une vraie app, hasher le mot de passe
      role: "user",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Retourner les données utilisateur (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: "Compte créé avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 })
  }
}
