import { buildFileUrl, getPreviewType } from "../../utils/fileUtils";

export function FilePreviewRenderer({ file }) {
  const previewType = getPreviewType(file.name || file.fileName);

  if (previewType === "image") {
    return (
      <img
        src={buildFileUrl(file.fileKey)}
        alt={file.name}
        className="mx-auto max-h-[75vh] w-full rounded-md"
      />
    );
  }

  if (previewType === "pdf") {
    return (
      <div className="h-full w-full overflow-auto">
        <iframe
          src={buildFileUrl(file.fileKey)}
          className="h-[150vh] w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <p className="text-sm text-gray-600">
        Preview not available for this file type.
      </p>

      <a
        href={buildFileUrl(file.fileKey)}
        target="_blank"
        rel="noreferrer"
        className="rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        Open file
      </a>
    </div>
  );
}