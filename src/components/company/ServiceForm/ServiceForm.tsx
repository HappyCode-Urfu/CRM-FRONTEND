import React from 'react'
import s from './ServiceForm.module.scss'
import { ServiceCreateForm } from 'components/company/ServiceForm/CreateForm/CreateForm.tsx'
import { IService } from 'models/IService.ts'
import { EmployeeForm } from 'components/company/EmployeeForm/EmployeeForm.tsx'
import { daysNumb, IEmployee } from 'models/IEmployee.ts'

interface IModal {
  id: string | undefined
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  formType: string
  setFormType: React.Dispatch<React.SetStateAction<string>>
  dataId?: IService
  employeeId?: string | undefined
  employee?: IEmployee<daysNumb>[]
}

enum Form {
  Create = 'create',
  Edit = 'edit',
  CreateEmployee = 'CreateEmployee',
  EditEmployee = 'EditEmployee',
}

export const ServiceForm: React.FC<IModal> = ({
  id,
  showModal = true,
  setShowModal,
  formType,
  setFormType,
  dataId,
  employee,
  employeeId,
}) => {
  const closeForm = () => {
    setFormType('')
    setShowModal(false)
  }

  const employeeIdData = employee?.find((res) => res.id === employeeId)

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
            {formType === Form.CreateEmployee && <EmployeeForm id={id} type={formType} />}
            {formType === Form.EditEmployee && (
              <EmployeeForm
                id={id}
                employee={employeeIdData}
                type={formType}
                employeeId={employeeId}
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
