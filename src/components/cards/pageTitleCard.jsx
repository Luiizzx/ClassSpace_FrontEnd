import { ChevronsLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function PageTitleCard({ title, backTo }){
  return(
    <div className="relative bg-linear-to-r from-blue-950 to-blue-800 w-full min-h-20 md:min-h-24 mt-2 rounded-lg flex
      items-center justify-center pl-2 pr-2"
    >
      {backTo &&
        <Link
          to={backTo}
          className="absolute self-center left-2 text-white hover:scale-105"
        >
          <ChevronsLeft size={40}/>
        </Link>
      }

      <h1 className="text-3xl text-white font-medium">{title}</h1>
    </div>
  )
};