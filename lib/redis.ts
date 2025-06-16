import { Redis } from "@upstash/redis"

let redis: Redis | null = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  }
} catch (error) {
  console.warn("Redis connection failed, using fallback")
}

export const cacheKeys = {
  userProfile: (userId: string) => `user:profile:${userId}`,
  coverLetter: (letterId: string) => `letter:${letterId}`,
  companyInfo: (companyName: string) => `company:${companyName.toLowerCase().replace(/\s+/g, "-")}`,
  marketInsights: (date: string) => `market:insights:${date}`,
  jobAnalysis: (jobId: string) => `job:analysis:${jobId}`,
}

export const cacheService = {
  async get(key: string) {
    try {
      if (!redis) return null
      return await redis.get(key)
    } catch (error) {
      console.error("Cache get error:", error)
      return null
    }
  },

  async set(key: string, value: any, ttl?: number) {
    try {
      if (!redis) return null
      if (ttl) {
        return await redis.setex(key, ttl, JSON.stringify(value))
      }
      return await redis.set(key, JSON.stringify(value))
    } catch (error) {
      console.error("Cache set error:", error)
      return null
    }
  },

  async incr(key: string) {
    try {
      if (!redis) return null
      return await redis.incr(key)
    } catch (error) {
      console.error("Cache incr error:", error)
      return null
    }
  },

  async del(key: string) {
    try {
      if (!redis) return null
      return await redis.del(key)
    } catch (error) {
      console.error("Cache del error:", error)
      return null
    }
  },

  async publish(channel: string, message: string) {
    try {
      if (!redis) return null
      return await redis.publish(channel, message)
    } catch (error) {
      console.error("Cache publish error:", error)
      return null
    }
  }
}