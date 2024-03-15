import * as Dialog from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import { CreateTreatmentForm } from './create-treatment-form'
import { IProcedure } from '@/interfaces/procedure'
import { ITreatment } from '@/interfaces/treatment'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface IListTreatmentsComponentProps {
  procedures: IProcedure[]
  token: string
}

export function ListTreatmentsComponent({procedures, token}: IListTreatmentsComponentProps) { 
  const [treatments, setTreatments] = useState<ITreatment[]>([])

  useEffect(() => {
   try {
    const getTreatments = async () => {
      const result = await fetch("http://localhost:3333/treatments/closed", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if(result.ok) {
        const data = await result.json()
        
        setTreatments(data)
      }
    }

    getTreatments()
   }catch(err) {
    console.log(err)
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <div className='flex flex-col justify-center gap-3'>
      <div className='flex items-center gap-3'>
          <h1 className="text-xl font-bold">Atendimentos</h1>          
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="py-1 px-2 rounded-full bg-teal-400 text-teal-950 hover:bg-teal-500 flex items-center">
                <Plus className='size-3'/>
                Novo Atendimento
              </button>
            </Dialog.Trigger>
    
            <Dialog.Portal>
              <Dialog.Overlay className='fixed inset-0 bg-black/70' />
              <Dialog.Content className='fixed p-10 space-y-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-l border-zinc-900'>
                <div className='space-y-3'>
                  <Dialog.Title className='text-xl font-bold text-white'>
                        Criar atendimentos
                  </Dialog.Title>
                  <Dialog.Description className='text-sm text-zinc-50'>
                        Atendimentos são um conjunto de serviços que você escolhe a dedo!
                  </Dialog.Description>
                </div>
    
                <CreateTreatmentForm procedures={procedures} onTreatmentCreated={() => {}}/>
                <Dialog.Close />
              </Dialog.Content>              
            </Dialog.Portal>
          </Dialog.Root>     
      </div> 

      {
        treatments.length > 0 
          ? (
          <Table> 
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead> Doutor </TableHead>
                <TableHead> Comissão </TableHead>
                <TableHead> Duração </TableHead>
                <TableHead> Valor </TableHead>
                <TableHead> Procedimentos </TableHead>
                <TableHead> Data </TableHead>             
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {
                treatments?.map((treatment) => {
                  console.log(treatment.treatment_procedures)
                  const procedures = treatment.treatment_procedures?.map((treat_proced) => treat_proced.procedure.name).join(', ')
                  return (
                    <TableRow key={treatment.id}>
                      <TableCell></TableCell>

                      <TableCell>
                        <div className='flex flex-col gap-0.5'>
                          <span className='font-medium'>{treatment.doctor?.name}</span>                        
                        </div>
                      </TableCell>

                      <TableCell className='text-zinc-500'>
                        R$ { treatment.comission_value }
                      </TableCell>

                      <TableCell className='text-zinc-500'>
                        { treatment.duration } min
                      </TableCell>

                      <TableCell className='text-zinc-500'>
                        R$ { treatment.value }                        
                      </TableCell>

                      <TableCell className='text-zinc-500'>
                        {procedures}
                      </TableCell>

                      <TableCell className='text-zinc-500'>
                        { new Date(treatment.updated_at).toLocaleTimeString() }
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        ) 
        : <h1> Crie seu primeiro atendimento!</h1>
      }
    </div>
  )
}