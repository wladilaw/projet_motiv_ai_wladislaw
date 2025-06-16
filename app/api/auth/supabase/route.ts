import { createServerComponentClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"
import { cacheService, cacheKeys } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, action } = await request.json()
    const supabase = createServerComponentClient()

    if (action === "signup") {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 400 })
      }

      // Create user profile in database
      if (authData.user) {
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: authData.user.email,
          first_name: firstName,
          last_name: lastName,
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }
      }

      return NextResponse.json({
        success: true,
        user: authData.user,
        message: "Compte créé avec succès",
      })
    } else if (action === "signin") {
      // Sign in user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 400 })
      }

      // Cache user session
      if (authData.session) {
        await cacheService.setWithExpiry(
          cacheKeys.userSession(authData.session.access_token),
          {
            userId: authData.user.id,
            email: authData.user.email,
          },
          3600, // 1 hour
        )
      }

      return NextResponse.json({
        success: true,
        user: authData.user,
        session: authData.session,
        message: "Connexion réussie",
      })
    }

    return NextResponse.json({ error: "Action non valide" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 400 })
    }

    // Check cached session
    const cachedSession = await cacheService.get(cacheKeys.userSession(token))
    if (cachedSession) {
      return NextResponse.json({ user: cachedSession })
    }

    const supabase = createServerComponentClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json({ error: "Session invalide" }, { status: 401 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
