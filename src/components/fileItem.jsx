import { X } from "lucide-react";
import { formatFileName } from "../utils/formatName";

export function FileItem({ file, onRemove, delivered, setPreview, isDesktop }){
  return(
    <span
      className="flex flex-row items-center gap-2 py-1.5 pl-1 px-0.5 rounded-xl bg-gray-400 font-medium text-gray-800"
    >
      <button 
        type="button"
        disabled={delivered}
        onClick={onRemove}
        className="rounded-full bg-gray-500 text-gray-700 flex flex-row items-center justify-center hover:cursor-pointer
          md:py-1 md:px-1"
      >
        <X />
      </button>

      <button 
        type="button"
        className="flex flex-1 hover:cursor-pointer"
        disabled={!file.fileKey}
        onClick={() => setPreview({ open: true, file: file })}
      >
        {isDesktop ? (file.fileName || file.name) : formatFileName(file.fileName || file.name)}
      </button>
    </span>
  )
}