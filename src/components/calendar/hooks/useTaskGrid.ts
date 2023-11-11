import React, { useState } from 'react'

export const UseTaskGrid = () => {
  const [formType, setFormType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  const [startEventPosition, setStartEventPosition] = useState({
    y: 0,
  })
  const [endEventPosition, setEndEventPosition] = useState({ y: 0 })
  const [activeColumn, setActiveColumn] = useState<Date | null>(null)
  const openForm = (type: string) => {
    setFormType(type)
    setShowModal(true)
  }

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    column: Date,
    dayRef: React.RefObject<HTMLDivElement>
  ) => {
    setActiveColumn(column)
    setIsCreatingEvent(true)

    const dayRect = dayRef.current?.getBoundingClientRect()
    const dayOffsetTop = dayRect?.top ?? 0

    setStartEventPosition({ y: e.clientY - dayOffsetTop })
    setEndEventPosition({ y: e.clientY - dayOffsetTop })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCreatingEvent && activeColumn !== null) {
      setEndEventPosition({ y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setActiveColumn(null)
    setIsCreatingEvent(false)
  }

  return {
    activeColumn,
    isCreatingEvent,
    startEventPosition,
    endEventPosition,
    formType,
    showModal,
    setShowModal,
    setFormType,
    openForm,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  }
}
