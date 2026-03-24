import { useState } from "react";
import { ClassCard } from "../../components/cards/classCard";
import { ClassModulesSection } from "./classModulesSection";

export function Home(){
  const [display, setDisplay] = useState(null);

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

  function onClickDisplay(id) {
    setDisplay((prev) => (prev === id ? null : id))
  }

  return(
    <div className="bg-gray-200 flex flex-1 flex-col items-center gap-6">
      <div className="bg-linear-to-r from-blue-950 to-blue-800 w-11/12 lg:w-3/4 h-22 rounded-lg flex items-center 
        justify-center mt-6"
      >
        <h1 className="text-white font-semibold text-2xl ml-2">Todas as turmas</h1>
      </div>

      <div className="w-11/12 lg:w-2/3 border-b-2 border-gray-400 flex justify-end">
        <p className="text-gray-800 text-lg">2026</p>
      </div>

      <div className="relative w-11/12 lg:w-3/5 flex flex-col gap-4 pb-4" >
        {classesData.map((classData) => (
          <div 
            key={classData.key}
            className="w-full h-full flex flex-col items-center gap-4"
          >
            <ClassCard 
              subject={classData.subject}
              date={classData.date}
              color={classData.color}
              onClickFn={() => onClickDisplay(classData.key)}
              isExpanded={display === classData.key}
            />
            {display === classData.key && 
              <ClassModulesSection />
            }
          </div>
        ))}
      </div>
    </div>
  )
}