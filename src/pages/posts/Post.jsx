import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import { NoContentWarning } from "../../components/noContentWarning";
import { ChevronLeft, Loader2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import { ReplyCard } from "../../components/cards/replyCard";
import toast from "react-hot-toast";
import { CreateReply } from "../../components/dialogs/createReply";
import { useAuth } from "../../features/auth/AuthContext";
import { PageTitleCard } from "../../components/cards/pageTitleCard";

export function Post(){
  const { user, loading: loadingUser} = useAuth();
  const { classId, postId } = useParams();
  
  const [post, setPost] = useState({ content: null, replies: [], user: null });
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    
    async function loadPost(){
      setLoading(true);

      const result = await fetchBuilder("GET", `/post/getPost/${classId}/${postId}`);
      const data = await result.json();

      if(result.ok){
        setPost({ content: data.post, replies: data.replies, user: data.user });
      }
      else{ toast.error(data.message); }

      setLoading(false);
    }

    loadPost();
  }, []);

  const postNotFound = !loading && !post.user;

  return(
    <div className="w-full h-full flex flex-col items-center">
      {open &&
        <CreateReply
          userId={user.id}
          classId={classId}
          postId={postId}
          userName={user.name}
          setOpen={setOpen}
          setPost={setPost}
        />
      }

      {loading && !post.user ? 
        (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        : postNotFound ?
        (
          <NoContentWarning 
            title={"Postagem não encontrada"}
            subText={"Não existe postagem com esse ID."}
          />
        )
        :
        (
          <div className="flex flex-col items-center w-full">
            <PageTitleCard title={`Postagem de ${post.user.name}`} backTo={`/posts/${classId}`}/>

            <div className="flex flex-col rounded-md w-10/12 lg:w-3/4 border border-gray-400 shadow-lg">
              <div className="flex flex-col items-start justify-start w-full pl-2 py-2 border-b border-gray-400 bg-gray-200 rounded-t-md">
                <span className="text-gray-900">{post.user.name}</span>
                <p className="text-xs md:text-base font-medium text-gray-800">Em {formatDate(post.content.createdAt)}</p>
              </div>

              <div className="flex items-center justify-start w-full pl-2 py-4">
                <p className="text-sm md:text-lg text-gray-900 font-medium">{post.content.text}</p>
              </div>

              <div className="flex items-center py-2 pr-2 justify-end w-full border-t border-gray-400 rounded-b-md">
                <button 
                  onClick={() => setOpen(true)}
                  className="text-sm md:text-base text-blue-700 font-medium py-1 px-2 rounded-xl bg-blue-300 hover:cursor-pointer"
                >
                  Responder
                </button>
              </div>
            </div>

            <div className="flex items-center justify-start w-10/12 lg:w-3/4 border-b border-gray-900 mt-2">
              {post.replies.length > 0 &&
                <p className="text-gray-900 font-medium">Respostas ({post.replies.length})</p>
              }
            </div>

            {post.replies.length == 0 ? 
              (
                <div>

                </div>
              )
              :
              (
                <div className="flex flex-col gap-2 items-center justify-center w-10/12 lg:w-3/4 mt-2 pb-4">
                  {post.replies.map((reply, index) => (
                    <ReplyCard 
                      key={index}
                      reply={reply}
                    />
                  ))}
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
}