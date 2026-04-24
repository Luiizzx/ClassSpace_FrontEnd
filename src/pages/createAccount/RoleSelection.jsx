import { Check, GraduationCap, University } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function RoleSelection({moveRole, onClickMoveRole}){
  const roles = {
    STUDENT: "STUDENT",
    TEACHER: "TEACHER"
  };
  
  const [role, setRole] = useState("");

  return(
    <div className={`w-11/12 sm:w-4/5 md:w-3/5 h-4/5 sm:h-11/12 bg-gray-200 shadow-lg shadow-gray-500 
      flex flex-col mt-12 sm:mt-0 rounded-xl gap-8  transition-transform duration-500 ease-in-out
      ${moveRole ? "-translate-x-[150%]" : "translate-x-0"}`}
    >
      <div className="w-full h-1/6 rounded-t-xl flex flex-col gap-2 pt-12 items-center justify-center">
        <h1 
          className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-500 font-semibold text-4xl"
        >
          ClassSpace
        </h1>

        <p className="text-gray-700 text-xl font-medium">Você é um...</p>
      </div>

      <div className="bg-inherit w-full h-2/3 gap-6 md:gap-0 pt-6 flex flex-row items-center justify-center">

        <div className="bg-inherit w-1/2 md:w-3/5 h-3/4 lg:h-10/12 ml-2 flex flex-col items-center gap-2">
          <button
            onClick={() => setRole(roles.STUDENT)} 
            className={`bg-blue-800 relative w-full sm:w-4/5 xl:w-3/5 h-3/4 sm:h-4/5 rounded-full flex flex-col
              items-center justify-center transition ${roles.STUDENT ? "scale-[1.02]" : "scale-90"}`}
          >
            <GraduationCap className="text-gray-200 w-1/2 h-1/2"/>

            <div className={`${role == roles.STUDENT? "block" : "hidden"} absolute top-0 right-1 sm:right-4 bg-gray-400 
              h-10 w-10 sm:h-14 sm:w-14 rounded-full flex flex-col items-center justify-center`}
            >
              <Check className="text-blue-800 w-7 h-7"/>
            </div>
          </button>
          
          <p className="text-gray-700 text-xl font-medium">Aluno</p>
        </div>

        <div className="bg-inherit w-1/2 md:w-3/5 h-3/4 lg:h-10/12 mr-2 flex flex-col items-center gap-2">
          <button
            onClick={() => setRole(roles.TEACHER)} 
            className={`bg-blue-800 relative w-full sm:w-4/5 xl:w-3/5 h-3/4 sm:h-4/5 rounded-full flex flex-col 
              items-center justify-center transition ${role == roles.TEACHER ? "scale-[1.02]" : "scale-90"}`}
          >
            <University className="text-gray-200 w-1/2 h-1/2"/>

            <div className={`${role == roles.TEACHER ? "block" : "hidden"} absolute top-0 right-1 sm:right-4 bg-gray-400 
              h-10 w-10 sm:h-14 sm:w-14 rounded-full flex flex-col items-center justify-center`}
            >
              <Check className="text-blue-800 w-7 h-7"/>
            </div>
          </button>

          <p className="text-gray-700 text-xl font-medium">Professor</p>
        </div>
      </div>

      <div className="bg-inherit w-full h-1/4 rounded-b-xl flex flex-col pt-4 gap-2 items-center justify-center">
        <button
          onClick={() => onClickMoveRole(role)} 
          disabled={role == ""}
          className={`${role == "" ? "bg-gray-500" : "bg-blue-800"} text-gray-200 w-4/5 sm:w-3/5 xl:w-1/2 h-12 
          rounded-xl hover:scale-[1.02] text-xl transition`}
        >
          Continuar
        </button>

        <Link
          to="/login"
          className="text-base text-blue-700 hover:text-blue-600 transition"
        >
          Já possui conta?
        </Link>
      </div>
    </div>
 ) 
}