import { Eye, EyeOff } from "lucide-react"

export function FormInput({ onChange, password = false, isHidden, setIsHidden, icon, label, value }){
  const Icon = icon

  return(
    <>
      <p className="text-gray-700 text-base ml-2">{label}</p>

      <div className="w-full h-12 bg-gray-200 flex flex-row items-center border-blue-700 border-2 rounded-xl">
        <Icon className="text-blue-700 text-base ml-2"/>
        <input
          value={value}
          onChange={onChange}
          type={!password || !isHidden ? "text" : "password"}
          className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:bg-inherit focus:outline-0 text-gray-800" 
        />
        
        {password &&
          <span className="flex-1 flex flex-col h-full items-end justify-center pr-2">
            <button 
              type="button"
              onClick={() => setIsHidden(!isHidden)}
              className="text-gray-600 text-base h-full w-14 flex items-center justify-end"
            >
              {isHidden ? <EyeOff /> : <Eye />}
            </button>
          </span>
        }
      </div>
    </>
  )
}