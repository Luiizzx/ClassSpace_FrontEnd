import { Check, X } from "lucide-react";

export function Toast({ message, success = true }){
  return(
    <div className={`top-10 right-1/2 flex items-center h-8 ${success ? "bg-green-600" : "bg-red-600"}`}>
      <div className="bg-inherit flex flex-row gap-1">
        <p className="text-sm text-white">{message}</p>
        
        <span className={`"flex items-center justify-center rounded-full bg-white ${success ? "text-green-600" : "text-red-600"}`}>
          {success ? <Check />: <X />}
        </span>
      </div>
    </div>
  )
}