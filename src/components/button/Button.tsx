import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import classes from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <div className={classes.button_container}>
      <button className={classes.button}>{children}</button>
    </div>
  )
}

export default Button
