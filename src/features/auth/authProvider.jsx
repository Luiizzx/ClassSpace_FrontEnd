import { useEffect, useState } from "react";
import { fetchBuilder } from "../../services/fetchBuilder";
import { Loader2 } from "lucide-react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function authUser(){
      setLoading(true);

      const result = await fetchBuilder("GET", "/auth");

      if (result.ok){
        const data = await result.json();

        setUser(data);
      }

      setLoading(false);
    } 
    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
