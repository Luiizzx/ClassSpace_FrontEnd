import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { fetchBuilder } from "../../services/fetchBuilder";
import { File, HardDriveDownload, Loader2 } from "lucide-react";
import { NoContentWarning } from "../../components/noContentWarning";
import { PageTitleCard } from "../../components/cards/pageTitleCard";
import { DeliveredFiles } from "../../components/dialogs/DeliveredFiles";
import { FilePreview } from "../../components/filePreview/filePreview";

export function Deliveries(){
  const { user, loading: loadingUser } = useAuth();
  const { classId, assignmentId } = useParams();

  const [deliveries, setDeliveries] = useState({ assignmentName: "", list: [] });
  const [delivery, setDelivery] = useState({ data: { }, files: [] });

  const [loading, setLoading] = useState(true);

  // studentId pra fazer fetch dos anexos
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState({ open: true, file: null });

  async function requestDeliveryFiles(id){
    setDelivery({ data: deliveries.list.find(d => d.id == id), files: [] });

    setOpen(true)
    setLoading(true);

    try{
      const result = await fetchBuilder("GET", `/delivery/getDelivery/${id}?userId=${user.id}`);

      if(!result.ok){
        toast.error("Erro ao tentar recuperar arquivos");

        setLoading(false);
        return;
      }

      if(result.status == 204){
        return;
      }

      const data = await result.json();
      setDelivery(prev => ({ ...prev, files: data }));
    }
    catch{
      toast.error("Erro ao tentar recuperar arquivos");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadDeliveries(){
      try{
        const result = await fetchBuilder("GET", `/deliveries/getAllDeliveries/${assignmentId}?userId=${user.id}`);

        if(result.status == 204){
          toast("Nennhum aluno entregou a tarefa até o momento");
          setLoading(false);

          return;
        }

        if(result.ok){
          const data = await result.json();
          setDeliveries({ assignmentName: data.assignmentName, list: data.deliveries });

          setLoading(false);
          return;
        }

        toast.error("Erro ao tentar recuperar entregas da tarefa");
      }
      catch{
        toast.error("Erro ao tentar recuperar entregas da tarefa");
      }
      finally{
        setLoading(false);
      }
    }

    loadDeliveries();
  }, []);

  const assignmentNotFound = !loading && !loadingUser && deliveries.assignmentName == "";

  return(
    <div className="w-10/12 lg:w-3/4 min-h-full flex flex-col items-center">
      {open &&
        <DeliveredFiles 
          classId={classId}
          userId={user.id}
          loading={loading}
          delivery={delivery.data}
          files={delivery.files}
          setDeliveries={setDeliveries}
          setOpen={setOpen}
          setPreview={setPreview}
        />
      }

      {preview.open &&
        <FilePreview
          file={preview.file}
          onClose={() => setPreview({ open: false, file: null })}
        />
      }

      {loading && !deliveries.assignmentName ?
        (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        : assignmentNotFound ?
        (
          <section className="w-full flex flex-1 items-center justify-center">
            <NoContentWarning
              backTo={`/assignment/${classId}/${assignmentId}`}
              title={"Tarefa não encontrada"}
              subText={"Não existe tarefa com esse ID"}
            />
          </section>
        )
        :
        (
          <>
            {deliveries.list.length == 0 ? 
              (
                <NoContentWarning
                  backTo={`/assignment/${classId}/${assignmentId}`}
                  title={"Nenhuma entrega feita"}
                  subText={"Os alunos ainda não fizeram a entrega dessa atividade"}
                />
              )
              :
              (
                <section className="w-full min-h-full flex flex-col items-center">
                  <PageTitleCard
                    title={"Entregas"}
                    backTo={`/assignment/${classId}/${assignmentId}`}
                  />

                  <ol className="w-full flex flex-col gap-1 mt-4">
                    {deliveries.list.map((delivery, index) => (
                      <li
                        key={index}
                        className="flex flex-row items-center gap-3 px-2 py-3 lg:py-4 rounded-md bg-gray-200 border border-gray-400" 
                      >
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-400 text-sm font-semibold">
                          {delivery.student.user.name.charAt(0)}
                        </span>

                        <p className="font-medium">{delivery.student.user.name}</p>

                        <span className="flex flex-1 items-center justify-end">
                          <button
                            onClick={() => requestDeliveryFiles(delivery.id)}
                            className="bg-gray-400 rounded-xl h-9 w-10 flex items-center justify-center hover:cursor-pointer"
                          >
                            <File size={20}/>
                          </button>
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              )
            }
          </>
        )
      }
    </div>
  )
}