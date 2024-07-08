import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabaseUrl = import.meta.env.VITE_API_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    localStorage.setItem("supabase.auth.token", JSON.stringify(session));
    if (session) {
      const user = session.user;
      await saveUserToDatabase(user, session.access_token);
    }
  } else if (event === "SIGNED_OUT") {
    localStorage.removeItem("supabase.auth.token");
  }
});

const storedSession = localStorage.getItem("supabase.auth.token");
if (storedSession) {
  const parsedSession = JSON.parse(storedSession);
  supabase.auth.setSession({
    access_token: parsedSession.access_token,
    refresh_token: parsedSession.refresh_token,
  });
}

const saveUserToDatabase = async (user, accessToken) => {
  const { id: user_id, email, user_metadata } = user;
  const full_name =
    user_metadata.full_name || user_metadata.name || "Anonymous";

  let role = "guest";

  if (email.endsWith("@student.up45.ac.id")) {
    role = "mahasiswa";
  } else if (email.endsWith("@up45.ac.id")) {
    role = "dosen";
  }

  try {
    // Periksa apakah pengguna sudah ada di tabel 'users'
    const { data: existingUser } = await axios.get(
      `${supabaseUrl}/rest/v1/users?user_id=eq.${user_id}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (existingUser.length === 0) {
      // Jika pengguna tidak ada, tambahkan ke tabel 'users'
      const { data } = await axios.post(
        `${supabaseUrl}/rest/v1/users`,
        { user_id, email, full_name, role },
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );
      console.log("User saved to database:", data);
    } else {
      console.log("User already exists in database.");
    }
  } catch (error) {
    console.error(
      "Error saving user to database:",
      error.response?.data || error.message
    );
  }
};

export default supabase;
