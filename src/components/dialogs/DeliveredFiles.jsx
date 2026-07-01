import { Download, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import { formatFileName } from "../../utils/formatName";
import { downloadFile } from "../../services/downloadFile";
import { downloads } from "../../constants/downloadType";
import toast from "react-hot-toast";
import { fetchBuilder } from "../../services/fetchBuilder";

export function DeliveredFiles({ userId, classId, delivery, files, setDeliveries, loading, setOpen, setPreview }){

  const [score, setScore] = useState({ 
    oldScore: delivery.score ?? "", 
    newScore: delivery.score ?? ""  
  });

  const [submitting, setSubmitting] = useState(false);

  function validateScore(value) {
    if (/^\d{0,2}(\.\d?)?$/.test(value)) {
      const num = parseFloat(value);
      if (value === '' || value === '.' || (num >= 0 && num <= 10)) {
        setScore(prev => ({ ...prev, newScore: value }));
      }
    }
  }

  async function updateScore(){
    setSubmitting(true);

    try{
      const result = await fetchBuilder("PUT", `/delivery/updateScore/${delivery.id}`, 
        { userId, classId: Number(classId), score: Number(score.newScore) });

      if(result.status !== 204 || !result.ok){
        toast.error("Erro ao tentar atualizar pontuação do aluno");

        return;
      }

      setDeliveries(prev => ({ ...prev, list: prev.list.map(d => d.id === delivery.id ? { ...d, score: Number(score.newScore) }: d) })
      );

      toast.success("Pontuação atualizada");
      setOpen(false);
    }
    catch{
      toast.error("Erro ao tentar atualizar pontuação do aluno");
    }
    finally{
      setSubmitting(false);
    }
  }

  const canUpdate = score.newScore && !submitting && score.newScore <= 10 && score.newScore !== score.oldScore;

  return(  
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex flex-row w-full items-center mb-4">
              <h2 className="text-xl font-semibold">
                {delivery.student.user.name}
              </h2>

              <span className="flex flex-1 justify-end">
                <button
                  disabled={submitting}
                  onClick={() => setOpen(false)}
                >
                  <X />
                </button>
              </span>
            </div>

            <div className="space-y-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between rounded-md border p-3"
                >
                  <span>{formatFileName(file.fileName)}</span>

                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => downloadFile(file.id, downloads.DELIVERY)}
                      className="bg-gray-600 text-white rounded-xl h-10 w-10 flex items-center justify-center hover:cursor-pointer"
                    >
                      <Download />
                    </button>

                    <button 
                      onClick={() => setPreview({ open: true, file: file })}
                      className="bg-blue-700 text-white rounded-xl h-10 w-10 flex items-center justify-center hover:cursor-pointer"
                    >
                      <File />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-row items-center justify-end gap-3 mt-6">
              <label htmlFor="studentScore" className="font-medium">
                Score:
              </label>

              <input
                value={score.newScore}
                onChange={(e) => validateScore(e.target.value)}
                minLength={1}
                maxLength={3}
                className="w-10 rounded-md border px-1 py-1"
                placeholder="0-10"
              />

              <button
                disabled={!canUpdate}
                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-gray-600"
                onClick={updateScore}
              >
                Confirmar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}