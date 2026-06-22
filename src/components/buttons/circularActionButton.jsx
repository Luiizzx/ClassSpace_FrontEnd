import { Plus } from "lucide-react";

export function CircularActionButton({ onClick, tooltip }){
  return(
    <div className="absolute group bottom-4 right-4">
      <button
        onClick={onClick}
        className="flex items-center justify-center w-14 h-14 rounded-full border border-blue-700 hover:cursor-pointer"
      >
        <Plus size={32} className="text-blue-700" />
      </button>

      <span className="absolute top-7 right-[110%] -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded
        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 whitespace-nowrap"
      >
        {tooltip}
      </span>
    </div>
  )
}