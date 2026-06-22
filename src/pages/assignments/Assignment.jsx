import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/AuthContext"
import { useParams } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import toast from "react-hot-toast";

export function Assignment(){
  const { user, loading: loadingUser } = useAuth();
  const { classId, assignmentId } = useParams();

  const [assignment, setAssignment] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssignment(){
      try{
        const result = await fetchBuilder("GET", `/assignment/getAssignment/${classId}/${assignmentId}`);

        if(!result.ok){
          toast.error("Erro ao tentar recuperar tarefa");

          setLoading(false);
          return;
        }

        const data = await result.json();
        setAssignment(data);
      }
      catch{
        toast.error("Erro ao tentar recuperar tarefa");
      }
      finally{
        setLoading(false);
      }
    }

    loadAssignment();
  }, []);

  const assignmentNotFound = !loading && !assignment;

  return(
    <div className="w-full min-h-full flex flex-col items-center">

      {loading || loadingUser ?
        (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        : assignmentNotFound ?
        (<section className="w-full flex flex-1 items-center justify-center">
            <NoContentWarning 
              title={"Turma não encontrada"}
              subText={"Não existe turma com esse ID"}
            />
          </section>
        )
        :
        (
          <></>
        )
      }
    </div>
  )
}