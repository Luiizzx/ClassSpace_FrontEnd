import { ChevronDown } from "lucide-react";

export function ClassCard({subject, date, color, expandModules}){

  const gradients = {
    green: "from-green-700 to-green-500",
    blue: "from-blue-700 to-blue-500",
    purple: "from-purple-700 to-purple-500",
    orange: "from-orange-700 to-orange-500",
    gray: "from-gray-700 to-gray-500"
  };

  return(
    <div className={`bg-linear-to-r ${gradients[color]} w-full h-16 flex 
      flex-row rounded-lg hover:scale-[1.02] transition`}
    >
      <div className="bg-inherit w-11/12 h-full flex flex-col justify-center rounded-lg">
        <h1 className="text-white font-semibold text-xl sm:text-2xl ml-2">{subject}</h1>
        <p className="text-white text-xs ml-2">{date}</p>
      </div>

      <div className="bg-inherit w-1/12 h-full flex items-center rounded-lg justify-end">
        <button className="mr-2">
          <ChevronDown className="text-white hover:scale-105 animation"/>
        </button>
      </div>
    </div>
  )
}