import { useState } from "react"
import toast from "react-hot-toast";
import { fetchBuilder } from "../../services/fetchBuilder";
import { Mail } from "lucide-react";

export function ForgotPassword(){
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  
  async function requestResetLink(){
    setLoading(true);

    try{
      const result = await fetchBuilder("POST", "/auth/forgot-password", { email });

      if(result.ok){
        toast.success("Solicitação bem sucedida");

        return;
      }

      toast.error("Erro ao solicitar link de recuperação")
    }
    catch{
      toast.error("Erro ao solicitar link de recuperação");
    }
    finally{
      setLoading(false);
    }
  }

  return(
    <main className="w-full h-screen bg-linear-to-r from-white to-gray-200 flex xl:bg-none">

      <div className="w-full xl:w-3/5 h-full flex items-center justify-center">
        <form className="w-11/12 sm:w-4/5 md:w-3/5 xl:w-2/3 flex flex-col mt-16 sm:mt-0 rounded-xl gap-16 md:gap-12">
          <div className="w-full rounded-t-xl flex flex-col gap-2 pt-12 items-center justify-center">
            <h1 
              className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-600 font-semibold 
                text-4xl md:text-5xl"
            >
              ClassSpace
            </h1>

            <p className="text-gray-700 text-xl font-medium">Digite seu e-mail para recuperação</p>
          </div>

          <div className="bg-inherit w-full pt-6 flex flex-col items-center justify-center gap-8">

            <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
              <Mail className="text-blue-700 text-base ml-2"/>
              <input
                type="email"
                maxLength={100}
                onChange={(e) => setEmail(e.target.value)}
                className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:bg-inherit focus:outline-0 text-gray-800" 
              />
            </div>
          </div>

          <div className="bg-inherit rounded-b-xl flex flex-col gap-2 items-center justify-center">
            <button
              type="button"
              disabled={loading}
              onClick={requestResetLink} 
              className={`${loading ? "bg-gray-500" : "bg-blue-700 hover:scale-[1.02] hover:bg-blue-600 transition" } 
                text-xl text-gray-200 w-4/5 h-12 rounded-xl`}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}