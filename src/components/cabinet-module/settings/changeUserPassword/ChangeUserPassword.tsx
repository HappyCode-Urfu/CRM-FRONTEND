import s from './ChangeUserPassword.module.scss'
import { Input } from 'components/cabinet-module/UI/input/Input.tsx'
import { Button } from 'components/cabinet-module/UI/Button/Button.tsx'
import { UseCabinetModule } from 'components/cabinet-module/hooks/useCabinetModule.ts'

export const ChangeUserPassword = () => {
  const { userData, setUserData, handleSubmitUserPassword } = UseCabinetModule()
  return (
    <form onSubmit={handleSubmitUserPassword} className={s.container}>
      <h2>Изменить пароль</h2>
      <Input
        children={'Старый пароль'}
        onChange={(e) =>
          setUserData({ ...userData, old_password: e.target.value })
        }
      />
      <Input
        children={'Новый пароль'}
        onChange={(e) =>
          setUserData({ ...userData, new_password: e.target.value })
        }
      />
      <Input
        children={'Подтвердить пароль'}
        onChange={(e) =>
          setUserData({ ...userData, confirm_password: e.target.value })
        }
      />
      <Button type={'submit'} children={'Изменить пароль'} />
    </form>
  )
}
