import { useState } from "react";
import { Button } from "../buttons/button";
import { AccountOptions } from "../dialogs/accountOptions";

export function Header({ user, loading, onNavigate }){
  const [dialog, setDialog] = useState(false)

  return(
    <header className="bg-blue-600 h-20 w-full sticky flex flex-row">
      <div className="bg-inherit w-2/5 h-full flex items-center justify-start">
        <h1 className="bg-clip-text text-transparent bg-linear-to-r from-white to-gray-200 font-semibold text-xl sm:text-2xl ml-4">
          ClassSpace
        </h1>
      </div>

      <div className="bg-inherit w-3/5 h-full flex items-center justify-end">
        {user && !loading ? 
          <Button
            onClick={() => setDialog(!dialog)}
            text={user.name.charAt(0)}
          />
        :
          <button
            onClick={() => onNavigate("/login")} 
            className="bg-inherit w-3/5 sm:w-1/3 lg:w-1/5 h-12 border-white text-white border-2 rounded-xl 
              hover:scale-[1.02] transition mr-4"
          >
            Fazer Login
          </button>
        }

        {dialog &&
          <AccountOptions onNavigate={onNavigate} />
        }
      </div>
    </header>
  )
}