import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_API_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Restore the session from local storage
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    localStorage.setItem("supabase.auth.token", JSON.stringify(session));
  } else if (event === "SIGNED_OUT") {
    localStorage.removeItem("supabase.auth.token");
  }
});

// Load the stored session if it exists
const storedSession = localStorage.getItem("supabase.auth.token");
if (storedSession) {
  const parsedSession = JSON.parse(storedSession);
  supabase.auth.setSession({
    access_token: parsedSession.access_token,
    refresh_token: parsedSession.refresh_token,
  });
}

export default supabase;
