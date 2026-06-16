import { useState } from "react";
import { fetchBuilder } from "../../services/fetchBuilder";
import { X } from "lucide-react";

export function AddClass({ studentId, loading, setLoading, setClasses, setOpen }) {
  const [code, setCode] = useState("");

  async function addNewClass(){
    setLoading(true);
    
    try{
      const result = await fetchBuilder("POST", "/enrollment/create", { studentId, code });
      

      if(result.ok){
        const data = await result.json();
        console.log(data);
        
        setClasses(prev => ([ ...prev, data.data ]));
      }
    }
    catch(error){
      console.log(error.message);
    }
    finally{
      setOpen(prev => ({ ...prev, add: false }));
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="flex flex-col rounded-md py-4 px-4 bg-white shadow-lg w-80">
        <div className="w-full flex flex-row border-b border-gray-300 pl-2 pb-2">
          <p className="text-gray-700">Entrar na turma</p>
          
          <div className="flex flex-1 items-center justify-end">
            <button
              className="text-gray-700"
              onClick={() => setOpen(prev => ({ ...prev, add: false }))}
            >
              <X />
            </button>
          </div>

        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2 mt-3">
          <p className="text-gray-500 text-center">
            Digite o código de uma turma para acessar seus módulos
          </p>

          <input
            className="border border-gray-300 rounded-md px-2 py-1 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            minLength={4}
            maxLength={10}
          />

          <button
            disabled={code.length < 4 || loading}
            onClick={addNewClass}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md w-full transition disabled:bg-gray-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}