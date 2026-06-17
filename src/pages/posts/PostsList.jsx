import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { fetchBuilder } from "../../services/fetchBuilder";
import { ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";
import { CreatePost } from "../../components/forms/createPost";
import { PostCard } from "../../components/cards/postCard";
import toast from "react-hot-toast";
import { NoContentWarning } from "../../components/noContentWarning";

export function PostsList(){
  const{ user, loading: loadingUser } = useAuth();
  
  const { classId } = useParams();

  const [postsList, setPostsList] = useState({ className: "", posts: [] });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function loadPosts(){
      setLoading(true);

      const result = await fetchBuilder("GET", `/post/getPosts/${classId}`);
      const data = await result.json();

      if(result.ok){
        setPostsList({ className: data.className, posts: data.posts});
      }
      else{
        toast.error(data.message);
      }
      setLoading(false);
    }

    loadPosts();
  }, []);

  const classNotFound = !loading && postsList.className === "";

  return(
    <div className="w-full h-full flex flex-col items-center">
      {open &&
        <CreatePost 
          userId={user.id}
          classId={classId}
          setPosts={setPostsList}
          setOpen={setOpen}
        />
      }

      {loading && postsList.className == "" ? 
        (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        : classNotFound ?
        (
          <NoContentWarning 
            title={"Turma não encontrada"}
            subText={"Não existe turma com esse ID"}
          />
        )
        :
        (
          <>
            <div className="bg-linear-to-r from-blue-950 to-blue-800 w-10/12 lg:w-3/4 h-20 mt-2 mb-3 rounded-lg flex
              items-center justify-center pl-2 pr-2"
            >
              <h1 className="text-3xl text-white">{postsList.className}</h1>
            </div>

            <div className="w-10/12 lg:w-2/3 border-b border-gray-600 flex flex-row items-center justify-center text-gray-900">
              <Link
                to={`/assignments/${classId}`}
              >
                <ChevronLeft size={32} strokeWidth={1}/>
              </Link>
              <div className="flex flex-1 items-center justify-center py-1">
                <h2 className="text-2xl">Postagens</h2>
              </div>

              <Link
                to={`/participants/${classId}`}
              >
                <ChevronRight size={32} strokeWidth={1}/>
              </Link>
            </div>

            {postsList.posts.length > 0 ? 
              <div className="flex flex-col gap-2 items-center justify-center w-full mt-4">
                {postsList.posts.map((post, index) => (
                  <PostCard 
                    key={index}
                    data={post}
                    postId={post.id}
                    classId={classId}
                  />
                ))}
              </div>
              :
              <div className="flex flex-1 flex-col gap-1 items-center justify-center text-center text-lg text-gray-700 font-semibold">
                <p>Sem postagens até o momento.</p>
                <p>Faça uma postagem para se comunicar com seus colegas!</p>
              </div>
            }
          </>
        )
      }
      {!classNotFound &&
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-10 right-4 flex items-center justify-center w-14 h-14 rounded-full border border-blue-700
            hover:scale-105 hover:cursor-pointer"
        >
          <Plus size={32} className="text-blue-700" />
        </button>
      }
    </div>
  );
}