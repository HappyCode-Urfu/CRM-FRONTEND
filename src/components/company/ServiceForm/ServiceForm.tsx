import React from 'react'
import s from './ServiceForm.module.scss'
import { ServiceCreateForm } from 'components/company/ServiceForm/CreateForm/CreateForm.tsx'
import { IService } from 'models/IService.ts'

interface IModal {
  id: string | undefined
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  formType: string
  setFormType: React.Dispatch<React.SetStateAction<string>>
  dataId?: IService
}

enum Form {
  Create = 'create',
  Edit = 'edit',
}

export const ServiceForm: React.FC<IModal> = ({
  id,
  showModal = true,
  setShowModal,
  formType,
  setFormType,
  dataId,
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
            {formType === Form.Create && <ServiceCreateForm type={Form.Create} id={id} />}
            {formType === Form.Edit && (
              <ServiceCreateForm type={Form.Edit} id={id} dataId={dataId} />
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
