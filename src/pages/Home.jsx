import { ClassCard } from "../components/cards/classCard";

export function Home({}){
 const classesData = [
  {
    key: 1,
    subject: "Cálculo Numérico",
    date: "Segunda-feira",
    professor: "Prof. Carlos Mendes",
    color: "green"
  },
  {
    key: 2,
    subject: "Estruturas de Dados",
    date: "Terça-feira",
    professor: "Profa. Mariana Souza",
    color: "orange"
  },
  {
    key: 3,
    subject: "Desenvolvimento Web",
    date: "Quarta-feira",
    professor: "Prof. João Pereira",
    color: "gray"
  },
  {
    key: 4,
    subject: "Banco de Dados",
    date: "Quinta-feira",
    professor: "Profa. Fernanda Lima",
    color: "purple"
  },
  {
    key: 5,
    subject: "Engenharia de Software",
    date: "Sexta-feira",
    professor: "Prof. Ricardo Alves",
    color: "blue"
  }
];

  return(
    <div className="bg-gray-200 flex flex-1 flex-col items-center gap-6">
      <div className="bg-linear-to-r from-blue-950 to-blue-800 w-11/12 lg:w-3/4 h-22 rounded-lg flex items-center mt-6
        hover:scale-[1.01] transition"
      >
        <h1 className="text-white font-semibold text-2xl ml-2">Todas as turmas</h1>
      </div>

      <div className="w-11/12 lg:w-2/3 border-b-2 border-gray-400 flex justify-end">
        <p className="text-gray-800 text-lg">2026</p>
      </div>

      <div className="w-11/12 lg:w-3/5 flex flex-col gap-4">
        {classesData.map((classData) => (
          <ClassCard 
            key={classData.key}
            subject={classData.subject}
            date={classData.date}
            color={classData.color}
          />
        ))}
      </div>
    </div>
  )
}