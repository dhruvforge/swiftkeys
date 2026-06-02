import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Returns null when credentials are not configured — auth features are silently disabled
export const supabase =
  supabaseUrl && supabaseAnonKey && !supabaseUrl.startsWith('your_')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
