import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { fetchBuilder } from "../../services/fetchBuilder";
import { File, HardDriveDownload, Loader2 } from "lucide-react";
import { NoContentWarning } from "../../components/noContentWarning";
import { PageTitleCard } from "../../components/cards/pageTitleCard";

export function Deliveries(){
  const { user, loading: loadingUser } = useAuth();
  const { classId, assignmentId } = useParams();

  const [deliveries, setDeliveries] = useState({ assignmentName: "", list: []});
  const [loading, setLoading] = useState(true);

  // studentId pra fazer fetch dos anexos
  const [dialog, setDialog] = useState({ open: true, studentId: null });

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
    <div className="w-full min-h-full flex flex-col items-center">
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

                  <ol className="w-10/12 lg:w-3/4 flex flex-col gap-1">
                    {deliveries.list.map((delivery, index) => (
                      <li
                        key={index}
                        className="flex flex-row items-center gap-3 px-2 py-3 lg:py-4 rounded-md bg-gray-200 border border-gray-400" 
                      >
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-400 text-sm font-semibold">
                          {delivery.student.user.name.charAt(0)}
                        </span>

                        <p>{delivery.student.user.name}</p>

                        <span className="flex flex-1 items-center justify-end">
                          <button
                            onClick={() => setDialog({ open: true, studentId: delivery.student.id })}
                            className="bg-gray-400 rounded-xl h-9 w-10 flex items-center justify-center"
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