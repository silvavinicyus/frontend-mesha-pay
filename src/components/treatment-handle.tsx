"use client"

import { updateTreatment } from "@/app/lib/actions";
import { ITreatment } from "@/interfaces/treatment";
import { differenceInMinutes } from 'date-fns';
import { Loader2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import { Badge } from "./ui/badge";
import * as Dialog from '@radix-ui/react-dialog'

interface ITreatmentHandler {
  treatment: ITreatment  
}

export function TreatmentHandler({treatment}: ITreatmentHandler) {    

  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()  
  const [errors, setErrors] = useState('')
  const [updatedTreatment, setUpdatedTreatment] = useState<Partial<ITreatment>>()

  async function handleTreatmentUpdate() {
    const difference = differenceInMinutes(end!, start!)
    
    const result = await updateTreatment(difference, treatment.uuid)

    if(result.success) {
      setUpdatedTreatment(result.updatedTreatment)
    } else {
      setErrors(String(result.error))
    }
  }

  return(
    <div className="text-white">
      <div className="flex flex-col gap-5">
        <span> Detalhes do atendimento </span>
        <div className="grid grid-cols-2 gap-2">
          {treatment.treatment_procedures?.map((treat_proc) => {
            return (
              <Badge key={treat_proc.id}>
                <p> Serviço:{treat_proc.procedure.name}</p>
                <p> Duração:{treat_proc.procedure.duration}min </p>
              </Badge>
            )
          })}
        </div> 

        {
          !!updatedTreatment 
            ? <div className="flex flex-col gap-4">
                <span> Duração Total: { updatedTreatment.duration }</span>
                <span> Valor da Comissão: R$ { updatedTreatment.comission_value }</span>

                <Dialog.Close>
                  <button className="bg-red-400 rounded-full w-24 h-10" onClick={() => window.location.reload()}>
                    Sair
                  </button>  
                </Dialog.Close>             
              </div>
            : <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <span> Horário de Início: {start ? start.toLocaleTimeString() : <span> Ainda não iniciado. </span> }</span>
                  <span> Horário de Fim: {end ? end.toLocaleTimeString() : <span> Ainda não finalizado. </span> }</span>
                  
                  {errors && <span className="text-red-700">{errors} </span>}
                </div>

                <div className="w-full flex justify-center animate-spin">
                  {start && !end && <Loader2 className="w-10 h-10" />} 
                </div>

                <div className="flex gap-5 w-full justify-center">
                  <button onClick={() => setStart(new Date())} disabled={!!start} className="bg-green-400 rounded-full w-24 h-10"> Iniciar </button>
                  <button onClick={() => setEnd(new Date())} disabled={!!end} className="bg-red-400 rounded-full w-24 h-10"> Finalizar </button>
                </div>

                <div className="flex w-full justify-center">
                  <button onClick={handleTreatmentUpdate} className="bg-red-400 rounded-full w-24 h-10" disabled={!start || !end}> Salvar </button>               
                </div>
              </div>
        }               
      </div>
    </div>
  )
}