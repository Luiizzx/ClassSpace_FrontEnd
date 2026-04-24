import { ArrowBigLeftDash, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchBuilder } from "../../utils/fetchBuilder";

export function AccountForm({user, setUser, moveRole, onClickMoveForm}){
  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");
  
  function onConfirmPassChange(e){
    let value = e.target.value;

    if (value.length == 8){ return; }
    setConfirmPass(value);
  }

  function onChangeFn(e){ 
    const {name, value} = e.target;

    if(name == "password" && value.length == 8){ return; }

    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function onRegister(){
    if(user.password !== confirmPass){
      alert("As senhas não podem ser diferentes.");
      return;
    }

    setLoading(true);

    try{
      const result = await fetchBuilder("POST", "/create-acc",
        { name: user.name, email: user.email, 
          password: user.password, role: user.role 
        });

      console.log(result);
    }
    catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return(
      <div className={`w-11/12 sm:w-4/5 md:w-1/2 xl:w-1/3 h-4/5 sm:h-11/12 bg-gray-200 shadow-lg shadow-gray-500
        flex flex-col mt-16 sm:mt-0 rounded-xl gap-16 ${moveRole ? "translate-x-0" : "translate-x-[150%]"}`}
      >
        <div className="w-full h-1/6 rounded-t-xl flex flex-row pt-12">
          <div className="bg-inherit w-1/5 h-full flex flex-col items-center justify-center">
          
            <button className="bg-inherit" onClick={onClickMoveForm}>
              <ArrowBigLeftDash className="text-gray-500"/>
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
                name="name"
                onChange={(e) => onChangeFn(e)}
                value={user.name}
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
                name="email"
                onChange={(e) => onChangeFn(e)}
                value={user.email}
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
                  name="password"
                  maxLength={8}
                  type={isHidden ? "password" : "text"}
                  value={user.password}
                  onChange={(e) => onChangeFn(e)}
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
                  onChange={(e) => onConfirmPassChange(e)}
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
            disabled={loading}
            onClick={onRegister} 
            className={`${loading ? "bg-gray-500" : "bg-blue-700 hover:scale-[1.02] hover:bg-blue-600 transition" } 
              text-xl text-gray-200 w-4/5 h-12 rounded-xl`}
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