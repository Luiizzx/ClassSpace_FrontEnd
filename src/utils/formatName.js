export function formatClassName(name) {
  return name.split(" ").map(word => isNaN(word)
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word
    )
    .join(" ");
}

export function formatFileName(name) {
  const lastDot = name.lastIndexOf(".");

  if (lastDot <= 0) {
    return name.length > 6 ? name.slice(0, 6) + ".." : name;
  }

  const base = name.slice(0, lastDot);
  const ext = name.slice(lastDot); 

  return base.length > 6 ? base.slice(0, 6) + ".." + ext : name;
}