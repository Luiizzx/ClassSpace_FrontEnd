import { ChevronDown, ChevronsRight, ChevronUp, House, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getGradient, getLetterColor } from "../../constants/gradient";
import { useState } from "react";

export function Sidebar({ classes, open, setOpen }){

  const [expanded, setExpanded] = useState(true);

  return(
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <nav className={`flex flex-col gap-2 justify-start w-[70%] lg:w-[30%] xl:w-[25%] h-full bg-gray-200 border-r 
        lg:border-r-2 border-gray-400
        fixed lg:static top-0 left-0 z-50
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex lg:hidden items-center justify-end w-full pr-2 mt-4">
          <button onClick={() => setOpen(false)}>
            <X strokeWidth={1.5} size={32} className="text-gray-800"/>
          </button>
        </div>

        <Link
          to="/"
          className="flex flex-row gap-2 items-center w-full py-4 text-gray-800 font-medium pl-2 border-b border-t lg:border-t-0
            lg:border-b-2 border-gray-400"
        >
          <House size={28} strokeWidth={2.5} />
          <span className="text-2xl">Início</span>
        </Link>

        <div className="flex flex-row gap-1 items-center w-full pl-2 py-2 text-gray-800">
          <p className="text-2xl font-medium">Turmas</p>
          
          <button onClick={() => setExpanded(!expanded)} className="flex flex-1 items-center justify-end pr-2">
            {expanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
          </button>
        </div>
        
        {classes.length > 0 && expanded &&
          <div className={`flex-col items-start gap-1 w-full pl-2 pr-2`}>
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
      </nav>
    </>
  )
}