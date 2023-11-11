import { useState } from 'react'

export const UseTaskGrid = () => {
  const [formType, setFormType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const openForm = (type: string) => {
    setFormType(type)
    setShowModal(true)
  }

  return {
    formType,
    showModal,
    setShowModal,
    setFormType,
    openForm,
  }
}
