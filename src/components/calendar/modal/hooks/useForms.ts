import { ChangeEvent, FormEvent, useState } from 'react'
import { useTypedDispatch } from 'hooks/redux.ts'
import {
  postSession,
  putSession,
  delSession,
} from 'store/reducers/Events/ActionCreators.ts'
import { Option } from 'components/UI/Select/Select.tsx'
import { IEvents } from 'models/IEvents.ts'

interface IForms {
  hoveredTime?: string | null
  hoveredColumn?: string | null
}

export const useForms = ({ hoveredTime, hoveredColumn }: IForms) => {
  const dispatch = useTypedDispatch()
  const EmployeeList = JSON.parse(localStorage.getItem('Employee') || '[]') as Option[]
  const DepartmentId = JSON.parse(localStorage.getItem('departmentId') || '')
  const [useData, setUseData] = useState({
    sessionId: '',
    serviceName: '',
    visitDate: hoveredColumn ?? '',
    startTime: hoveredTime ?? '',
    endTime: '',
    employeeId: '',
    clientName: '',
    clientPhoneNumber: '',
    clientEmail: '',
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

  return {
    useData,
    EmployeeList,
    handleSelectEmployeeChange,
    setUseData,
    handleSubmit,
  }
}
