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
import { formatFileName } from "../../utils/formatName";
import { downloads } from "../../constants/downloadType";
import { FilePreview } from "../../components/filePreview/filePreview";
import { roles } from "../../constants/roles";

export function Post(){
  const { user, loading: loadingUser} = useAuth();
  const { classId, postId } = useParams();
  
  const [post, setPost] = useState({ content: null, replies: [], user: null });
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState({ open: false, file: null });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    
    async function loadPost(){
      setLoading(true);
      try{
        const result = await fetchBuilder("GET", `/post/getPost/${classId}/${postId}`);
        
        if(result.ok){
          const data = await result.json();
          setPost({ content: data.post, replies: data.replies, user: data.user });

          return;
        }
      
        toast.error("Erro ao carregar postagem"); 
      }
      catch{
        toast.error("Erro ao carregar postagem");
      }
      finally{
        setLoading(false);
      }
    }

    loadPost();
  }, []);

  const postNotFound = !loading && !post.user;

  return(
    <div className="w-10/12 lg:w-3/4 min-h-full flex flex-col items-center">
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

      {preview.open &&
        <FilePreview
          file={preview.file}
          type={downloads.POST}
          onClose={() => setPreview({open: false, file: null })}
        />
      }

      {loading && !post.user ? 
        (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        : postNotFound ?
        (
          <section className="flex flex-1 items-center justify-center">
            <NoContentWarning 
              backTo={`/posts/${classId}`}
              title={"Postagem não encontrada"}
              subText={"Não existe postagem com esse ID."}
            />
          </section>
        )
        :
        (
          <div className="flex flex-col items-center w-full">
            <PageTitleCard title="Postagem" backTo={`/posts/${classId}`}/>

            <div className="flex flex-col rounded-md w-full border border-gray-400 shadow-lg mt-2">
              <div className="flex flex-col items-start justify-start w-full pl-2 py-2 border-b border-gray-400 bg-gray-200 rounded-t-md">
                <span className="text-gray-900">{post.user.name}</span>
                <p className="text-xs md:text-base font-medium text-gray-800">Em {formatDate(post.content.createdAt)}</p>
              </div>

              <div className="flex flex-col gap-2 items-start justify-start w-full pl-2 py-4">
                <p className="text-sm md:text-lg text-gray-900 font-medium">{post.content.text}</p>

                {post.content.files.length > 0 &&
                  <div className="flex flex-row items-center gap-2">
                    {post.content.files.map((file, index) => (
                      <button 
                        key={index}
                        className="rounded-xl px-2 py-1 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer"
                        onClick={() => setPreview({ open: true, file: file })}
                      >
                        {formatFileName(file.fileName)}
                      </button>
                    ))}
                  </div>
                }
              </div>

              <div className="flex items-center py-2 pr-2 justify-end w-full border-t border-gray-400 rounded-b-md">
                {user.role !== roles.ADMIN &&
                  <button 
                    onClick={() => setOpen(true)}
                    className="text-sm md:text-base text-blue-700 font-medium py-1 px-2 rounded-xl bg-blue-300 hover:cursor-pointer"
                  >
                    Responder
                  </button>
                }
              </div>
            </div>

            <div className="flex items-center justify-start w-full border-b border-gray-900 mt-2">
              {post.replies.length > 0 &&
                <p className="text-gray-900 font-medium">Respostas ({post.replies.length})</p>
              }
            </div>

            {post.replies.length == 0 ? 
              (
                <p className="text-gray-600 mt-2">
                  Sem respostas até o momento
                </p>
              )
              :
              (
                <div className="flex flex-col gap-2 items-center justify-center w-full mt-2 pb-4">
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