import { useState, FormEvent } from 'react'

export const UseCabinetModule = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    old_password: '',
    new_password: '',
    confirm_password: '',
  })

  const handleSubmitUserData = (e: FormEvent) => {
    e.preventDefault()
    console.log('UserData')
  }

  const handleSubmitUserEmail = (e: FormEvent) => {
    e.preventDefault()
    console.log('UserEmail')
  }

  const handleSubmitUserPassword = (e: FormEvent) => {
    e.preventDefault()
    console.log('UserPassword')
  }
  return {
    userData,
    setUserData,
    handleSubmitUserData,
    handleSubmitUserEmail,
    handleSubmitUserPassword,
  }
}
