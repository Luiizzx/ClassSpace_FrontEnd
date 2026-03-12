import { Button } from "../buttons/button";

export function Header({isLogged, onClickFn}){
  return(
    <header className="bg-blue-600 h-20 w-full sticky flex flex-row">
      <div className="bg-inherit w-1/3 sm:w-1/2 h-full flex items-center justify-start">
        <h1 className="bg-clip-text text-transparent bg-linear-to-r from-white to-gray-200 font-semibold text-xl sm:text-2xl ml-4">
          ClassSpace
        </h1>
      </div>

      <div className="bg-inherit w-2/3 sm:w-1/2 h-full flex items-center justify-end">
        {isLogged ? 

          <Button
            onClick={() => onClickFn("/perfil")}
            text={"L"}
          />
        :
          <button
            onClick={() => onClickFn("/login")} 
            className="bg-inherit w-1/2 sm:w-1/3 lg:w-1/5 h-12 border-white text-white border-2 rounded-xl 
              hover:scale-105 transition mr-4"
          >
            Fazer Login
          </button>
        }
      </div>
    </header>
  )
}