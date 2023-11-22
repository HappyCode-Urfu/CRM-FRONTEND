import React from 'react'

interface IProps {
  id?: number | null
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ViewForm: React.FC<IProps> = ({ id, setShowModal }) => {
  return <div>просмотр</div>
}
