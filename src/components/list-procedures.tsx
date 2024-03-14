import { IProcedure } from "@/interfaces/procedure"
import { ProcedureCard } from "./ui/procedure-card"

interface IListProceduresComponentProps {
  procedures: IProcedure[]
}

export function ListProceduresComponent({procedures}: IListProceduresComponentProps) {
  return (
    <div className='flex flex-col justify-center gap-3'>
      <h1 className="text-xl font-bold">Serviços disponíveis</h1>      

      <div className="grid grid-cols-3 justify-center gap-5">
        {
          procedures.length >0 && procedures.map((procedure) => {
            return (
              <ProcedureCard key={procedure.id} procedure={procedure}/>
            )
          })
        }        
      </div>
    </div>
  )
}