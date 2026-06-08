import { useEffect, useState } from "react";
import { fetchBuilder } from "../../services/fetchBuilder";
import { Loader2 } from "lucide-react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function authUser(){
      try {
        const result = await fetchBuilder("POST", "/auth");
        setUser(result);
      }
      catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    } 
    authUser();
  }, []);

  if (loading) return <Loader2 className="animate-spin" />;

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
