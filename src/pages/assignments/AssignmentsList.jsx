import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/AuthContext";
import { Loader2, Plus } from "lucide-react";
import { PageTitleCard } from "../../components/cards/pageTitleCard";
import { PageNavigationSection } from "../../components/pageNavigationSection";
import { useParams } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import toast from "react-hot-toast";
import { NoContentWarning } from "../../components/noContentWarning";
import { roles } from "../../constants/roles";
import { CircularActionButton } from "../../components/buttons/circularActionButton";
import { CreateAssignment } from "../../components/forms/createAssignment";
import { AssignmentCard } from "../../components/cards/assignmentCard";

export function AssignmentsList(){
  const { user, loading: loadingUser } = useAuth();
  
  const { classId } = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [assignmentsList, setAssignmentsList] = useState({ className: "", assignments: [] });

  useEffect(() => {
    async function loadAssignments(){
      try {
        const result = await fetchBuilder("GET", `/assignment/getAssignments/${classId}`);
        const data = await result.json();

        if(!result.ok){
          toast.error(data.message || "Erro ao solicitar tarefas");
          return;
        }
        setAssignmentsList({ className: data.className, assignments: data.assignments });

      } 
      catch {
        toast.error("Erro ao solicitar tarefas");
      } 
      finally {
        setLoading(false);
      }
    }

    loadAssignments();
  }, [classId]);

  const classNotFound = !loading && assignmentsList.className === "";

  return(
    <div className="w-full min-h-full flex flex-col items-center">
      
      {open &&
        <CreateAssignment 
          classId={classId}
          setOpen={setOpen}
          setAssignments={setAssignmentsList}
        />
      }

      {loading || loadingUser ?
        (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        : classNotFound ?
        (<section className="w-full flex flex-1 items-center justify-center">
            <NoContentWarning 
              title={"Turma não encontrada"}
              subText={"Não existe turma com esse ID"}
            />
          </section>
        )
        :
        (
          <>
            <PageTitleCard title={assignmentsList.className}/>

            <PageNavigationSection 
              sectionTitle={"Tarefas"}
              leftRoute={`/participants/${classId}`}
              rightRoute={`/posts/${classId}`}
            />

            <>
              {assignmentsList.assignments.length === 0 ? (
                <section className="flex flex-1 items-center justify-center">
                  <NoContentWarning 
                    title={"Não há nenhuma tarefa para essa turma"} 
                    subText={user.role == roles.STUDENT ? 
                      "Seu professor ainda não cadastrou nenhuma tarefa" : "Você ainda não cadastrou nenhuma tarefa"
                    }
                  />
                </section>

              ) : (
                <div className="w-10/12 lg:w-3/4 h-full gap-4 mt-4 flex flex-col items-center">
                  {assignmentsList.assignments.map((assignment, index) => (
                    <AssignmentCard 
                      key={index}
                      data={assignment}
                    />
                  ))}
                </div>
              )}
            </>
          </>
        )   
      }
      {!classNotFound &&
        <CircularActionButton 
          onClick={() => setOpen(true)} 
          tooltip={"Criar nova tarefa"} 
        />
      }
    </div>
  );
}