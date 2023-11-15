import React, { useState } from 'react'
import { useTypedDispatch } from 'hooks/redux.ts'
import { postEvent } from 'store/reducers/Events/ActionCreators.ts'

interface IForms {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  hoveredTime?: string | null
  hoveredColumn?: string | null
}

export const useForms = ({ setShowModal, hoveredTime, hoveredColumn }: IForms) => {
  const dispatch = useTypedDispatch()
  const [task, setTask] = useState('')
  const [date, setDate] = useState<string>(hoveredColumn ? hoveredColumn : '')
  const [startTime, setStartTime] = useState(hoveredTime ? hoveredTime : '')
  const [endTime, setEndTime] = useState('')

  const [errors, setErrors] = useState({
    task: '',
    date: '',
    startTime: '',
    endTime: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      task: '',
      date: '',
      startTime: '',
      endTime: '',
    }

    if (!task) {
      isValid = false
      newErrors.task = 'Введите название задачи'
    }

    if (!date) {
      isValid = false
      newErrors.date = 'Введите дату проведения'
    }

    if (!startTime) {
      isValid = false
      newErrors.startTime = 'Введите время начала задачи'
    }

    if (!endTime) {
      isValid = false
      newErrors.endTime = 'Введите время окончания задачи'
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(
        postEvent({
          service_name: task,
          date: new Date(date),
          start_time: startTime,
          end_time: endTime,
        })
      )
      setShowModal(false)
    }
  }

  return {
    task,
    setTask,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    errors,
    handleSubmit,
  }
}
