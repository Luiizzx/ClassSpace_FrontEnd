import { Link } from "react-router-dom";

export function ModuleCard({ moduleName, moduleContent, route }) {
  return (
    <Link
      to={route} 
      className="w-full md:w-1/3 h-full shadow-gray-400 shadow-2xl border-gray-400 border 
        rounded-3xl flex flex-col hover:scale-[1.01] transition"
    >
      <div className="bg-inherit w-full h-1/6 flex flex-row md:items-center gap-1 sm:gap-2 mt-4">
        <div className="bg-gray-700 border-gray-700 rounded-3xl h-4 w-4 ml-2 md:ml-4"/>
        <h1 className="text-base text-gray-700">{moduleName}</h1>
      </div>
    </Link>
  )
}