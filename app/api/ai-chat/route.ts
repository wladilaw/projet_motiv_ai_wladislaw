import { type NextRequest, NextResponse } from "next/server"
import { groqService } from "@/lib/groq"
import { cacheService } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const { message, userId, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message requis" }, { status: 400 })
    }

    // Generate response with Groq
    const response = await groqService.chatAdvice(message, context)

    // Cache conversation for context
    if (userId) {
      const conversationKey = `chat:${userId}:${Date.now()}`
      await cacheService.set(conversationKey, { message, response }, 3600) // 1h
    }

    return NextResponse.json({
      success: true,
      response,
      provider: "groq",
      model: "llama3-8b-8192",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat AI error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la génération de la réponse",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
