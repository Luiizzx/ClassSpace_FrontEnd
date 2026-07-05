import { useEffect, useState } from "react";
import { ClassCard } from "../../components/cards/classCard";
import { Plus, RefreshCcw, Search, X } from "lucide-react";
import { useAuth } from "../../features/auth/AuthContext";
import { roles } from "../../constants/roles";
import { fetchBuilder } from "../../services/fetchBuilder";
import { CreateClass } from "../../components/forms/createClass";
import { AddClass } from "../../components/dialogs/addClass";
import toast from "react-hot-toast";

export function Home() {
  const { user, loading: loadingUser } = useAuth();

  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState({
    active: false,
    text: ""
  }); 

  const [openForm, setOpenForm] = useState({
    add: false,
    create: false
  });

  const [loading, setLoading] = useState(true);

  // form aberto depende do role do usuário
  function openForms(){
    if(user.role == roles.STUDENT){
      setOpenForm(prev => ({ ...prev, add: true }));
      return;
    }

    setOpenForm(prev => ({ ...prev, create: true }));
  }

  function onClickFn(){
    if(search.active){
      setSearch(prev => ({ ...prev, text: "" }));
      return;
    }

    openForms();
  }

  function triggerSearch(){
    if(search.active){
      setSearch({ active: false, text: "" });
      return;
    }

    setSearch(prev => ({ ...prev, active: true }));
  }
  
  useEffect(() => {
    async function loadClasses(){
      setLoading(true);
      try{
        const response = await fetchBuilder("GET", `/class/getAll/${user.id}`);

        if(response.ok){
          const data = await response.json();
          
          setClasses(data);
        }
        else{
          toast.error("Erro ao tentar carregar turmas");
        }
      }
      catch{
        toast.error("Erro ao tentar carregar turmas");
      }
      finally{
        setLoading(false);
      }
    }
    loadClasses();
  }, [user]);

  const filteredClasses = search.active && search.text
    ? classes.filter((classData) =>
        classData.name.toLowerCase().includes(search.text.toLowerCase())
      )
    : classes;
  
  const isLogged = user !== null && !loadingUser;

  return (
    <div className="w-full h-full">

      {openForm.create &&
        <CreateClass 
          teacherId={user.id}
          classes={classes}
          setClasses={setClasses}
          setOpen={setOpenForm}
        />
      }

      {openForm.add &&
        <AddClass 
          studentId={user.id}
          setClasses={setClasses}
          setOpen={setOpenForm}
        />
      }

      {classes.length > 0 && !loading ? (
        <div className="flex flex-1 flex-col items-center gap-6">
          <div className="bg-linear-to-r from-blue-950 to-blue-800 w-11/12 lg:w-3/4 h-22 rounded-lg flex flex-row justify-center mt-6">

            <div className="bg-inherit w-11/12 h-full flex items-center">
              <input
                disabled={!search.active}
                className={`${search.active ? "border-b border-white text-xl" : "border-0 font-semibold text-2xl"} text-white ml-2 
                  w-11/12 focus:outline-0`}
                value={search.active ? search.text : "Todas as turmas"}
                maxLength={30}
                onChange={(e) => setSearch(prev => ({ ...prev, text: e.target.value }))}
              />
            </div>

            <div className="h-full flex flex-row">
              <button
                onClick={onClickFn}
                className="h-full w-full flex items-center justify-end hover:cursor-pointer"
              >
                {search.active ? 
                  <RefreshCcw size={28} className="text-white mr-2" /> : 
                  user.role !== roles.ADMIN ? 
                    <Plus size={28} className="text-white mr-2" />
                    :
                    <></>
                }
              </button>

              <button
                onClick={triggerSearch}
                className="h-full w-full flex items-center justify-end hover:cursor-pointer"
              >
                {search.active ? 
                  <X size={28} className="text-white mr-2" /> : <Search size={28} className="text-white mr-2" />
                }
              </button>
            </div>
          </div>

          <div className="w-11/12 lg:w-3/4 flex flex-col items-center gap-4 pb-4">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classData, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col items-center gap-4"
                >
                  <ClassCard
                    index={index}
                    data={classData}
                  />
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-8 gap-2">
                <p className="text-gray-600 text-lg font-medium">Nenhuma turma encontrada</p>
                <p className="text-gray-500 text-sm">Tente buscar por outro nome ou código</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <div className="w-4/5 lg:w-1/2 flex flex-col justify-center text-center">
            <h1 className={`${isLogged ? "text-2xl" : "text-xl"} text-gray-800 font-bold`}>
              {!isLogged
                ? "Suas turmas aparecerão aqui após você entrar em sua conta"
                : user.role === roles.ADMIN
                  ? "Os professores da sua instituição ainda não criaram nenhuma turma."
                  : "Ainda não tem turma?"
              }
            </h1>
          </div>

          <div className="w-full flex justify-center">
            {isLogged && user.role !== roles.ADMIN &&
              <button
                onClick={openForms}
                className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 h-11 bg-gray-800 text-gray-200 flex items-center justify-center 
                gap-2 rounded-xl font-medium shadow-md transition-all duration-200 hover:bg-gray-700 hover:scale-105"
              >
                <span>{user.role == roles.STUDENT ? "Adicionar turma" : "Criar turma"}</span>
                <Plus size={18} />
              </button>
            }
          </div>
        </div>
      )}
    </div>
  )
}