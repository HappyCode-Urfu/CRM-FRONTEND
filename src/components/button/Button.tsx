import React, { ReactNode } from 'react'

import classes from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children }) => (
  <button className={classes.button}>{children}</button>
)

export default Button
