import { Header } from "./components/structure/header";
import { Button } from "./components/buttons/button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BookPlusIcon, House} from "lucide-react";
import { useAuth } from "./features/auth/AuthContext";

export function PageBuilder(){
  const { user, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  
  function onNavigate(route){
    if(location.pathname === route){ return; }  
    
    navigate(route);
  }

  return(
    <div className="w-full h-screen flex flex-col scroll-">
      <Header user={user} loading={loading} onNavigate={onNavigate} />

      <main className="bg-gray-200 flex-1 overflow-y-auto">
        <Outlet />
      </main>
{/* 
      <div className="hidden h-28 w-24 sm:flex flex-col gap-2 absolute bottom-2 right-0">
        <div className="w-full h-1/2 flex justify-end">
          <Button
            extraStyles={"hover:scale-[1.02]"}
            icon={<BookPlusIcon />} 
          />
        </div>

        <div className="w-full h-1/2 flex justify-end">
          <Button
            extraStyles={"hover:scale-[1.02]"}
            onClick={() => onNavigate("/")}
            icon={<House />} 
          />
        </div>
      </div> */}
    </div>
  );
}