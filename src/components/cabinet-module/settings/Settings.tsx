import s from './Settings.module.scss'
import { ChangeUserData } from 'components/cabinet-module/settings/changeUserData/ChangeUserData.tsx'
import { ChangeUserPassword } from 'components/cabinet-module/settings/changeUserPassword/ChangeUserPassword.tsx'
import { ChangeUserEmail } from 'components/cabinet-module/settings/changeUserEmail/ChangeUserEmail.tsx'

export const Settings = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>Настройки</div>
      <ChangeUserData />
      <ChangeUserPassword />
      <ChangeUserEmail />
    </div>
  )
}
