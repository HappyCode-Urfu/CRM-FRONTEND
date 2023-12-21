import s from './Cabinet.module.scss'
import { InfoUser } from 'components/cabinet-module/Info/infoUser/InfoUser.tsx'
import { InfoCompany } from 'components/cabinet-module/Info/infoCompany/InfoCompany.tsx'

export const Cabinet = () => {
  return (
    <div className={s.container}>
      <div className={s.info}>
        <InfoUser />
        <InfoCompany />
      </div>
    </div>
  )
}
