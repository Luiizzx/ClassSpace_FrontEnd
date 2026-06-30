import { X } from "lucide-react";
import { FilePreviewRenderer } from "./previewRenderer";

export function FilePreview({ file, onClose }) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 p-4">
      <div className="mx-auto flex h-[90vh] max-w-5xl flex-col rounded-xl bg-white shadow-lg">

        <div className="flex items-center justify-between border-b p-3">
          <h2 className="truncate text-sm font-medium">
            {file.name}
          </h2>

          <button
            onClick={onClose}
            className="rounded-md px-3 py-1 hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <FilePreviewRenderer file={file} />
        </div>
      </div>
    </div>
  );
}