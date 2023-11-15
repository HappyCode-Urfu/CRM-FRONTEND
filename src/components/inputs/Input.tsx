import { FC, InputHTMLAttributes } from 'react'
import classes from './Input.module.scss'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string
}

const Input: FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className={classes.input_container}>
      <label className={classes.input_label}>{label}</label>
      <input className={classes.input} {...props} />
    </div>
  )
}

export default Input
