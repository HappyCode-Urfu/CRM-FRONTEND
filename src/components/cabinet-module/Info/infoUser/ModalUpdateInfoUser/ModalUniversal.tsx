import cl from './ModalUnivrsal.module.scss'
import { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react'

interface UpdateInfoUserProps {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  style?: CSSProperties
}

const ModalUniversal = ({ active, setActive, children, style }: UpdateInfoUserProps) => {
  return (
    <div
      style={style}
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
