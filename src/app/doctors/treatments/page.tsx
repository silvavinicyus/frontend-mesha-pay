"use client"

import { HeaderPage } from "@/components/header-page";
import { NavigationButton } from "@/components/ui/navigation-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ITreatment } from "@/interfaces/treatment";
import { BadgePlusIcon, Tags } from "lucide-react";
import { useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog'
import { TreatmentHandler } from "@/components/treatment-handle";

export default function Treatment() {
  const token = localStorage.getItem('token') || ''
  const [treatments, setTreatments] = useState<ITreatment[]>([])
  
  useEffect(() => {
    try {
     const getTreatments = async () => {
       const result = await fetch("http://localhost:3333/treatments/open", {
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
   
  return (    
    <div className="py-10 space-y-8">
      <div>        
        <HeaderPage />
      </div>

      <main className="max-w-6xl mx-auto space-y-5 text-white">
        <nav className="flex justify-between">
          <div className='flex gap-1'>
            <NavigationButton              
              selected={true}
              title='Atendimentos'              
            > 
              <Tags className="size-4" /> 
            </NavigationButton>
          </div>
        </nav>

        <div className='w-full h-[1px] bg-zinc-500 mb-5' />

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
                <TableHead> Ações </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {
                treatments?.map((treatment) => {                  
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

                      <TableCell className='text-zinc-500 hover:cursor-pointer'>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <BadgePlusIcon />
                          </Dialog.Trigger>

                          <Dialog.Portal>
                            <Dialog.Overlay className='fixed inset-0 bg-black/70' />
                            <Dialog.Content className='fixed p-10 space-y-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-l border-zinc-900'>
                              <div className='space-y-3'>
                                <Dialog.Title className='text-xl font-bold text-white'>
                                  Iniciar atendimento
                                </Dialog.Title>
                                <Dialog.Description className='text-sm text-zinc-50'>
                                  <p> Para iniciar o atendimento clique no botão Iniciar </p>
                                  <p> Para finalizar o atendimento clique no botão finalizar </p>
                                </Dialog.Description>
                              </div>
                  
                              <TreatmentHandler treatment={treatment}/>

                              <Dialog.Close />
                            </Dialog.Content>              
                          </Dialog.Portal>
                        </Dialog.Root>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        ) 
        : <h1> Sem atendimentos em aberto!</h1>
      }      
      </main>
    </div>
  )
}