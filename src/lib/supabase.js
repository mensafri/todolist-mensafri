import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.PUBLIC_ANON_KEY,
);
