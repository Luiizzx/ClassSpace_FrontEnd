import { formatDate } from "../../utils/formatDate";

export function ReplyCard({ reply }){
  return(
    <div className="flex flex-col rounded-md w-full border border-gray-400 shadow-lg">
      <div className="flex flex-col items-start justify-start w-full pl-2 py-1 border-b border-gray-400 bg-gray-200 rounded-t-md">
        <span className="text-gray-900">{reply.user?.name ?? reply.name}</span>
        <p className="text-xs md:text-base font-medium text-gray-800">Em {formatDate(reply.submittedAt)}</p>
      </div>

      <div className="flex items-center justify-start rounded-b-md w-full pl-2 py-5">
        <p className="text-sm md:text-lg text-gray-900 font-medium">{reply.text}</p>
      </div>
    </div>
  )
}