"use client"

import { createTreatment } from "@/app/lib/actions"
import { IProcedure } from "@/interfaces/procedure"
import * as Dialog from '@radix-ui/react-dialog'
import { Check, Loader2, X } from "lucide-react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Badge } from "./ui/badge"

interface ICreateTreatmentForm {  
  procedures: IProcedure[]
  onTreatmentCreated: () => void
}


export function CreateTreatmentForm({procedures, onTreatmentCreated}: ICreateTreatmentForm) {  
  const [selecetedProcedures, setSelectedProcedures] = useState<{id: number, name: string}[]>([])
  const [result, dispatch] = useFormState(createTreatment, undefined) 
  const { pending } = useFormStatus()  
  
  const formData = new FormData()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {    
    event.preventDefault()
    const array_procedures: number[] = selecetedProcedures.map((procedure) => procedure.id)
    formData.append('procedures', array_procedures.toString())

    dispatch(formData)
  }
  
  function handleSelectAdd(e: ChangeEvent<HTMLSelectElement>) {
    const procedureExist = selecetedProcedures.find((procedure) => procedure.id === +e.target.value)

    if(!procedureExist && e.target.value !== "") {         
      const selectedOptionText = e.target.options[e.target.selectedIndex].text;                          
      setSelectedProcedures([...selecetedProcedures, {
        id: +e.target.value,
        name: selectedOptionText
      }])        
    }
  }

  useEffect(() => {
    if(result?.success) {
      onTreatmentCreated()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.success])

  return(
    <form onSubmit={handleSubmit}>
      <div className="space-y-2 text-white">
        <label className="text-sm font-medium block " htmlFor="title"> Selecione os procedimentos desejados: </label>          
          <select onChange={handleSelectAdd} 
            className="rounded-lg text-base bg-zinc-800 px-5 h-10"
          >
            <option value="">Selecione os procedimentos</option>
            {
              procedures?.map((procedure) => {
                return (
                  <option key={procedure.id} value={String(procedure.id)} label={procedure.name} className="text-base"> {procedure.name} </option>
                )
              })
            }
        </select>
          
        <div className="space-y-2 text-white pt-5">
          <div className="grid grid-cols-3 gap-4">          
            {selecetedProcedures.length > 0 && selecetedProcedures.map((procedure) => {
              return (
                <Badge key={procedure.id}> {procedure.name} </Badge>
                )
              })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
        <Dialog.Close>
          <button className='flex items-center gap-2 py-1.5 px-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700'>
            <X className="size-3" />
            Cancel
          </button>
        </Dialog.Close>
        
        <button disabled={pending} type="submit" className="flex items-center gap-2 bg-teal-400 text-teal-950 py-1.5 px-2.5 rounded-md  border border-zinc-800 hover:border-zinc-700">
          { pending ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" /> }
          Save
        </button>
      </div>
      </div>
    </form>
  )
}