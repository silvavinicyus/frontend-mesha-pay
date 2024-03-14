import { IProcedure } from "@/interfaces/procedure"

interface IProcedureCardProps {
  procedure: IProcedure
}

export function ProcedureCard ({procedure}: IProcedureCardProps) {
  return (
    <div className='w-72 h-36 bg-zinc-500 px-6 py-6 flex flex-col justify-between bg-gradient-to-b from-blue-900 to-blue-950 rounded-md'>
      <div className='flex w-full justify-between '>
        <span className='text-white text-2xl font-bold'> {procedure.name}</span>
        <div className='flex items-center justify-center'>
          <span className={`relative w-16 h-16 bg-green-400 rounded-full mix-blend-overlay`}/>
          <span className={`absolute w-16 h-16 border shadow-green-500 flex items-center justify-center rounded-full text-white font-bold`}> {`${procedure.duration}min`} </span>
        </div>
      </div>

      <span className='text-zinc-300 text-xl'> {`R$ ${procedure.value}`} </span>
    </div>
  )
}