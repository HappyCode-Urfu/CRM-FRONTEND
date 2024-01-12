import { ChangeEvent, FormEvent, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { postSession, putSession } from 'store/reducers/Events/ActionCreators.ts'
import { IEvents } from 'models/IEvents.ts'

interface IForms {
  formType: string
  hoveredTime?: string | null
  hoveredColumn?: string | null
}

export const useForms = ({ hoveredTime, hoveredColumn, formType }: IForms) => {
  const { eventId } = useTypedSelector((state) => state.eventReducer)
  const { data } = useTypedSelector((state) => state.serviceReducer)
  const ServiceList = data.map((val) => ({
    value: val.id,
    label: val.name,
  }))
  const dispatch = useTypedDispatch()
  const [useData, setUseData] = useState({
    sessionId: formType === 'edit' ? eventId.sessionId : '',
    serviceId: formType === 'edit' ? eventId.serviceId : '',
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

  console.log(useData)

  const { dataId: DepartmentId } = useTypedSelector((state) => state.departmentReducer)

  const handleSelectEmployeeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUseData({ ...useData, employeeId: event.target.value })
  }

  const handleSelectServiceNameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUseData({ ...useData, serviceName: event.target.value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IEvents = {
      serviceId: useData.serviceId,
      visitDate: useData.visitDate,
      startTime: useData.startTime,
      endTime: useData.endTime,
      employeeId: useData.employeeId,
      clientName: useData.clientName,
      clientPhoneNumber: useData.clientPhoneNumber,
      clientEmail: useData.clientEmail,
    }
    dispatch(postSession({ departmentId: DepartmentId?.id, data }))
  }

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IEvents = {
      serviceId: useData.serviceId,
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
    ServiceList,
    handleSelectServiceNameChange,
    handleEditSubmit,
    handleSelectEmployeeChange,
    setUseData,
    handleSubmit,
  }
}
