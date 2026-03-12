export function Header({isLogged}){
  return(
    <div className="bg-[#0d0d0e] w-full h-20 flex flex-row">
      <div className="bg-inherit w-1/2 h-full justify-start">
        <h1>
          MyClassroom
        </h1>
      </div>

      <div className="bg-inherit w-1/2 h-full justify-end">
        {isLogged ? 
          <button className="border-gray-400 w-1/6 h-16 bg-black border-2 rounded-lg">
            L
          </button>
        :
          <button className="bg-inherit w-1/4 h-14 border-black border-2 rounded-xl hover:scale-105">
            Fazer Login
          </button>
        }
      </div>
    </div>
  )
}