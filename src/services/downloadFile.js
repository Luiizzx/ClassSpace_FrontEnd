export async function downloadFile(fileId, type){

  const response = await fetch(
    `http://localhost:3001/file/getFile/${fileId}?type=${type}`,
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