import { useState } from "react";
import { fetchBuilder } from "../../services/fetchBuilder";
import toast from "react-hot-toast";
import { useRef } from "react";
import { X, File as FileIcon, Paperclip } from "lucide-react";
import { uploadFiles } from "../../services/uploadFiles";

export function CreatePost({ userId, userName, classId, setPosts, setOpen }) {

  const fileInputRef = useRef(null);

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState([]);

  function onFileSelection(e) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFiles(prev => ([...prev, selectedFile]));

    e.target.value = "";
  }

  async function createNewPost() {
    setLoading(true);
    try{
      let uploadedFiles = [];
      
      if(files.length > 0){
        uploadedFiles = await uploadFiles(files, userId); 
      }

      const result = await fetchBuilder("POST", `/post/createPost/${classId}`, { userId, text: post, files: uploadedFiles });

      if(!result.ok){
        toast.error("Erro ao tentar criar postagem");

        setLoading(false);
        return;
      }
    
      const data = await result.json();
      const newPost = { user: { name: userName }, id: data.id,text: post, createdAt: new Date(), files: files };

      setPosts(prev => ({ ...prev, posts: [...prev.posts, newPost] }));
      setOpen(false);

      toast.success("Postagem criada com sucesso");
    }
    catch{
      toast.error("Erro ao tentar criar postagem");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-[90%] max-w-sm overflow-hidden border border-gray-200">

        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <p className="text-base font-medium text-gray-800">Nova postagem</p>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-4">
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Escreva algo para a turma..."
            rows={5}
            className="w-full resize-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="px-5 pb-4">
          {files.length > 0 && (
            <div className="flex flex-col gap-2 mb-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <FileIcon size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-700 truncate flex-1">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    disabled={loading}
                    className="text-gray-400 hover:text-red-500 transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Botão de anexar */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={files.length === 3 || loading}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg
              hover:bg-gray-50 hover:border-gray-300 transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <Paperclip size={14} />
            {files.length === 3 ? "Limite de 3 arquivos" : "Anexar arquivo"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            disabled={files.length === 3 || loading}
            className="hidden"
            onChange={(e) => onFileSelection(e)}
          />
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-200">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={createNewPost}
            disabled={post.length < 10 || loading}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 
              disabled:cursor-not-allowed transition-colors"
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}