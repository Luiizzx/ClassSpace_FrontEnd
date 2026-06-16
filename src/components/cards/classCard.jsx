import { ChevronDown, ChevronUp } from "lucide-react";
import { gradientList } from "../../constants/gradient";
export function ClassCard({ name, code, index, onClickFn, isExpanded }){

  return(
    <div className={`bg-linear-to-r ${gradientList[index]} w-full h-16 flex 
      flex-row rounded-lg hover:scale-[1.01] transition`}
    >
      <div className="bg-inherit w-11/12 h-full flex flex-col justify-center rounded-lg">
        <h1 className="text-white font-semibold text-xl sm:text-2xl ml-2">{name}</h1>
        <p className="text-white text-xs ml-2">{code}</p>
      </div>

      <div className="bg-inherit w-1/12 h-full flex items-center rounded-lg justify-end">
        <button className="mr-2" onClick={onClickFn}>
          {isExpanded ? 
            (<ChevronUp className="text-white hover:scale-105 animation"/>)
            : 
            (<ChevronDown className="text-white hover:scale-105 animation"/>)
          }
        </button>
      </div>
    </div>
  )
}