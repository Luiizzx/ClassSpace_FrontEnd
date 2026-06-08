import { useState } from "react"
import { AccountForm } from "./AccountForm"
import { RoleSelection } from "./RoleSelection"

export function CreateAccount(){

  const [screen, setScreen] = useState({ role: true, form: false });

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: ""
  });

  function onClickMoveRole(){
    setTimeout(() => {
      setScreen({ role: false, form: false});
    }, 500);

    setTimeout(() => {
      setScreen(prev => ({ ...prev, form: true }));
    }, 1000);
  }

  function onClickMoveForm(){
    setTimeout(() => {
      setScreen({ role: false, form: false });
    }, 500);

    setTimeout(() => {
      setScreen(prev => ({ ...prev, role: true }));
    }, 1000);
  }

  return(
      <div className="w-full h-screen bg-linear-to-r from-white to-gray-200 flex sm:items-center justify-center overflow-hidden">

        { screen.role &&
          <RoleSelection
            role={user.role}
            setUser={setUser}
            onClickMoveRole={onClickMoveRole}
          />
        }
      
        { screen.form &&
          <AccountForm
            user={user}
            setUser={setUser} 
            onClickMoveForm={onClickMoveForm}
          />
        }
      </div>
  )
}