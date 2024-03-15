import React from "react"

interface NavigationButtonProps {
  onClick?: () => void
  title: string
  selected: boolean
  children?: React.ReactNode
}

export function NavigationButton({onClick, title, selected, children}: NavigationButtonProps) {

  return (
    <button 
      onClick={onClick}
      className={`py-1.5 px-3 text-zinc-100 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent hover:border-zinc-800 ${selected && 'bg-zinc-800'}`}
    >
      {children}
      {title}
    </button>
  )
}