import { GraduationCap, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export function Header({ user, loading, onNavigate, setOpen }){

  return(
    <header className="bg-blue-600 h-20 md:h-28 w-full sticky flex flex-row">

      <div className="bg-inherit w-2/5 h-full flex flex-row gap-4 items-center justify-start text-white pl-4">
        <button
          onClick={() => setOpen(true)}
          className="flex lg:hidden text-white hover:cursor-pointer"
        >
          <Menu className="h-8 w-8 md:h-10 md:w-10"/>
        </button>

        <GraduationCap size={56} className="hidden lg:flex"/>
        <h1 className="font-semibold text-3xl hidden lg:flex">
          ClassSpace
        </h1>
      </div>

      <div className="bg-inherit w-3/5 h-full flex items-center justify-end">
        {!user && !loading &&
          <button
            onClick={() => onNavigate("/login")} 
            className="bg-inherit w-3/5 sm:w-1/3 lg:w-1/5 h-12 border-white text-white border-2 rounded-xl 
              hover:scale-[1.02] transition mr-4"
          >
            Fazer Login
          </button>
        }
      </div>
    </header>
  )
}