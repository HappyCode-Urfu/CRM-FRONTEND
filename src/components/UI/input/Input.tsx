import { ChangeEvent, FC, InputHTMLAttributes } from 'react'
import s from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  phone_number?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({ children, phone_number, ...otherProps }) => {
  const convertToPhoneNumberFormat = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (numericValue.startsWith('7') || numericValue.startsWith('8')) {
      const formattedValue = numericValue.slice(1)
      const groups = formattedValue.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)

      if (groups) {
        const [, countryCode, first, second, third] = groups
        return `+7${countryCode ? ` ${countryCode}` : ''}${first ? `-${first}` : ''}${
          second ? `-${second}` : ''
        }${third ? `-${third}` : ''}`
      }
    }

    return value.replace(/\D/g, '')
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target

    if (phone_number) {
      value = convertToPhoneNumberFormat(value)
    }

    if (otherProps.onChange) {
      otherProps.onChange({
        ...e,
        target: {
          ...e.target,
          value: value,
        },
      })
    }
  }

  if (phone_number) {
    return (
      <div className={s.container}>
        <p>{children}</p>
        <input className={s.customInput} {...otherProps} onChange={handleChange} />
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
