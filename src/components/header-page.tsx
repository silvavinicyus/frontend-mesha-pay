"use client";

import MeshaLogo from '../app/icon.png'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { logout } from '@/app/lib/actions'
import { useRouter } from 'next/navigation'


export function HeaderPage() { 
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '')
  const { push } = useRouter()
  
  async function handleLogout() {
    const result = await logout()    

    if(result.success) {           
      push('/login')
    }
  }

  return(
    <div className="max-w-[1200px] mx-auto flex items-center justify-between text-white">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <Image src={MeshaLogo} alt="mesha care" className='h-8 w-8'/>

          <Badge> BETA </Badge>
        </div>                
      </div>

      <div>
        <span className='font-bold text-base'> Mesha Tecnologia </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-sm font-medium">{currentUser.name}</span>
          <span className="text-xs text-zinc-400">{currentUser.email}</span>
        </div>  
        <Badge 
          onClick={handleLogout}
          variant='red' 
          className='w-12 h-7 flex items-center justify-center text-sm hover:cursor-pointer hover:bg-red-400/85'
        >          
          Sair                         
        </Badge>
      </div>

      
    </div>
  )
}