import { Header } from "./components/structure/header";
import { Button } from "./components/buttons/button";
import { useLocation, useNavigate } from "react-router-dom";
import { BookPlusIcon, House} from "lucide-react";

export function PageBuilder({isLogged, page}){
  const navigate = useNavigate();
  const location = useLocation();
  
  function onNavigate(route){
    if(location.pathname === route){ return; }  
    navigate(route);
  }

  return(
    <div className="w-full h-screen flex flex-col scroll-">
      <Header isLogged={isLogged} onClickFn={onNavigate}/>

      <div className="bg-gray-200 flex-1 overflow-y-auto">
        {page}
      </div>

      <div className="hidden h-28 w-24 sm:flex flex-col gap-2 absolute bottom-2 right-0">
        <div className="w-full h-1/2 flex justify-end">
          <Button
            extraStyles={"hover:scale-[1.02]"}
            icon={<BookPlusIcon />} 
            // onClick={openDialog}
          />
        </div>

        <div className="w-full h-1/2 flex justify-end">
          <Button
            extraStyles={"hover:scale-[1.02]"}
            icon={<House />} 
            onClick={() => onNavigate("/")}
          />
        </div>
      </div>
    </div>
  );
}