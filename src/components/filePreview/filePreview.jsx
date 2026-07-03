import { Download, ExternalLink, X } from "lucide-react";
import { FilePreviewRenderer } from "./previewRenderer";
import { buildFileUrl } from "../../utils/fileUtils";
import { downloadFile } from "../../services/downloadFile";

export function FilePreview({ file, onClose, type }) {
  if (!file) return null;

  return (
    <div className="fixed flex items-center inset-0 z-60 bg-black/50 p-4">
      <div className="mx-auto flex min-h-[50vh] min-w-[70%] max-w-5xl flex-col rounded-xl bg-white shadow-lg">

        <div className="w-full py-3 px-3 flex flex-row items-center border-b border-gray-400">
          <span className="flex flex-row gap-4">
            <a
              href={buildFileUrl(file.fileKey)}
              target="_blank"
              rel="noopener noreferrer hover:cursor-pointer"
            >
              <ExternalLink strokeWidth={1.5} size={28}/>
            </a>

            <button
              onClick={() => downloadFile(file.id, type)}
              className="hover:cursor-pointer"
            >
              <Download strokeWidth={1.5} size={28}/>
            </button>
          </span>

          <span className="flex flex-1 items-center justify-end">
            <button
              onClick={onClose}
              className="rounded-full self bg-gray-300 flex items-center justify-center ml-8 px-1 py-1 hover:cursor-pointer"
            >
              <X strokeWidth={1.5} size={32}/>
            </button>
          </span>
        </div>

        <div className="flex-1 overflow-auto p-4 bg-gray-300 rounded-b-xl">
          <FilePreviewRenderer file={file} />
        </div>
      </div>
    </div>
  );
}