import { InputHTMLAttributes, forwardRef, RefObject } from 'react'
import classes from './Input.module.scss'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string
  isError?: boolean
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isError = false, helperText, label, ...props }, ref) => {
    const inputRef = ref as RefObject<HTMLInputElement>

    return (
      <>
        {isError && helperText && <div className={classes.helper_text}>{helperText}</div>}
        <div
          className={`${classes.input_container} ${isError ? classes.input_error : ''}`}
          onClick={() => inputRef.current?.focus()}
        >
          <input autoComplete="off" ref={inputRef} {...props} className={classes.input} />{' '}
          <label htmlFor="" className={classes.input_label}>
            {label}
          </label>
        </div>
      </>
    )
  }
)

export default Input
