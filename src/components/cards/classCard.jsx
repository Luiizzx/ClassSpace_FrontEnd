import { ChevronRight } from "lucide-react";
import { getGradient } from "../../constants/gradient";
import { Link } from "react-router-dom";
export function ClassCard({ index, data }){

  return(
    <div className={`bg-linear-to-r ${getGradient(index)} w-full h-16 flex 
      flex-row rounded-lg hover:scale-[1.01] transition`}
    >
      <div className="bg-inherit w-10/12 lg:w-11/12 h-full flex flex-col justify-center rounded-lg">
        <h1 className="text-white font-semibold text-xl sm:text-2xl ml-2">{data.name}</h1>
        <p className="text-white text-xs ml-2">{data.code}</p>
      </div>

      <Link
        to={`/posts/${data.id}`}
        className="flex flex-1 items-center justify-end pr-2"
      >
        <ChevronRight className="text-white"/>
      </Link>
    </div>
  )
}