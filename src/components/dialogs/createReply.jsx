import toast from "react-hot-toast";
import { fetchBuilder } from "../../services/fetchBuilder";
import { useState } from "react";
import { X } from "lucide-react";

export function CreateReply({ userId, userName, classId, postId, setPost, setOpen }){
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNewReply() {
    setLoading(true);

    const result = await fetchBuilder("POST", `/post/replyPost/${classId}/${postId}`, { userId, text: reply });

    if(!result.ok){
      toast.error("Erro ao tentar criar resposta");

      setLoading(false);
      return;
    }
      
    const newReply = { name: userName, text: reply, submittedAt: new Date() };
    setPost(prev => ({ ...prev, replies: [...prev.replies, newReply] }));
    
    setLoading(false);
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-[90%] max-w-sm overflow-hidden border border-gray-200">

        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <p className="text-base font-medium text-gray-800">Adicionar resposta</p>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-4">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Escreva uma resposta..."
            rows={5}
            className="w-full resize-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-200">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={createNewReply}
            disabled={reply.length < 10 || loading}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 
              disabled:cursor-not-allowed transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}