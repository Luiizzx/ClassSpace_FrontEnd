export function formatClassName(name) {
  return name.split(" ").map(word => isNaN(word)
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word
    )
    .join(" ");
}