export function Button({icon, text, onClick, extraStyles}){
  return(
    <button 
      onClick={onClick}
      className={`bg-gray-200 border-blue-800 w-12 h-12 border-2 rounded-3xl mr-4 flex 
        items-center justify-center ${extraStyles}`}
    >
      {text !== "" && 
        <p className="font-semibold text-lg text-blue-800">{text}</p>
      }

      {icon &&
        <span className="font-semibold text-lg text-blue-800">
          {icon}
        </span>
      }

    </button>
  )
}