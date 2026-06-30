import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export function AssignmentCard({ data, classId }){
  return(
    <div className="flex flex-col rounded-md w-full border border-gray-400 shadow-lg">
      <div className="flex flex-col items-start justify-start w-full pl-2 py-2 border-b border-gray-400 bg-gray-300 rounded-t-md">
        <p className="text-sm md:text-base font-medium text-gray-800">{data.name}</p>

        <span className="text-gray-800 font-medium text-sm md:text-base" >
          Data de entrega: <span className="text-gray-900">{formatDate(data.dueDate)}</span>
        </span>
      </div>

      { data.description &&
        <div className="flex items-center justify-start w-full pl-2 py-4">
          <p className="text-sm md:text-base text-gray-900 font-medium">{data.description}</p>
        </div>
      }

      <div className="flex items-center py-2 pr-2 justify-end w-full border-t border-gray-400 rounded-b-md">
        <Link
          to={`/assignment/${classId}/${data.id}`}
          className="text-sm md:text-base text-blue-700 font-medium"
        >
          Ver detalhes 
        </Link>
      </div>
    </div>
  )
}