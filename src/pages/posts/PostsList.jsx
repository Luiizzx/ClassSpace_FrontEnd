import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { fetchBuilder } from "../../services/fetchBuilder";
import { ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";
import { CreatePost } from "../../components/dialogs/createPost";
import { PostCard } from "../../components/cards/postCard";
import toast from "react-hot-toast";
import { NoContentWarning } from "../../components/noContentWarning";
import { PageTitleCard } from "../../components/cards/pageTitleCard";
import { PageNavigationSection } from "../../components/pageNavigationSection";

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
            <PageTitleCard title={postsList.className}/>
            
            <PageNavigationSection 
              sectionTitle={"Postagens"} 
              leftRoute={`/assignments/${classId}`} 
              rightRoute={`/participants/${classId}`}
            />

            {postsList.posts.length > 0 ? 
              <div className="flex flex-col gap-2 items-center justify-center w-10/12 lg:w-3/4 mt-4">
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