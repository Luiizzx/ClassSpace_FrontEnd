import { Check } from "lucide-react";

export function RoleSelectionButton({ onClick, selected, label, icon}){

  const Icon = icon;
  
  return(
    <>
      <button
        onClick={onClick} 
        className={`bg-blue-800 relative w-full sm:w-4/5 lg:w-11/12 2xl:w-[70%] h-4/5 lg:h-full rounded-full flex flex-col
          items-center justify-center transition ${selected ? "scale-[1.02]" : "scale-90"} hover:cursor-pointer`}
      >
        <Icon className="text-gray-200 w-1/2 h-1/2"/>

        <div className={`${selected ? "block" : "hidden"} absolute top-0 right-1 sm:right-4 bg-gray-400 
          h-10 w-10 sm:h-14 sm:w-14 rounded-full flex flex-col items-center justify-center`}
        >
          <Check className="text-blue-800 w-7 h-7"/>
        </div>
      </button>
      
      <p className="text-gray-700 text-xl font-medium">{label}</p>
    </>
  )
}