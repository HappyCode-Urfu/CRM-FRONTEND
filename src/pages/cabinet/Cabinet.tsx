import s from './Cabinet.module.scss'
import { InfoUser } from 'components/cabinet-module/Info/infoUser/InfoUser.tsx'
import { InfoCompany } from 'components/cabinet-module/Info/infoCompany/InfoCompany.tsx'
import { memo } from 'react'

const Cabinet = memo(() => {
  return (
    <div className={s.container}>
      <div className={s.info}>
        <InfoUser />
        <InfoCompany />
      </div>
    </div>
  )
})

export default Cabinet
