import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ljxrxxanhzptitkyaara.supabase.co";
const supabaseKey = "YOUR_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);