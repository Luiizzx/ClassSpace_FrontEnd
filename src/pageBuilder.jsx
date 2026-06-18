import { Header } from "./components/structure/header";
import { Button } from "./components/buttons/button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BookPlusIcon, House, Loader2} from "lucide-react";
import { useAuth } from "./features/auth/AuthContext";
import { Sidebar } from "./components/structure/sideBar";
import { useEffect, useState } from "react";
import { fetchBuilder } from "./services/fetchBuilder";
import toast from "react-hot-toast";

export function PageBuilder(){
  const { user, loading: loadingUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  
  const [classes, setClasses] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function onNavigate(route){
    if(location.pathname === route){ return; }  
    
    navigate(route);
  }

    useEffect(() => {
    async function loadClasses(){
      setLoading(true);

      const response = await fetchBuilder("GET", `/class/getAll/${user.id}`);
      const data = await response.json();

      if(response.ok){
        setClasses(data);
      }
      else{
        toast.error(data.message);
      }

      setLoading(false);
    }
    loadClasses();
  }, []);

  return(
    <div className="w-full h-screen flex flex-col">
      {loading || loadingUser ? 
        (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        :
        (
          <>
            <Header user={user} loading={loadingUser} setOpen={setOpen} onNavigate={onNavigate} />

            <div className="flex flex-row w-full h-full overflow-hidden">
              <Sidebar open={open} setOpen={setOpen} classes={classes} />

              <main className="bg-gray-200 flex-1 overflow-y-auto">
                <Outlet />
              </main>
            </div>
          </>
        )
      }
    </div>
  );
}