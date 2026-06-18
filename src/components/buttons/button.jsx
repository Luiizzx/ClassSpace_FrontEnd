export function Button({icon, text, onClick, extraStyles}){
  return(
    <button 
      onClick={onClick}
      className={`bg-gray-200 border-blue-800 w-15 h-15 border-2 rounded-full mr-4 sm:mr-2 flex 
        items-center justify-center ${extraStyles}`}
    >
      {text !== "" && 
        <p className="font-semibold text-2xl text-blue-800">{text}</p>
      }

      {icon &&
        <span className="font-semibold text-lg text-blue-800">
          {icon}
        </span>
      }

    </button>
  )
}