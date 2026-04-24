import { ArrowBigLeftDash, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function AccountForm({moveRole, onClickMoveForm}){
  
  const [isHidden, setIsHidden] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: ""
  });
  

  function onNameChange(){ setName(e.target.value); }
  function onEmailChange(){ setEmail(e.target.value); }

  function onPasswordChange(){ 
    const {name, value} = e.target;

    if(value.length == 8){
      return;
    }

    setUserPassword((prev) => ({
      ...prev,
      [name]: value
    })); 
  }

  return(
      <div className={`w-11/12 sm:w-4/5 md:w-1/2 xl:w-1/3 h-4/5 sm:h-11/12 bg-gray-200 shadow-lg shadow-gray-500
        flex flex-col mt-16 sm:mt-0 rounded-xl gap-16 `}
      >
        <div className="relative w-full h-1/6 rounded-t-xl flex flex-col items-center pt-12">
          <div className="absolute bg-inherit w-1/5 h-1/6 top-18 left-2 flex flex-col items-center justify-center">

            <button className="bg-inherit h-12 w-12" onClick={onClickMoveForm}>
              <ArrowBigLeftDash className="text-blue-700"/>
            </button>
          </div>

          <div className="bg-inherit w-4/5 h-full flex flex-col items-center justify-center">
            <h1 
              className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-500 font-semibold text-4xl"
            >
              ClassSpace
            </h1>

            <p className="text-gray-700 text-xl font-medium">Crie sua conta</p>
          </div>
        </div>

        <div className="bg-inherit w-full h-2/5 gap-2 md:gap-4 pt-6 flex flex-col items-center justify-center">
          <div className="bg-inherit w-11/12 h-1/2 flex flex-col">

            <p className="text-gray-700 text-base ml-2">
              Nome de usuário
            </p>

            <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
              <Mail className="text-blue-700 text-base ml-2"/>
              <input
                onChange={onNameChange}
                className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:bg-inherit focus:outline-0 text-gray-800" 
              />
            </div>
          </div>

          <div className="bg-inherit w-11/12 h-1/2 flex flex-col">
            <p className="text-gray-700 text-base ml-2">
              E-mail
            </p>

            <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
              <Mail className="text-blue-700 text-base ml-2"/>
              <input
                onChange={onEmailChange}
                className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:bg-inherit focus:outline-0 text-gray-800" 
              />
            </div>
          </div>

          <div className="bg-inherit w-11/12 h-1/2 flex flex-col gap-4">
            <div className="bg-inherit w-full h-full flex flex-col">
              <p className="text-gray-700 text-base ml-2">
                Senha
              </p>

              <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
                <Lock className="text-blue-700 text-base ml-2"/>
            
                <input
                  maxLength={8}
                  type={isHidden ? "password" : "text"}
                  onChange={onPasswordChange}
                  className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:outline-0" 
                />

                <button 
                  onClick={() => setIsHidden(!isHidden)}
                  className="text-gray-600 text-base mr-2"
                >
                  {isHidden ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-inherit w-11/12 h-1/2 flex flex-col gap-4">
            <div className="bg-inherit w-full h-full flex flex-col">
              <p className="text-gray-700 text-base ml-2">
                Confirmar Senha
              </p>

              <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
                <Lock className="text-blue-700 text-base ml-2"/>
            
                <input
                  maxLength={8}
                  type={isHidden ? "password" : "text"}
                  onChange={onPasswordChange}
                  className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:outline-0" 
                />

                <button 
                  onClick={() => setIsHidden(!isHidden)}
                  className="text-gray-600 text-base mr-2"
                >
                  {isHidden ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-inherit h-1/5 rounded-b-xl flex flex-col pt-4 md:pt-12 gap-2 items-center justify-center">
          <button
            onClick={""} 
            className="bg-blue-700 text-gray-200 w-4/5 h-12 rounded-xl hover:scale-[1.02] text-xl hover:bg-blue-600 transition"
          >
            Confirmar
          </button>

          <Link
            to="/login"
            className="text-base text-blue-700 hover:text-blue-600 transition"
          >
            Já possui conta?
          </Link>
        </div>
      </div>
  );
}