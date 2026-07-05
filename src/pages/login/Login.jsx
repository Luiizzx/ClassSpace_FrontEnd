import { Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import { useAuth } from "../../features/auth/AuthContext";
import toast from "react-hot-toast";

export function Login(){
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" }); 

  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const [open, setOpen] = useState(false);

  async function onLogin(){
    setLoading(true);
    
    try{
      const result = await fetchBuilder("POST", "/auth/login", { email: form.email, password: form.password });

      if(result.ok){
        const data = await result.json();
        setUser(data);

        navigate("/");
      }
      else{ toast.error("Erro ao entrar na conta"); }
    }
    catch{
      toast.error("Erro ao entrar na conta");
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
        
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-10/12 max-w-lg rounded-3xl bg-white p-8 shadow-xl">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-8 flex h-9 w-9 items-center justify-center rounded-full text-2xl 
                  text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X />
              </button>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Funcionalidade de Administrador
              </h2>

              <div className="space-y-4 border-b border-gray-200 pb-6 text-gray-700 leading-relaxed">
                <p>
                  A função de administrador é direcionada àqueles que desejam ter um
                  melhor controle sobre as turmas de sua própria instituição.
                </p>

                <p>
                  Caso deseje se tornar um administrador, envie um e-mail para nós
                  confirmando a posse do domínio de e-mail utilizado pela sua
                  instituição clicando no botão abaixo.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=luizfelipesousacordeiro@gmail.com&su=Solicitação%20de%20Administrador"
                  target="_blank"
                  rel="noopenner noreferrer"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                  Enviar e-mail
                </a>
              </div>
            </div>
          </div>
        )}

        <form className="w-11/12 sm:w-4/5 md:w-3/5 xl:w-2/3 flex flex-col mt-8 sm:mt-0 rounded-xl gap-12">
          <div className="w-full rounded-t-xl flex flex-col gap-2 pt-10 items-center justify-center">
            <h1 
              className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-600 font-semibold 
                text-4xl md:text-5xl"
            >
              ClassSpace
            </h1>

            <p className="text-gray-700 text-xl font-medium">Preencha seus dados</p>
          </div>

          <div className="bg-inherit w-full flex flex-col items-center justify-center gap-8">
            <div className="bg-inherit w-11/12 flex flex-col gap-1">
              <p className="text-gray-700 text-base ml-2">
                E-mail
              </p>

              <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
                <Mail className="text-blue-700 text-base ml-2"/>
                <input
                  type="email"
                  maxLength={100}
                  value={form.email}
                  onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className="ml-2 bg-inherit w-3/4 h-full focus:border-0 focus:bg-inherit focus:outline-0 text-gray-800" 
                />
              </div>
            </div>

            <div className="bg-inherit w-11/12 flex flex-col gap-4">
              <div className="bg-inherit w-full flex flex-col gap-1">
                <p className="text-gray-700 text-base ml-2">
                  Senha
                </p>

                <div className="w-full h-12 bg-gray-300 flex flex-row items-center border-blue-700 border-2 rounded-xl">
                  <Lock className="text-blue-700 text-base ml-2"/>
              
                  <input
                    maxLength={16}
                    type={isHidden ? "password" : "text"}
                    value={form.password}
                    onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
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
              
              <div className="bg-inherit w-full flex justify-end">
                <Link 
                  to="/forgot-password"
                  className="text-base text-blue-700 hover:text-blue-600 transition" 
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-inherit rounded-b-xl flex flex-col gap-2 items-center justify-center">
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
              to="/criar-conta"
              className="text-base text-blue-700 hover:text-blue-600 transition"
            >
              Ainda não tem conta?
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="bg-transparent text-lg font-medium text-blue-800 hover:text-blue-800  hover:cursor-pointer"
            >
              Quero ser um administrador
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}