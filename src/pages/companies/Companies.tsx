import s from './Companies.module.scss'
import { CreateForm } from 'components/company/CreateForm/CreateForm.tsx'

export const Companies = () => {
  return (
    <div className={s.container}>
      <CreateForm />
    </div>
  )
}
