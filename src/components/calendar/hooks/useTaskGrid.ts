import { useState } from 'react'
import { useTypedDispatch } from 'hooks/redux.ts'
import { categorySlice } from 'store/reducers/Category/CategorySlice.ts'

export const UseTaskGrid = () => {
  const [formType, setFormType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const dispatch = useTypedDispatch()
  const { selectCategoryId } = categorySlice.actions

  const openForm = (type: string) => {
    setFormType(type)
    setShowModal(true)
    dispatch(selectCategoryId(undefined))
  }

  return {
    formType,
    showModal,
    setShowModal,
    setFormType,
    openForm,
  }
}
