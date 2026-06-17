import { useState } from "react";
import { X } from "lucide-react";
import { fetchBuilder } from "../../services/fetchBuilder";

export function CreatePost({ userId, userName, classId, setPosts, setOpen }) {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNewPost() {
    setLoading(true);

    await fetchBuilder("POST", `/post/createPost/${classId}`, { userId, text: post });

    const newPost = { name: userName, text: post, createdAt: new Date() };
    setPosts(prev => ({ ...prev, posts: [...prev.posts, newPost] }));

    setLoading(false);
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40 backdrop-blur-sm">
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