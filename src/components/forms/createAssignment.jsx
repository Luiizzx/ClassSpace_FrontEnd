import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { DateField } from "../date/dateField";
import { fetchBuilder } from "../../services/fetchBuilder";
import Calendar from "../date/calendar";

export function CreateAssignment({ classId, setAssignments, setOpen }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    dueDate: null,
  });

  const [loading, setLoading] = useState(false);

  async function createNewAssignment() {
    setLoading(true);
    try {
      
      const result = await fetchBuilder("POST", `/assignment/createAssignment/${classId}`, { classId, ...form });

      if (result.status !== 201) {
        toast.error("Erro ao tentar criar tarefa");
        return;
      }
      
      const data = await result.json();

      setAssignments(prev => ({ ...prev, assignments: [...prev.assignments, data] }));
      toast.success("Tarefa adicionada com sucesso");
    } 
    catch {
      toast.error("Erro ao tentar criar tarefa");
    } 
    finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const canCreate = !loading && form.name && form.startDate && form.dueDate;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl w-full max-w-sm overflow-visible border border-gray-200 shadow-xl">

        {/* header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <p className="text-base font-semibold text-gray-800">Nova tarefa</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800 hover:cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Nome da tarefa</label>
            <input
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              value={form.name}
              maxLength={60}
              placeholder="Ex: Lista de exercícios"
              className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-gray-50 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-400 text-right">{form.name.length}/60</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-600">Descrição</label>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                Opcional
              </span>
            </div>
            <textarea
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              value={form.description}
              maxLength={300}
              rows={3}
              placeholder="Instruções ou detalhes adicionais..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm resize-none
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-400 text-right">{form.description.length}/300</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <DateField
                label="Data de início"
                minDate={new Date()}
                value={form.startDate}
                onChange={date => {
                  setForm(prev => ({
                    ...prev,
                    startDate: date,
                    dueDate: prev.dueDate && prev.dueDate < date ? null : prev.dueDate,
                  }));
                }}
              />
            </div>
            <div className="relative">
              <DateField
                label="Data de entrega"
                value={form.dueDate}
                minDate={form.startDate}
                onChange={date => setForm(prev => ({ ...prev, dueDate: date }))}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={!canCreate}
            onClick={createNewAssignment}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700
              disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Criando..." : "Criar tarefa"}
          </button>
        </div>
      </div>
    </div>
  );
}