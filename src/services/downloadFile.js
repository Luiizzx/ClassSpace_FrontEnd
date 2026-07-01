import { downloads } from "../constants/downloadType";

export async function downloadFile(fileId, type){
  let get = "";

  // a diferenciação ocorre porque arquivos de professores e de alunos
  // estão em tabelas diferentes
  if (type == downloads.DELIVERY){ get = "getDeliveryFile"; }
  else{ 
    get = "getAssignmentFile";
  }

  const response = await fetch(
    `http://localhost:3001/file/${get}/${fileId}`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to download file");
  }

  const blob = await response.blob();

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  a.download = "";

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
};