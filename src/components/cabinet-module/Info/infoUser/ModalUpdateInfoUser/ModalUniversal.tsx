import cl from './ModalUnivrsal.module.scss'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface UpdateInfoUserProps {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const ModalUniversal = ({ active, setActive, children }: UpdateInfoUserProps) => {
  return (
    <div
      className={`${cl.modal} ${active ? cl.active : ''}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${cl.modal__content} ${active ? cl.act : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalUniversal
