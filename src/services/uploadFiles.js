import toast from "react-hot-toast";
import { fetchBuilder } from "./fetchBuilder";
import { getPreviewType } from "../utils/fileUtils";

export async function uploadFiles(files, userId) {
  const uploadedFiles = [];

  for (const file of files) {
    const contentType = file.type || getPreviewType(file.fileName) || "application/octet-stream";

    let result = await fetchBuilder("POST", "/generateUrl", {
      fileName: file.name ?? file.fileName,
      contentType,
      userId
    });

    if (!result.ok) {
      toast.error(`Erro ao gerar URL para ${file.name || file.fileName}`);
      return null;
    }

    const { uploadUrl, key } = await result.json();

    result = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });

    if (!result.ok) {
      toast.error(`Erro ao enviar ${file.fileName}`);
      return null;
    }

    uploadedFiles.push({
      key,
      name: file.name ?? file.fileName
    });
  }

  return uploadedFiles;
}