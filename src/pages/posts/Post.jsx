import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import toast from "react-hot-toast";
import { NoContentWarning } from "../../components/noContentWarning";
import { Loader2 } from "lucide-react";

export function Post(){
  const { classId, postId } = useParams();
  
  const [post, setPost] = useState({ content: null, replies: [], user: null });
  const [loading, setLoading] = useState(false);

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
            <div className="bg-linear-to-r from-blue-950 to-blue-800 w-10/12 lg:w-3/4 h-20 mt-2 mb-3 rounded-lg flex
              items-center justify-center pl-2 pr-2"
            >
              <h1 className="text-xl font-medium text-white">Postagem de {post.user.name}</h1>
            </div>

            <div>
              
            </div>
          </div>
        )
      }

    </div>
  );
}