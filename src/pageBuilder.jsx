import { Header } from "./components/structure/header";

export function PageBuilder({page}){
  return(
    <div className="bg-[#171717] w-full h-screen">
        <Header />

        {page}
    </div>
  );

}