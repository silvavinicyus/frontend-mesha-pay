'use client'

import Image from 'next/image'
import MeshaLogo from '../../icon.png'
import { Input } from '@/components/ui/input'
import { Loader2, MoveRight } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'
import { createAccount } from '@/app/lib/actions'
import Link from 'next/link'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function CreateAccount() {
  const [ result, dispatch] = useFormState(createAccount, undefined)
  const { pending } = useFormStatus()
  
  useEffect(() => {
    if (result?.success) {
      redirect('/login')
    }
  }, [result?.success])

  return (
    <div className="w-screen h-screen grid grid-cols-2 text-white">
      <div className="w-full h-full bg-[url('icon.png')] bg-center bg-no-repeat bg-cover flex flex-col items-end pr-24">
        <div className="flex-1 flex flex-col justify-center gap-14">

          <div className="flex flex-col gap-3 items-end">
            <Image className="w-32 h-24 bg-zinc mr-4" src={MeshaLogo} alt="Mesha Logo"/>            
            <span className="text-5xl font-bold mr-1.5"> Mesha </span>
          </div>

          <div className="w-72 h-0.5 bg-white"/>

          <div className="flex flex-col items-end">
            <span className="text-5xl">Mesha</span>
            <span className="text-5xl font-bold">Care</span>
          </div>
        </div>

        <footer className="items-center text-zinc-400 pb-12">
          <span> contato@somosmesha.com </span>
        </footer>
      </div>

      <div className="w-full h-full bg-white flex flex-col pl-24">
        <div className="flex-1 flex justify-center flex-col text-zinc-400">
          <span className="mb-12 w-64"> Para criar uma nova conta digite seu nome, email e senha. </span>

          <form action={dispatch}>
            <div className="flex flex-col gap-8 w-full">
              <Input type="text" name="name" placeholder="Nome"  required />
              <Input type="email" name="email" placeholder="Email" required />
              <Input type="password" name="password" placeholder="Senha" required/>
              <Input type="password" name="password_confirmation" placeholder="Confirmação de senha" required/>
              <div>{result?.error && <p className='text-red-500 font-bold'>{result.error}</p>}</div>
              <button 
                disabled={pending} 
                type="submit"
                className="flex w-36 h-10 bg-blue-800 rounded-full text-white font-bold hover:bg-blue-800/95 text-sm items-center justify-center gap-3"
              > 
                ENTRAR
                {
                  pending 
                    ? <Loader2 className="size-3 animate-spin" /> 
                    : <MoveRight className="size-5" />
                }              
              </button>              
            </div>
          </form>
        </div>
                
        <footer className="flex gap-8 items-center text-zinc-400 pb-12">
          <Link href='/login'> Já possui uma conta? <br/> Entrar</Link>
          <div className="w-2 h-2 bg-zinc-400 border rounded-full"></div>
          <p> Privacy Policy </p>
        </footer>
      </div>
    </div>        
  )
}