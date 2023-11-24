import { FC, InputHTMLAttributes, useRef } from 'react'
import classes from './Input.module.scss'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string
}

const Input: FC<InputProps> = ({ label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div className={classes.input_container} onClick={() => inputRef.current?.focus()}>
        <label className={classes.input_label}>{label}</label>
        <input ref={inputRef} className={classes.input} {...props} />
      </div>
    </>
  )
}

export default Input
