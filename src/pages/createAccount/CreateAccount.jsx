import { useState } from "react"
import { AccountForm } from "./AccountForm"
import { RoleSelection } from "./RoleSelection"

export function CreateAccount(){

  const [role, setRole] = useState(true);
  const [form, setForm] = useState(false);
  const [moveRole, setMoveRole] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  function onClickMoveRole(role){
    setUser(prev => ({...prev, role: role}));

    setForm(true);
    setMoveRole(true);

    setTimeout(() => {
      setRole(false);
    }, 2000);
  }

  function onClickMoveForm(){
    setMoveRole(false);
    // setRole(true);

    setTimeout(() => {
      setForm(false)
    }, 2000);
  }

  return(
      <div className="w-full h-screen bg-linear-to-r from-blue-800 to-blue-900 flex sm:items-center justify-center 
        overflow-hidden"
      >

        { role &&
          <RoleSelection
            setUser={setUser}
            moveRole={moveRole}
            confirmRole={onClickMoveRole}
          />
        }
      
        { form &&
          <AccountForm
            user={user}
            setUser={setUser} 
            moveRole={moveRole} 
            onClickMoveForm={onClickMoveForm}
          />
        }
      </div>
  )
}