import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "@/client/supabase"; // import your supabase instance

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (data) {
          setUser(data);
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
