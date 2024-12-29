import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkSession } from "../sessionUtils";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const loggedInUser = await checkSession();
      setUser(loggedInUser);
      setLoading(false);
    };
    verifySession();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return user ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
