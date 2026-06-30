import { useState } from "react";

export function DeliveredFiles({ files, dialog, setDialog }){
  const [loading, setLoading] = useState(false);

  async function updateScore(){
    
  }

  return(
    <>
      {dialog.open && 
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setDialog(prev => ({ ...prev, open: false }))}
        />
      }
      <div className="w-full min-h-2/5 rounded-t-2xl z=5- ">

    </div>
    </>
  )
}