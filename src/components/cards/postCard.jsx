import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { formatFileName } from "../../utils/formatName";
import { downloads } from "../../constants/downloadType.js"

export function PostCard({ data, classId, postId, setPreview }){

  const formattedText = data.text.length > 40 ? data.text.slice(0,40) + "..." : data.text;

  return(
    <div className="flex flex-col rounded-md w-full border border-gray-400 shadow-lg">
      <div className="flex flex-col items-start justify-start w-full pl-2 py-2 border-b border-gray-400 bg-gray-300 rounded-t-md">
        <span className="text-gray-800 font-medium md:text-lg">
          Postagem de <span className="text-gray-900">{data.user.name}</span>
        </span>

        <p className="text-xs md:text-base font-medium text-gray-800">{formatDate(data.createdAt)}</p>
      </div>

      <div className="flex flex-col items-start justify-start w-full pl-2 py-3 gap-2">
        <p className="text-sm md:text-lg text-gray-900 font-medium">{formattedText}</p>

        {data.files.length > 0 &&
          <div className="flex flex-row items-center gap-2">
            {data.files.map((file, index) => (
              <button 
                key={index}
                className="rounded-xl px-2 py-1 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer"
                onClick={() => setPreview({ open: true, file: file })}
              >
                {formatFileName(file.fileName || file.name)}
              </button>
            ))}
          </div>
        }
      </div>

      <div className="flex items-center py-2 pr-2 justify-end w-full border-t border-gray-400 rounded-b-md">
        <Link 
          to={`/post/${classId}/${postId}`}
          className="text-sm md:text-base text-blue-700 font-medium"
        >
          Ver detalhes 
        </Link>
      </div>
    </div>
  );
}