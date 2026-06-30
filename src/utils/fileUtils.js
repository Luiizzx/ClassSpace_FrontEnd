export function getPreviewType(fileName) {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (!ext) return "other";

  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  if (["mp4", "webm", "mov"].includes(ext)) return "video";
  if (["mp3", "wav", "ogg"].includes(ext)) return "audio";
  if (["txt", "json", "js", "ts", "tsx", "jsx", "html", "css"].includes(ext)) return "text";

  return "other";
}

export function buildFileUrl(fileKey){
  return `https://pub-72880818218741b5952216f9dd9c1f1e.r2.dev/${fileKey}`;
}