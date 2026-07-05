import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PageNavigationSection } from "../../components/layout/pageNavigationSection";
import { PageTitleCard } from "../../components/cards/pageTitleCard";
import { ChevronRightCircle, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { fetchBuilder } from "../../services/fetchBuilder";
import { NoContentWarning } from "../../components/noContentWarning";

export function Statistics(){
  const { user, loading: loadingUser } = useAuth();
  const { classId } = useParams();

  const [stats, setStats] = useState({ info: {}, className: "" });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStats(){
      try{
        const result = await fetchBuilder("GET", `/stats/${classId}?userId=${user.id}`);

        if(result.ok){
          const data = await result.json();
          setStats({ info: data.info, className: data.className });
        }
        else{
          toast.error("Erro ao carregar estatísticas da turma");
        }

      }
      catch{
        toast.error("Erro ao carregar estatísticas da turma");
      }
      finally{
        setLoading(false);
      }
    }

    loadStats();
  }, [user]);


  const classNotFound = !loading && stats.className === "";

  const lowestScore = !loading && stats.info.deliveries.length > 1 ? stats.info.deliveries[0].score : 0;
  const highestScore = !loading ? stats.info.deliveries[stats.info.deliveries.length - 1].score : 0;

  const maxDeliveries = !loading && stats.info.totalStudents * stats.info.totalAssignments;

  return(
    <div className="w-10/12 lg:w-3/4 min-h-full flex flex-col items-center">

      {loading || loadingUser ?
        (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        : classNotFound ?
        (
          <section className="w-full flex flex-1 items-center justify-center">
            <NoContentWarning 
              backTo={"/"}
              title={"Turma não encontrada"}
              subText={"Não existe turma com esse ID"}
            />
          </section>
        )
        :
        (
          <>
            <PageTitleCard 
              backTo={"/"}
              title={stats.className}
            />

            <PageNavigationSection 
              sectionTitle={"Estatísticas"}
              leftRoute={`/assignments/${classId}`}
              rightRoute={`/posts/${classId}`}
            />

            <section className="w-full h-3/5 mt-4 bg-gray-100 rounded-xl shadow-md border border-gray-300 p-6 flex flex-col 
              justify-center gap-6"
            >
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <p className="text-lg font-medium text-gray-800">
                  Número de alunos:{" "}
                  <span className="font-bold text-blue-700">
                    {stats.info.totalStudents}
                  </span>
                </p>

                <Link
                  to={`/participants/${classId}`}
                  className="p-1 rounded-full text-gray-500 hover:text-blue-700 hover:bg-blue-50 transition"
                >
                  <ChevronRightCircle size={24} />
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-lg text-gray-700">
                  Nota mais alta:{" "}
                  <span className="font-semibold text-green-600">
                    {highestScore}
                  </span>
                </p>

                <p className="text-lg text-gray-700">
                  Nota mais baixa:{" "}
                  <span className="font-semibold text-red-600">
                    {lowestScore}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4 rounded-b-xl">
                <p className="text-lg font-medium text-gray-800">
                  Total de entregas:{" "}
                  <span className="font-bold text-blue-700">
                    {stats.info.deliveries.length}/{maxDeliveries}
                  </span>
                </p>

                <Link
                  to={`/assignments/${classId}`}
                  className="p-1 rounded-full text-gray-500 hover:text-blue-700 hover:bg-blue-50 transition"
                >
                  <ChevronRightCircle size={24} />
                </Link>
              </div>
            </section>
          </>
        )   
      }

    </div>
  )
}