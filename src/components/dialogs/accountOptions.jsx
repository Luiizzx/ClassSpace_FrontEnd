import { fetchBuilder } from "../../services/fetchBuilder";

export function AccountOptions({ onNavigate }){
  async function onLogout(){
    try{
      await fetchBuilder("POST", "/logout");
    } 
    catch(error){
      console.log(error.message);
    }
    onNavigate("/login");
  }

  return(
    <div className="absolute top-16 mr-4 w-36 h-24 rounded-md flex flex-col gap-1 bg-gray-100 pl-1">
      <button 
        onClick={() => onNavigate("/minha-conta")}
        className="text-gray-600 font-semibold rounded-t-md w-full h-10 text-start pl-1"
      >
        Minha conta
      </button>

      <div className="w-30 border border-gray-300" />

      <button 
        onClick={() => onLogout()}
        className="text-red-600 rounded-b-md w-full h-10 text-start font-semibold pl-1"
      >
        Sair da conta
      </button>
    </div>
  )
}