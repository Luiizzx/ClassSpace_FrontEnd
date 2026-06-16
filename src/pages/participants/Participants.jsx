import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import { useAuth } from "../../features/auth/AuthContext";
import { roles } from "../../constants/roles";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Participants(){
  const { user, loading: loadingUser } = useAuth();
  const { classId } = useParams();

  const [participants, setParticipants] = useState({ teacher: null, students: [], className: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadParticipants(){
      setLoading(true);

      try{
        const result = await fetchBuilder("GET", `/class/getParticipants/${classId}?role=${user.role}`);
        const data = await result.json();
        
        let teacher;

        if (user.role == roles.TEACHER){
          teacher = { name: user.name, email: user.email }; 
        }
        else{ teacher = data.teacher; }

        setParticipants({ teacher: teacher, students: data.students, className: data.className }); 
      }
      catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    }
    loadParticipants();
  }, []);
  
  return (
  <div className="w-full h-full flex flex-col items-center">

    <div className="bg-linear-to-r from-blue-950 to-blue-800 w-10/12 lg:w-3/4 h-20 mt-2 mb-3 rounded-lg flex items-center justify-center">
      <h1 className="text-3xl text-white">{participants.className}</h1>
    </div>

    <div className="w-10/12 lg:w-3/4 border-b border-gray-600 flex flex-row items-center justify-center text-gray-900">
      <Link
        to={`/posts/${classId}`}
      >
        <ChevronLeft size={32} strokeWidth={1}/>
      </Link>
      <div className="flex flex-1 items-center justify-center">
        <h2 className="text-2xl ">Participantes</h2>

      </div>

      <Link
        to={`/assignments/${classId}`}
      >
        <ChevronRight size={32} strokeWidth={1}/>
      </Link>
    </div>

    {participants.teacher &&
      <>
        <div className="flex items-center justify-start w-10/12 lg:w-3/4">
          <p className="mt-3 text-lg font-medium text-gray-900">
            Professor
          </p>
        </div>

        <div 
          className="flex flex-row items-center gap-3 px-4 py-3 lg:py-5 rounded-md w-10/12 lg:w-3/4 bg-gray-200 border border-gray-400"
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

    {participants.students.length > 0 && !loading && (
      <>
        <div className="flex items-center justify-start w-10/12 lg:w-3/4">
          <p className="mt-3 text-lg font-medium text-gray-900">
            Alunos ({participants.students.length})
          </p>
        </div>

        <ul className="w-10/12 lg:w-3/4 flex flex-col gap-2">
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
    )}
  </div>
  )
}