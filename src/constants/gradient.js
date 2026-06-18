const gradients = {
  green: "from-green-700 to-green-500",
  blue: "from-blue-700 to-blue-500",
  purple: "from-purple-700 to-purple-500",
  orange: "from-orange-700 to-orange-500",
  gray: "from-gray-700 to-gray-500"
};

const letterColors = {
  green: "text-green-700",
  blue: "text-blue-700",
  purple: "text-purple-700",
  orange: "text-orange-700",
  gray: "text-gray-700"
}

const gradientList = Object.values(gradients);
const letterColorList = Object.values(letterColors);

export function getGradient(index) {
  return gradientList[index % gradientList.length];
}

export function getLetterColor(index){
  return letterColorList[index % letterColorList.length];
}