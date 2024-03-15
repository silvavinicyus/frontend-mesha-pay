import { InputHTMLAttributes } from "react"

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input (props: IInputProps) {
  return (
    <input 
      {...props}
      className="w-80 h-14 rounded-full pl-7 flex items-center gap-1.5 text-sm border border-zinc-300 focus:border-zinc-600 focus:outline-none focus:font-bold"
    />
  )
}