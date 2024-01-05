import { forwardRef, InputHTMLAttributes, RefObject, useState } from 'react'
import classes from '../Inputs.module.scss'
import hideIcon from 'assets/icon/hide-password.svg'
import showIcon from 'assets/icon/show-password.svg'

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string
  isError?: boolean
  helperText?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ isError = false, helperText, label, ...props }, ref) => {
    const inputRef = ref as RefObject<HTMLInputElement>
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const showPasswordToggle = props.value

    const passwordHideHandler = () => {
      setShowPassword(!showPassword)
      if (inputRef.current) {
        inputRef.current.type = showPassword ? 'password' : 'text'
      }
    }

    return (
      <>
        {isError && helperText && <div className={classes.helper_text}>{helperText}</div>}
        <div
          className={`${classes.input_container} ${isError ? classes.input_error : ''}`}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            id="password"
            type={showPasswordToggle && showPassword ? 'text' : 'password'}
            ref={inputRef}
            className={classes.input}
            {...props}
          />
          <label htmlFor="password" className={classes.input_label}>
            {label}
          </label>
          {showPasswordToggle && (
            <div
              className={classes.password_toogle_container}
              onClick={passwordHideHandler}
            >
              {!showPassword ? (
                <img
                  className={classes.show_or_hide_password}
                  alt="show"
                  src={showIcon}
                />
              ) : (
                <img
                  className={classes.show_or_hide_password}
                  alt="hide"
                  src={hideIcon}
                />
              )}
            </div>
          )}
        </div>
      </>
    )
  }
)

export default PasswordInput
