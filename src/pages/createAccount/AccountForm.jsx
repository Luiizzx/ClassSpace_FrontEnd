import { ArrowBigLeftDash, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import { FormInput } from "../../components/input/formInput";
import toast from "react-hot-toast";
import { roles } from "../../constants/roles";

export function AccountForm({ user, setUser, onClickMoveForm }){
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");

  async function onRegister(){

    if(user.password !== confirmPass){
      alert("As senhas não podem ser diferentes.");
      return;
    }

    setLoading(true);

    try{
      const result = await fetchBuilder("POST", "/auth/create-acc",
        { name: user.name, email: user.email, 
          password: user.password, role: user.role 
        });
      
      if(result.ok){
        navigate("/login");
        return;
      }

      const data = await result.json();
      toast.error(data.message || "Erro ao tentar criar conta")
    }
    catch{
      toast.error("Erro ao tentar criar conta");
    }
    setLoading(false);
  }

  return(
      <div className={`w-11/12 sm:w-4/5 md:w-1/2 xl:w-1/3 h-full
        flex flex-col items-center rounded-xl gap-8`}
      >
        <div className="w-11/12 h-1/6 rounded-t-xl flex flex-row mt-4">
          <div className="bg-inherit h-full flex flex-col items-center justify-center">
          
            <button className="bg-inherit" onClick={onClickMoveForm}>
              <ArrowBigLeftDash size={36} className="text-blue-700"/>
            </button>
          </div>

          <div className="bg-inherit w-4/5 h-full flex flex-col items-center justify-center">
            <h1 
              className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-600 font-semibold text-4xl md:text-5xl"
            >
              ClassSpace
            </h1>

            <p className="text-gray-700 text-xl font-medium">Crie sua conta</p>
          </div>
        </div>

        <form className="bg-inherit w-full h-1/2 gap-2 md:gap-4 flex flex-col items-center justify-center">
          <div className="bg-inherit w-11/12 h-1/2 flex flex-col">
            <FormInput
              label={"Nome"}
              icon={User}
              password={false}
              isHidden={false}
              value={user.name}
              onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="bg-inherit w-11/12 h-1/2 flex flex-col">
            <FormInput
              label={"Email"}
              icon={Mail}
              password={false}
              isHidden={false}
              value={user.email}
              onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="bg-inherit w-11/12 h-1/2 flex flex-col">
            <FormInput
              label={"Senha"}
              icon={Lock}
              password={true}
              value={user.password}
              isHidden={isHidden}
              setIsHidden={setIsHidden}
              onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>

          <div className="bg-inherit w-11/12 h-1/2 flex flex-col">
            <FormInput
              label={"Confirmar senha"}
              icon={Lock}
              password={true}
              value={confirmPass}
              isHidden={isHidden}
              setIsHidden={setIsHidden}
              onChange={(e) => setConfirmPass(e.target.value)}            
            />
          </div>
        </form>

        <div className="bg-inherit w-11/12 h-1/5 rounded-b-xl flex flex-col pt-4 md:pt-12 gap-2 items-center justify-center">
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