import { FC, InputHTMLAttributes } from 'react'
import s from './Input.module.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  phone_number?: boolean
}

export const Input: FC<InputProps> = ({
  children,
  phone_number,
  ...otherProps
}) => {
  if (phone_number) {
    return (
      <div className={s.container}>
        <p>{children}</p>
        <PhoneInput
          country={'ru'}
          containerClass={s.customInputPhone}
          inputProps={{
            required: true,
            autoFocus: true,
          }}
        />
      </div>
    )
  }

  return (
    <div className={s.container}>
      <p>{children}</p>
      <input className={s.customInput} {...otherProps} />
    </div>
  )
}
