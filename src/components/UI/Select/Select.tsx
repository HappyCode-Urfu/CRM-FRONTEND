import { FC, InputHTMLAttributes } from 'react'
import s from './Select.module.scss'

export type Option = {
  value: string | undefined
  label: string
}

type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  options: Option[]
  def: boolean
}

export const Select: FC<SelectProps> = ({ def, options, children, ...otherProps }) => {
  return (
    <div className={s.container}>
      {children && <p>{children}</p>}
      <select {...otherProps}>
        {def && <option key={undefined}>Выберите</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
