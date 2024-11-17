import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ljxrxxanhzptitkyaara.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHJ4eGFuaHpwdGl0a3lhYXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NDY5NjEsImV4cCI6MjA0NzQyMjk2MX0.uB46RdtcxRBW21SvWrxmw-m2ap78zW9zJeOFJ0n7oEE";

export const supabase = createClient(supabaseUrl, supabaseKey);