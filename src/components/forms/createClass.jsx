import { X } from "lucide-react";
import { useState } from "react";
import { fetchBuilder } from "../../services/fetchBuilder";

export function CreateClass({ loading, teacherId, setLoading, setClasses, setOpen }) {
  const [form, setForm] = useState({ teacherId: teacherId, name: "", code: "", post: "" });

    async function createNewClass(){
    setLoading(true);

    try{
      // deve receber de volta o ID da turma criada pra criar postagem
      const result = await fetchBuilder("POST", "/class/create", form); 

      if(result.ok){
        setClasses(prev => [...prev, form]);
      }
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
      setOpen(prev => ({ ...prev, create: false }));
    }
  }

  const canCreate = !loading && form.name.length >= 8 && form.code.length >= 4;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-[90%] max-w-sm overflow-hidden border border-gray-200">

        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <p className="text-base font-medium text-gray-800">Nova turma</p>
          <button onClick={() => setOpen(prev => ({ ...prev, create: false }))} className="text-gray-800">
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5 min-h-100 mt-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Nome da turma</label>
            <input
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              value={form.name}
              minLength={8}
              maxLength={30}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none 
                focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-400 text-right">{form.name.length}/30</span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Código da turma</label>
            <input
              onChange={(e) => setForm(prev => ({ ...prev, code: e.target.value }))}
              value={form.code}
              minLength={4}
              maxLength={10}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none 
                focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-400 text-right">{form.code.length}/10</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-600">Postagem inicial</label>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Opcional</span>
            </div>
            <input
              maxLength={120}
              placeholder="Compartilhe algo com a turma"
              onChange={(e) => setForm(prev => ({ ...prev, post: e.target.value }))}
              value={form.post}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 
                focus:ring-blue-500"
            />
            <span className="text-xs text-gray-400">Se preenchido, uma postagem será criada junto com a turma.</span>
          </div>

        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-200">
          <button
            onClick={() => setOpen(prev => ({...prev, create: false }))}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            disabled={!canCreate}
            onClick={() => createNewClass(form)}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 
              disabled:cursor-not-allowed"
          >
            Criar turma
          </button>
        </div>
      </div>
    </div>
  );
}