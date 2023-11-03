import React from 'react'
import s from './Modal.module.scss'
import { CreateForm, ViewForm, EditForm } from './index.ts'

interface IModal {
  // id?: number
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  formType: string
  setFormType: React.Dispatch<React.SetStateAction<string>>
}

enum Form {
  Create = 'create',
  Edit = 'edit',
  View = 'view',
}

export const Modal: React.FC<IModal> = ({
  showModal = true,
  setShowModal,
  formType,
  setFormType,
}) => {
  const closeForm = () => {
    setFormType('')
    setShowModal(false)
  }

  return (
    <>
      {showModal ? (
        <div className={s.container} onClick={() => setShowModal(false)}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <button className={s.close} onClick={closeForm}>
              закрыть
            </button>
            {formType === Form.Create && (
              <CreateForm setShowModal={setShowModal} />
            )}
            {formType === Form.Edit && <EditForm />}
            {formType === Form.View && <ViewForm />}
          </div>
        </div>
      ) : null}
    </>
  )
}
