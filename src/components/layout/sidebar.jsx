import { ChevronDown, ChevronsRight, ChevronUp, House, LogOutIcon, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getGradient, getLetterColor } from "../../constants/gradient";
import { useState } from "react";
import { fetchBuilder } from "../../services/fetchBuilder";
import toast from "react-hot-toast";

export function Sidebar({ classes, open, setOpen }){
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState(true); //desativar logout após um clique

  async function onLogout(){
    setActive(false);
    try{
      const result = await fetchBuilder("POST", "/auth/logout");

      if(!result.ok){
        toast.error("Erro. Tente novamente.");
        setActive(true);

        return;
      }

      navigate("/login");
    }
    catch{
      toast.error("Um erro inesperado ocorreu");
    }
  }

  return(
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <nav className={`flex flex-col gap-2 justify-start w-[70%] md:w-[55%] lg:w-[30%] xl:w-[25%] h-full bg-gray-100 border-r 
        lg:border-r-2 border-gray-400
        fixed lg:static top-0 left-0 z-50
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} shadow-md`}
      >
        <div className="flex lg:hidden items-center justify-end w-full pr-2 mt-4">
          <button onClick={() => setOpen(false)}>
            <X strokeWidth={1.5} size={32} className="text-gray-800"/>
          </button>
        </div>

        <Link
          to="/"
          className="flex flex-row gap-2 items-center w-full py-6 text-gray-800 font-medium pl-2 border-b border-t lg:border-t-0
            lg:border-b-2 border-gray-400 bg-gray-200 hover:bg-gray-300 transition"
        >
          <House size={28} strokeWidth={2.5} />
          <span className="text-2xl">Início</span>
        </Link>

        <div className="flex flex-row gap-1 items-center w-full pl-2 py-2 text-gray-800">
          <p className="text-2xl font-medium">Turmas</p>

          <div className="flex flex-1 items-center justify-end pr-2">
            <button
              disabled={classes.length == 0}
              onClick={() => setExpanded(!expanded)} 
              className="flex items-center justify-center rounded-full hover:bg-gray-300 transition w-10 h-10"
            >
              {expanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
            </button>
          </div>
        </div>
        
        {classes.length > 0 && expanded &&
          <div className={`flex flex-col items-start gap-2 w-full pl-2 pr-2`}>
            {classes.map((classObj, index) => (
              <Link
                key={index}
                to={`/posts/${classObj.id}`}
                className={`flex flex-row items-center gap-2 w-full rounded-lg bg-linear-to-r text-white pl-2 py-3 ${getGradient(index)}`}
              >
                <span className={`w-6 h-6 flex items-center justify-center bg-white rounded-full font-bold ${getLetterColor(index)}`}>
                  {classObj.name.charAt(0)}
                </span>

                <p className="text-white font-medium text-lg">{classObj.name}</p>
              </Link>
            ))}
          </div>
        }

        <div className="flex flex-1 items-end justify-center">
          <button
            disabled={!active}
            onClick={onLogout}
            className="flex flex-row gap-2 items-center w-full py-6 text-red-800 font-medium pl-2 border-t
              lg:border-t-2 border-gray-400 hover:bg-gray-100 hover:cursor-pointer transition"
          >
            <LogOutIcon size={20} strokeWidth={2.5} />
            <span className="text-xl">Sair da conta</span>
        </button>
        </div>
      </nav>
    </>
  )
}