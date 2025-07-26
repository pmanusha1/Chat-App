import { useContext, useEffect, useMemo } from "react";
import { StoreContext } from "../store";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [token, setToken] = useContext(StoreContext);
  const navigate = useNavigate();

  const user = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch {
      return null;
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        setToken(null);
        navigate("/login");
      }
    } catch (err) {
      console.error("Invalid token");
      setToken(null);
      navigate("/login");
    }
  }, [token, setToken, navigate]);

  return { user, token };
};
