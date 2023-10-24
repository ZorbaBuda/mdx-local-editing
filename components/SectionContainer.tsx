import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:max-w-7xl xl:px-0">{children}</div>
  )
}
