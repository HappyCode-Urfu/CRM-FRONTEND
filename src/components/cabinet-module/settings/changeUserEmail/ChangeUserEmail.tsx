import s from './ChangeUserEmail.module.scss'
import { Input } from 'components/cabinet-module/UI/input/Input.tsx'
import { Button } from 'components/cabinet-module/UI/Button/Button.tsx'
import { UseCabinetModule } from 'components/cabinet-module/hooks/useCabinetModule.ts'

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
