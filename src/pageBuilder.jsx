import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { BookPlusIcon, House, Loader2} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/layout/header";
import { useAuth } from "./features/auth/AuthContext";
import { Sidebar } from "./components/layout/sideBar";
import { fetchBuilder } from "./services/fetchBuilder";

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

      try{
        const response = await fetchBuilder("GET", `/class/getAll/${user.id}`);
        
        if(!response.ok){
          toast.error("Erro ao tentar carregar turmas");

          setLoading(false);
          return;
        }

        const data = await response.json();
        setClasses(data);
      }
      catch{
        toast.error("Erro ao tentar carregar turmas");
      }
      finally{
        setLoading(false);
      }
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

              <main className="bg-gray-100 flex flex-1 overflow-y-auto justify-center">
                <Outlet />
              </main>
            </div>
          </>
        )
      }
    </div>
  );
}