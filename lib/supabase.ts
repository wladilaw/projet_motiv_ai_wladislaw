import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client-side Supabase client
export const createClientComponentClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server-side Supabase client
export const createServerComponentClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Database types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface CoverLetter {
  id: string
  user_id: string
  job_title: string
  company_name: string
  job_description: string
  generated_content: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  skills: string[]
  experience: any[]
  education: any[]
  summary: string
  created_at: string
  updated_at: string
}
