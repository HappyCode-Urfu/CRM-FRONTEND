import React from 'react'
import s from './Modal.module.scss'
import ViewForm from './ViewForm/ViewForm.tsx'
import EditForm from './EditForm/EditForm.tsx'
import CreateForm from './CreateForm/CreateForm.tsx'

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

const Modal: React.FC<IModal> = ({
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
            {formType === Form.Create && <CreateForm />}
            {formType === Form.Edit && <EditForm />}
            {formType === Form.View && <ViewForm />}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal
