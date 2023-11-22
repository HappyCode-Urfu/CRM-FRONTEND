import React from 'react'
import s from './Modal.module.scss'
import { CreateForm, ViewForm, EditForm } from './index.ts'

interface IModal {
  id?: number | null
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  formType: string
  setFormType: React.Dispatch<React.SetStateAction<string>>
  hoveredTime?: string | null
  hoveredColumn?: string | null
}

enum Form {
  Create = 'create',
  Edit = 'edit',
  View = 'view',
}

export const Modal: React.FC<IModal> = ({
  id,
  showModal = true,
  setShowModal,
  formType,
  setFormType,
  hoveredColumn,
  hoveredTime,
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
              X
            </button>
            {formType === Form.Create && (
              <CreateForm
                setShowModal={setShowModal}
                hoveredColumn={hoveredColumn}
                hoveredTime={hoveredTime}
              />
            )}
            {formType === Form.Edit && <EditForm />}
            {formType === Form.View && <ViewForm id={id} setShowModal={setShowModal} />}
          </div>
        </div>
      ) : null}
    </>
  )
}
