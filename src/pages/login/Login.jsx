import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchBuilder } from "../../utils/fetchBuilder";

export function Login({setIsLogged}){
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  function onEmailChange(e){
    setEmail(e.target.value);
  }

  function onPasswordChange(e){
    let value = e.target.value;

    if(value.length > 16){
      return;
    }

    setPassword(e.target.value);
  }

  async function onLogin(){
    setLoading(true);

    try{
      const result = await fetchBuilder("POST", "/login", { email, password });
      console.log(result);
    }
    catch(error){
      console.log(error);
    }
    setIsLogged(true);
    setLoading(false);
  }

  return(
    <div className="w-full h-screen bg-linear-to-r from-blue-700 to-blue-800 flex sm:items-center justify-center">
      <div className="w-11/12 sm:w-4/5 xl:w-1/3 h-3/4 sm:h-4/5 bg-gray-200 flex flex-col mt-16 sm:mt-0 rounded-xl gap-16">
        <div className="w-full h-1/6 rounded-t-xl flex flex-col gap-2 pt-12 items-center justify-center">
          <h1 
            className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-500 font-semibold text-4xl"
          >
            ClassSpace
          </h1>

          <p className="text-gray-700 text-xl font-medium">Preencha seus dados</p>
        </div>

        <div className="bg-inherit w-full h-2/5 pt-6 flex flex-col items-center justify-center">
          <div className="bg-inherit w-11/12 h-1/2 flex flex-col gap-1">
            <p className="text-gray-700 text-base ml-2">
              E-mail
            </p>

            <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
              <Mail className="text-blue-700 text-base ml-2"/>
              <input
                type="email"
                onChange={onEmailChange}
                className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:bg-inherit focus:outline-0 text-gray-800" 
              />
            </div>
          </div>

          <div className="bg-inherit w-11/12 h-1/2 flex flex-col gap-4">
            <div className="bg-inherit w-full h-full flex flex-col gap-1">
              <p className="text-gray-700 text-base ml-2">
                Senha
              </p>

              <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
                <Lock className="text-blue-700 text-base ml-2"/>
            
                <input
                  maxLength={8}
                  type={isHidden ? "password" : "text"}
                  onChange={onPasswordChange}
                  className="ml-2 bg-inherit w-2/3 text-gray-800 sm:w-3/4 h-full focus:border-0 focus:outline-0" 
                />
                
                <div className="flex-1 flex flex-col h-full items-end justify-center">
                  <button 
                    type="button"
                    onClick={() => setIsHidden(!isHidden)}
                    className="text-gray-600 text-base h-full mr-2 w-1/2"
                  >
                    {isHidden ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-inherit w-full flex justify-end">
              <Link 
                to="/recover-pass"
                className="text-base text-blue-700 hover:text-blue-600 transition" 
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-inherit h-1/6 rounded-b-xl flex flex-col gap-2 items-center justify-center">
          <button
            disabled={loading}
            type="button"
            onClick={onLogin} 
            className={`${loading ? "bg-gray-500" : "bg-blue-700 hover:scale-[1.02] hover:bg-blue-600 transition" } 
              text-xl text-gray-200 w-4/5 h-12 rounded-xl`}
          >
            Entrar
          </button>

          <Link 
            to="/create"
            className="text-base text-blue-700 hover:text-blue-600 transition"
          >
            Ainda não tem conta?
          </Link>
        </div>
      </div>
    </div>
  );
}