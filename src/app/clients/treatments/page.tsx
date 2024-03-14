"use client";

import { HeaderPage } from "@/components/header-page";
import { ListProceduresComponent } from "@/components/list-procedures";
import { ListTreatmentsComponent } from "@/components/list-treatments";
import { NavigationButton } from "@/components/ui/navigation-button";
import { IProcedure } from "@/interfaces/procedure";
import { ListVideo, Tags } from "lucide-react";
import { useEffect, useState } from "react";

export default function Treatment() {    
  const token = localStorage.getItem('token') || ''
  const [procedures, setProcedures] = useState<IProcedure[]>([])
  const [mainComponent, setMainComponent] = useState('procedures')
  
  useEffect(() => {
    try {
      const getProcedures = async () => {
        const res = await fetch('http://localhost:3333/procedures', 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if(res.ok) {
          const data = await res.json()

          setProcedures(data)
        }
      }

      getProcedures()
    } catch(err) {
      console.log(err)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleMainComponent(component: string) {
    component === 'procedures' ? setMainComponent('procedures') : setMainComponent('treatments')
  }

  return (
    <div className="py-10 space-y-8">
      <div>        
        <HeaderPage />
      </div>

      <main className="max-w-6xl mx-auto space-y-5 text-white">
        <nav className="flex justify-between">
          <div className='flex gap-1'>
            <NavigationButton
              onClick={() => handleMainComponent('procedures')}
              selected={mainComponent === 'procedures'}
              title='Serviços'
            > 
              <ListVideo className="size-4" /> 
            </NavigationButton>
              

            <NavigationButton 
              onClick={() => handleMainComponent('treatments')} 
              selected={mainComponent === 'treatments'}
              title='Atendimentos'
            >
              <Tags className="size-4" />              
            </NavigationButton>
          </div>
        </nav>

        <div className='w-full h-[1px] bg-zinc-500 mb-5' />
        
        {
          mainComponent === 'procedures' 
            ? <ListProceduresComponent procedures={procedures} /> 
            : <ListTreatmentsComponent procedures={procedures} token={token}/>
        }
        
      </main>
    </div>        
  )
}