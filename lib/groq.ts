import Groq from "groq-sdk"

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export const groqService = {
  // Génération de feedback intelligent sur lettre
  async generateLetterFeedback(letterContent: string, jobDetails: any, userProfile: any) {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Tu es un expert RH et coach en rédaction. Tu analyses les lettres de motivation et fournis des feedbacks constructifs et précis pour les améliorer.`,
        },
        {
          role: "user",
          content: `
Analyse cette lettre de motivation et fournis un feedback détaillé :

LETTRE:
${letterContent}

POSTE:
${JSON.stringify(jobDetails)}

PROFIL CANDIDAT:
${JSON.stringify(userProfile)}

Fournis le feedback au format JSON :
{
  "overallScore": "score global sur 100",
  "strengths": [
    {
      "aspect": "point fort identifié",
      "explanation": "pourquoi c'est bien",
      "impact": "impact sur le recruteur"
    }
  ],
  "improvements": [
    {
      "aspect": "point à améliorer",
      "issue": "problème identifié",
      "suggestion": "suggestion concrète",
      "priority": "low/medium/high/critical",
      "example": "exemple d'amélioration"
    }
  ],
  "structure": {
    "score": "score structure sur 100",
    "feedback": "feedback sur la structure"
  },
  "tone": {
    "score": "score ton sur 100",
    "feedback": "feedback sur le ton"
  },
  "personalization": {
    "score": "score personnalisation sur 100",
    "feedback": "feedback sur la personnalisation"
  },
  "keywords": {
    "present": ["mots-clés présents"],
    "missing": ["mots-clés manquants importants"],
    "suggestions": ["mots-clés à ajouter"]
  },
  "actionableSteps": [
    {
      "step": "étape d'amélioration",
      "description": "description détaillée",
      "timeNeeded": "temps estimé"
    }
  ],
  "predictedSuccess": {
    "responseRate": "taux de réponse estimé en %",
    "factors": ["facteurs influençant le succès"]
  }
}

Sois constructif, précis et actionnable dans tes conseils.
`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.4,
      max_tokens: 1500,
    })

    try {
      return JSON.parse(completion.choices[0]?.message?.content || "{}")
    } catch {
      return {}
    }
  },

  // Amélioration automatique de lettre
  async improveLetter(letterContent: string, feedback: any, improvements: string[]) {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Tu es un expert en rédaction qui améliore les lettres de motivation selon les feedbacks donnés.`,
        },
        {
          role: "user",
          content: `
Améliore cette lettre selon les feedbacks :

LETTRE ORIGINALE:
${letterContent}

FEEDBACK:
${JSON.stringify(feedback)}

AMÉLIORATIONS DEMANDÉES:
${improvements.join(", ")}

Génère une version améliorée qui :
1. Corrige les points faibles identifiés
2. Renforce les points forts
3. Améliore la structure et le ton
4. Ajoute les mots-clés manquants
5. Garde l'authenticité et la personnalisation

Fournis uniquement la lettre améliorée, sans formatage markdown.
`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.6,
      max_tokens: 1000,
    })

    return completion.choices[0]?.message?.content || letterContent
  },

  // Génération de suggestions contextuelles
  async generateContextualSuggestions(letterContent: string, cursorPosition: number) {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Tu es un assistant d'écriture intelligent qui suggère des améliorations contextuelles en temps réel.`,
        },
        {
          role: "user",
          content: `
Analyse ce passage de lettre et suggère des améliorations :

TEXTE:
${letterContent}

POSITION CURSEUR: ${cursorPosition}

Fournis 3-5 suggestions courtes et pertinentes pour améliorer le passage autour du curseur.
Format: array de strings simples.
`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 300,
    })

    try {
      return JSON.parse(completion.choices[0]?.message?.content || "[]")
    } catch {
      return []
    }
  },
}
