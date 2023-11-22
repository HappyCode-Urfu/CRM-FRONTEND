import { useState } from 'react'

export const UseTaskGrid = () => {
  const [formType, setFormType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [taskId, setTaskId] = useState(0)
  const openForm = (type: string, id?: number) => {
    setFormType(type)
    setShowModal(true)
    setTaskId(id ? id : 0)
  }

  return {
    taskId,
    formType,
    showModal,
    setShowModal,
    setFormType,
    openForm,
  }
}
