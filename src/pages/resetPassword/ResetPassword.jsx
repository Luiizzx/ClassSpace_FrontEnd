import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock } from "lucide-react";

export function ResetPassword(){
  const navigate = useNavigate();
  const params = useParams();

  const token = params.token;

  const [form, setForm] = useState({ password: "", confirm: "" });

  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  async function confirmPassword(){
    if(form.password !== form.confirm){
      toast.error("Senhas não devem ser diferentes");
      return;
    }

    if(form.password.length > 16){
      toast.error("Senha deve ter no máximo 16 caracteres");
      return;
    }
    
    setLoading(true);
    
    try{
      const result = await fetchBuilder("POST", "/auth/reset-password", { password: form.password, token });

      if(result.ok){
        toast.success("Senha alterada com sucesso");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      else{
        toast.error("Erro ao trocar senha");
      }
    }
    catch{
      toast.error("Erro ao trocar senha");
    }
    finally{
      setLoading(false);
    }
  }

  return(
    <main className="w-full h-screen bg-linear-to-r from-white to-gray-200 flex xl:bg-none">
      <div className="hidden xl:flex xl:w-2/5 h-full bg-blue-700 items-center justify-center">
      </div>

      <div className="w-full xl:w-3/5 h-full flex items-center justify-center">
        <form className="w-11/12 sm:w-4/5 md:w-3/5 xl:w-2/3 flex flex-col mt-16 sm:mt-0 rounded-xl gap-16 md:gap-12">
          <div className="w-full rounded-t-xl flex flex-col gap-2 pt-12 items-center justify-center">
            <h1 
              className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-600 font-semibold 
                text-4xl md:text-5xl"
            >
              ClassSpace
            </h1>

            <p className="text-gray-700 text-xl font-medium">Digite e confirme a nova senha</p>
          </div>

          <div className="bg-inherit w-full pt-6 flex flex-col items-center justify-center gap-8">
            <div className="bg-inherit w-11/12 flex flex-col gap-1">
              <p className="text-gray-700 text-base ml-2">
                Nova senha
              </p>

              <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
                <Lock className="text-blue-700 text-base ml-2"/>
                <input
                  type={isHidden ? "password" : "text"}
                  maxLength={100}
                  onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                  className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:bg-inherit focus:outline-0 text-gray-800" 
                />
            
                <span className="flex-1 flex flex-col h-full items-end justify-center pr-2">
                  <button 
                    type="button"
                    onClick={() => setIsHidden(!isHidden)}
                    className="text-gray-600 text-base h-full w-14 flex items-center justify-end"
                  >
                    {isHidden ? <EyeOff /> : <Eye />}
                  </button>
                </span>
              </div>
            </div>

            <div className="bg-inherit w-11/12 flex flex-col gap-4">
              <div className="bg-inherit w-full flex flex-col gap-1">
                <p className="text-gray-700 text-base ml-2">
                  Confirme a senha
                </p>

                <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
                  <Lock className="text-blue-700 text-base ml-2"/>
              
                  <input
                    maxLength={16}
                    type={isHidden ? "password" : "text"}
                    onChange={(e) => setForm(prev => ({ ...prev, confirm: e.target.value }))}
                    className="ml-2 bg-inherit w-3/4 text-gray-800 sm:w-3/4 h-full focus:border-0 focus:outline-0" 
                  />
                  
                  <span className="flex-1 flex flex-col h-full items-end justify-center pr-2">
                    <button 
                      type="button"
                      onClick={() => setIsHidden(!isHidden)}
                      className="text-gray-600 text-base h-full w-14 flex items-center justify-end"
                    >
                      {isHidden ? <EyeOff /> : <Eye />}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-inherit rounded-b-xl flex flex-col gap-2 items-center justify-center">
            <button
              type="button"
              disabled={loading}
              onClick={confirmPassword} 
              className={`${loading ? "bg-gray-500" : "bg-blue-700 hover:scale-[1.02] hover:bg-blue-600 transition" } 
                text-xl text-gray-200 w-4/5 h-12 rounded-xl`}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}