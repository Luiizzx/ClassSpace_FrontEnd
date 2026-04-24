import { useState } from "react";
import { ClassCard } from "../../components/cards/classCard";
import { ClassModulesSection } from "./classModulesSection";
import { Plus, Search } from "lucide-react";

export function Home({isLogged}) {
  const [display, setDisplay] = useState(null);

  // const classesData = [];
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
    setDisplay((prev) => (prev === id ? null : id));
  }

  return (
    <div className="w-full h-full">
      {classesData.length > 0 ? (
        <div className="bg-gray-200 flex flex-1 flex-col items-center gap-6">
          <div className="bg-linear-to-r from-blue-950 to-blue-800 w-11/12 lg:w-3/4 h-22 rounded-lg flex flex-row justify-center mt-6">
            
            <div className="bg-inherit w-4/5 h-full flex items-center">
              <h1 className="text-white font-semibold text-2xl ml-2">
                Todas as turmas
              </h1>
            </div>

            <div className="bg-inherit w-1/5 h-full flex flex-row">
               
              <button
                title="Pesquisar turma"
                className="h-full w-full flex items-center justify-end hover:scale-110 transition sm:hidden"
              >
                <Plus className="text-white mr-2" />
              </button>

              <button
                title="Pesquisar turma"
                className="h-full w-full flex items-center justify-end hover:scale-110 transition"
              >
                <Search className="text-white mr-2" />
              </button>
            </div>
          </div>

          <div className="w-11/12 lg:w-2/3 border-b-2 border-gray-400 flex justify-end">
            <p className="text-gray-800 text-lg">2026</p>
          </div>

          <div className="relative w-11/12 lg:w-3/5 flex flex-col items-center gap-4 pb-4">
            {classesData.map((classData) => (
              <div
                key={classData.key}
                className="w-full sm:w-10/12 lg:w-full h-full flex flex-col items-center gap-4"
              >
                <ClassCard
                  subject={classData.subject}
                  date={classData.date}
                  color={classData.color}
                  onClickFn={() => onClickDisplay(classData.key)}
                  isExpanded={display === classData.key}
                />

                {display === classData.key && <ClassModulesSection />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <div className="w-4/5 flex flex-col justify-center text-center">
            <h1 className={`${isLogged ? "text-2xl" : "text-xl"} text-gray-800 font-bold`}>
              {isLogged ? "Ainda não tem turma?" : "Suas turmas aparecerão aqui após você entrar em sua conta"}
            </h1>
          </div>

          <div className="w-full flex justify-center">
            {isLogged && 
              <button
                onClick={() => {}}
                className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 h-11 bg-gray-800 text-gray-200 flex items-center justify-center 
                gap-2 rounded-xl font-medium shadow-md transition-all duration-200 hover:bg-gray-700 hover:scale-105"
              >
                <span>Adicionar turma</span>
                <Plus size={18} />
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
}