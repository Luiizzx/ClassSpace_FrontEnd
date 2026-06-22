import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";
import { useAuth } from "../../features/auth/AuthContext";
import { fetchBuilder } from "../../services/fetchBuilder";
import { CreatePost } from "../../components/dialogs/createPost";
import { PostCard } from "../../components/cards/postCard";
import { NoContentWarning } from "../../components/noContentWarning";
import { PageTitleCard } from "../../components/cards/pageTitleCard";
import { PageNavigationSection } from "../../components/pageNavigationSection";
import { CircularActionButton } from "../../components/buttons/circularActionButton";

export function PostsList(){
  const{ user, loading: loadingUser } = useAuth();
  
  const { classId } = useParams();

  const [postsList, setPostsList] = useState({ className: "", posts: [] });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function loadPosts(){
      setLoading(true);

      try {
        const result = await fetchBuilder("GET", `/post/getPosts/${classId}`);
        const data = await result.json();

        if(!result.ok){
          toast.error(data.message || "Erro ao solicitar postagens");
          return;
        }

        setPostsList({ className: data.className, posts: data.posts });
      } catch (err) {
        console.error(err);
        toast.error("Erro ao solicitar postagens");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [classId]);

  const classNotFound = !loading && postsList.className === "";

  return(
    <div className="w-full min-h-full flex flex-col items-center">
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
              <div className="flex flex-col gap-2 items-center justify-center w-10/12 lg:w-3/4 mt-4 pb-4">
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
              <NoContentWarning 
                title={"Sem postagens até o momento."}
                subText={"Faça uma postagem para se comunicar com seus colegas!"}
              />
            }
          </>
        )
      }
      {!classNotFound &&
        <CircularActionButton onClick={() => setOpen(true)} tooltip={"Criar nova postagem"} />
      }
    </div>
  );
}