// Remplacer tout le contenu par une version mock gratuite
export const falService = {
  // Version mock gratuite - génère des images placeholder
  async generateHeadshot(prompt: string) {
    // Utilise une API gratuite ou des placeholders
    const width = 400
    const height = 400
    const seed = Math.floor(Math.random() * 1000)

    return {
      url: `https://picsum.photos/seed/${seed}/${width}/${height}`,
      prompt,
      generated_at: new Date().toISOString(),
    }
  },

  async generateCompanyBranding(companyName: string) {
    // Génère des logos/images d'entreprise avec des services gratuits
    const seed = companyName.toLowerCase().replace(/\s+/g, "")

    return {
      url: `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&size=400&background=random&color=fff&format=png`,
      company: companyName,
      generated_at: new Date().toISOString(),
    }
  },

  // Alternative avec Unsplash (gratuit)
  async generateBusinessImage(keyword: string) {
    const unsplashUrl = `https://source.unsplash.com/800x600/?business,${encodeURIComponent(keyword)}`

    return {
      url: unsplashUrl,
      keyword,
      generated_at: new Date().toISOString(),
    }
  },
}
