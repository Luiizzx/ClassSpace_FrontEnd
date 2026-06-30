import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import { useAuth } from "../../features/auth/AuthContext";
import { roles } from "../../constants/roles";
import { ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import toast from "react-hot-toast";
import { NoContentWarning } from "../../components/noContentWarning";
import { PageTitleCard } from "../../components/cards/pageTitleCard";
import { PageNavigationSection } from "../../components/layout/pageNavigationSection";

export function Participants(){
  const { user, loading: loadingUser } = useAuth();
  const { classId } = useParams();

  const [participants, setParticipants] = useState({ teacher: null, students: [], className: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadParticipants(){
      setLoading(true);
      
      const result = await fetchBuilder("GET", `/class/getParticipants/${classId}?role=${user.role}`);
      const data = await result.json();
      
      if (!result.ok){
        toast.error(data.message);
        
        setLoading(false);
        return;
      }
      
      let teacher;

      if (user.role == roles.TEACHER){
        teacher = { name: user.name, email: user.email }; 
      }
      else{ teacher = data.teacher; }

      setParticipants({ teacher: teacher, students: data.students, className: data.className }); 
      setLoading(false);
    }
    
    loadParticipants();
  }, []);

  const classNotFound = !loading && participants.className === "";
  
  return (
    <div className="w-10/12 lg:w-3/4 min-h-full flex flex-col items-center">

      {classNotFound ? (
        <NoContentWarning 
          title={"Turma não encontrada"}
          subText={"Não existe nenhuma turma com este ID."}
        />
      ) : (
        <>
          <PageTitleCard title={participants.className}/>

          <PageNavigationSection
            sectionTitle={"Participantes"}
            leftRoute={`/posts/${classId}`}
            rightRoute={`/assignments/${classId}`}
          />

          {participants.teacher &&
            <>
              <div className="flex items-center justify-start w-full">
                <p className="mt-3 text-lg font-medium text-gray-900">
                  Professor
                </p>
              </div>

              <div className="flex flex-row items-center gap-3 px-4 py-3 lg:py-5 rounded-md w-full bg-gray-200 
                border border-gray-400"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-sm font-semibold">
                  {participants.teacher.name?.charAt(0).toUpperCase()}
                </span>

                <div className="flex flex-col gap-1">
                  <p className="font-medium lg:text-xl text-gray-800">
                    {participants.teacher.name}
                  </p>

                  <a
                    href={`mailto:${participants.teacher.email}`}
                    className="text-sm lg:text-base text-blue-600 hover:underline"
                  >
                    {participants.teacher.email}
                  </a>
                </div>
              </div>
            </>
          }

          {participants.students.length > 0 && !loading ? (
            <>
              <div className="flex items-center justify-start w-full">
                <p className="mt-3 text-lg font-medium text-gray-900">
                  Alunos ({participants.students.length})
                </p>
              </div>

              <ul className="w-full flex flex-col gap-2">
                {participants.students.map((student, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 lg:py-4 rounded-md bg-gray-200 border border-gray-400"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-sm font-semibold">
                      {student.user.name?.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-medium lg:text-xl text-gray-800">{student.user.name}</span>
                  </li>
                ))}
              </ul>
            </>
          ) 
          :
          (
            <div className="flex flex-1 flex-col gap-1 items-center justify-center text-center text-lg text-gray-700 font-semibold">
              <p>Parece que você ainda é o único na turma.</p>
              <p>Compartilhe o código da turma com seus alunos!</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}