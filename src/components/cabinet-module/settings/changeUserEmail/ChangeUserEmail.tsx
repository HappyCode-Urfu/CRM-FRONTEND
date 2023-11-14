import s from './ChangeUserEmail.module.scss'

import { UseCabinetModule } from 'components/cabinet-module/hooks/useCabinetModule.ts'
import { Input } from 'components/UI/input/Input.tsx'
import { Button } from 'components/UI/Button/Button.tsx'

export const ChangeUserEmail = () => {
  const { userData, setUserData, handleSubmitUserEmail } = UseCabinetModule()
  return (
    <form onSubmit={handleSubmitUserEmail} className={s.container}>
      <h2>Изменить почту</h2>
      <Input
        children={'Новая почта'}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <Button type={'submit'} children={'Изменить почту'} />
    </form>
  )
}
