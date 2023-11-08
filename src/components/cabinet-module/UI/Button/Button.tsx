import { FC, ButtonHTMLAttributes } from 'react'
import s from './Button.module.scss'

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...otherProps
}) => {
  return (
    <button className={s.container} {...otherProps}>
      {children}
    </button>
  )
}
