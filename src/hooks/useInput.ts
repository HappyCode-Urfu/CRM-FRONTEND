import { ChangeEvent, useState } from 'react'

export const useInput = <T extends object>(inputValues: T) => {
  const [values, setValues] = useState<T>(inputValues)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }
  return { values, handleChange, setValues }
}
