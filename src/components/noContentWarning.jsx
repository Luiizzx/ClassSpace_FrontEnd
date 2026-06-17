import { TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export function NoContentWarning({ title, subText}){
  return(
    <div className="flex flex-1 flex-col gap-2 items-center justify-center text-center">
      <TriangleAlert size={64} strokeWidth={1} className="text-blue-700" />
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500">{subText}</p>
      <Link
        to="/"
        className="mt-4 px-5 py-2 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white 
          transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  )
}