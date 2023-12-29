import s from './Companies.module.scss'
import { CreateForm } from 'components/company/CreateForm/CreateForm.tsx'
import { memo } from 'react'

const Companies = memo(() => {
  return (
    <div className={s.container}>
      <CreateForm />
    </div>
  )
})

export default Companies
