import { FC, InputHTMLAttributes } from 'react'
import s from './Select.module.scss'

type Option = {
  value: string
  label: string
}

type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  options: Option[]
}

export const Select: FC<SelectProps> = ({
  options,
  children,
  ...otherProps
}) => {
  return (
    <div className={s.container}>
      <p>{children}</p>
      <select {...otherProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
