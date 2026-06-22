const gradients = {
  green: "from-green-700 to-green-500",
  blue: "from-blue-700 to-blue-500",
  purple: "from-purple-700 to-purple-500",
  red: "from-red-700 to-red-500",
  cyan: "from-cyan-700 to-cyan-500",
  pink: "from-pink-700 to-pink-500",
  indigo: "from-indigo-700 to-indigo-500",
  teal: "from-teal-700 to-teal-500"
};

const letterColors = {
  green: "text-green-700",
  blue: "text-blue-700",
  purple: "text-purple-700",
  red: "text-red-700",
  cyan: "text-cyan-700",
  pink: "text-pink-700",
  indigo: "text-indigo-700",
  teal: "text-teal-700"
};

const gradientList = Object.values(gradients);
const letterColorList = Object.values(letterColors);

export function getGradient(index) {
  return gradientList[index % gradientList.length];
}

export function getLetterColor(index){
  return letterColorList[index % letterColorList.length];
}