import { ModuleCard } from "../../components/cards/moduleCard"

export function Modules({ classId }){
  return(
    <div className="bg-inherit w-full h-72 md:h-48 grid grid-cols-2 grid-rows-2 md:flex md:flex-row gap-4 pb-4">
      <ModuleCard
        moduleName={"Postagens"} 
      />

      <ModuleCard 
        route={`/participants/${classId}`}
        moduleName={"Participantes"} 
      />

      <ModuleCard 
        moduleName={"Atividades"} 
      />
    </div>
  )
}