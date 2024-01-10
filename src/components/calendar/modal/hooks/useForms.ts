import { ChangeEvent, FormEvent, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { postSession, putSession } from 'store/reducers/Events/ActionCreators.ts'
import { Option } from 'components/UI/Select/Select.tsx'
import { IEvents } from 'models/IEvents.ts'

interface IForms {
  formType: string
  hoveredTime?: string | null
  hoveredColumn?: string | null
}

export const useForms = ({ hoveredTime, hoveredColumn, formType }: IForms) => {
  const { eventId } = useTypedSelector((state) => state.eventReducer)
  const dispatch = useTypedDispatch()
  const EmployeeList = JSON.parse(localStorage.getItem('Employee') || '[]') as Option[]
  const DepartmentId = JSON.parse(localStorage.getItem('departmentId') || '')
  const [useData, setUseData] = useState({
    sessionId: formType === 'edit' ? eventId.sessionId : '',
    serviceName: formType === 'edit' ? eventId.serviceName : '',
    visitDate:
      formType === 'edit' ? eventId.visitDate?.split('T')[0] : hoveredColumn ?? '',
    startTime: formType === 'edit' ? eventId.startTime : hoveredTime ?? '',
    endTime: formType === 'edit' ? eventId.endTime : '',
    employeeId: formType === 'edit' ? eventId.employeeId : '',
    clientName: formType === 'edit' ? eventId.clientName : '',
    clientPhoneNumber: formType === 'edit' ? eventId.clientPhoneNumber : '',
    clientEmail: formType === 'edit' ? eventId.clientEmail : '',
  })

  const handleSelectEmployeeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUseData({ ...useData, employeeId: event.target.value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IEvents = {
      serviceName: useData.serviceName,
      visitDate: useData.visitDate,
      startTime: useData.startTime,
      endTime: useData.endTime,
      employeeId: useData.employeeId,
      clientName: useData.clientName,
      clientPhoneNumber: useData.clientPhoneNumber,
      clientEmail: useData.clientEmail,
    }
    dispatch(postSession({ departmentId: DepartmentId, data }))
  }

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IEvents = {
      serviceName: useData.serviceName,
      visitDate: useData.visitDate,
      startTime: useData.startTime,
      endTime: useData.endTime,
      employeeId: useData.employeeId,
      clientName: useData.clientName,
      clientPhoneNumber: useData.clientPhoneNumber,
      clientEmail: useData.clientEmail,
    }
    dispatch(putSession({ sessionsId: useData.sessionId, data }))
  }

  return {
    useData,
    EmployeeList,
    handleEditSubmit,
    handleSelectEmployeeChange,
    setUseData,
    handleSubmit,
  }
}
