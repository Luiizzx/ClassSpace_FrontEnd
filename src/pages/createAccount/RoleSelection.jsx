import { Check, GraduationCap, ShieldUser, University } from "lucide-react";
import { Link } from "react-router-dom";
import { roles } from "../../constants/roles";
import { RoleSelectionButton } from "../../components/buttons/roleSelectionButton";
export function RoleSelection({ role, setUser, onClickMoveRole }){
  
  function roleClick(newRole){
    if(role == newRole){
      setUser(prev => ({ ...prev, role: "" }));

      return;
    }

    setUser(prev => ({ ...prev, role: newRole }));
  }

  return(
    <main className={`w-11/12 h-full
      flex flex-col rounded-xl gap-4 lg:gap-20`}
    >
      <div className="w-full rounded-t-xl flex flex-col gap-2 pt-6 items-center justify-center">
        <h1 
          className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-600 font-semibold text-4xl md:text-5xl"
        >
          ClassSpace
        </h1>

        <p className="text-gray-700 text-2xl font-medium">Você é um...</p>
      </div>

      <div className="w-full h-2/5 xl:h-[45%] gap-6 md:gap-0 flex flex-row items-center justify-center mt-0 md:mt-8">
        <div className="w-full h-full ml-2 flex flex-col items-center gap-2">

          <RoleSelectionButton
            label={"Aluno"}
            icon={GraduationCap}
            selected={role == roles.STUDENT}
            onClick={() => roleClick(roles.STUDENT)}
          />
        </div>

        <div className="w-full h-full flex flex-col items-center gap-2">

          <RoleSelectionButton
            label={"Professor"}
            icon={University}
            selected={role == roles.TEACHER}
            onClick={() => roleClick(roles.TEACHER)} 
          />
        </div>

        <span className="w-full h-full hidden lg:flex flex-col items-center gap-2 ">
          <RoleSelectionButton
            label={"Admin"}
            icon={ShieldUser}
            selected={role == roles.ADMIN}
            onClick={() => roleClick(roles.ADMIN)}
          />
        </span>
      </div>

      <div className="w-full h-2/5 flex items-center justify-center lg:hidden">
        <span className="w-1/2 h-full flex flex-col items-center gap-2">
          <RoleSelectionButton
            label={"Admin"}
            icon={ShieldUser}
            selected={role == roles.ADMIN}
            onClick={() => roleClick(roles.ADMIN)}
          />
        </span>
      </div>

      <div className="w-full rounded-b-xl flex flex-1 flex-col mb-8 gap-2 items-center justify-end">
        <button
          onClick={onClickMoveRole} 
          disabled={role == ""}
          className={`disabled:bg-gray-500 bg-blue-800 text-gray-200 w-4/5 sm:w-1/2 lg:w-2/5 h-14
            rounded-xl hover:cursor-pointer text-2xl`}
        >
          Continuar
        </button>

        <Link
          to="/login"
          className="text-lg text-blue-700 hover:text-blue-600 transition"
        >
          Já possui conta?
        </Link>
      </div>
    </main>
 ) 
}