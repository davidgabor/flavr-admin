import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ljxrxxanhzptitkyaara.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHJ4eGFuaHpwdGl0a3lhYXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NTQ0MDAsImV4cCI6MjAyMzQzMDQwMH0.SYZxnJwSQXnxN5GTmWKsrZrVJeqE3nzPvUAMXVjxQEY";

export const supabase = createClient(supabaseUrl, supabaseKey);