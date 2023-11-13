import { FC, InputHTMLAttributes } from 'react'
import s from './Input.module.scss'

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...otherProps
}) => {
  return (
    <div className={s.container}>
      <p>{children}</p>
      <input className={s.customInput} {...otherProps} />
    </div>
  )
}
