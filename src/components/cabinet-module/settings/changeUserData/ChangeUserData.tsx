import s from './ChangeUserData.module.scss'

import { UseCabinetModule } from 'components/cabinet-module/hooks/useCabinetModule.ts'
import { Input } from 'components/UI/input/Input.tsx'
import { Button } from 'components/UI/Button/Button.tsx'

export const ChangeUserData = () => {
  const { userData, setUserData, handleSubmitUserData } = UseCabinetModule()
  return (
    <form onSubmit={handleSubmitUserData} className={s.container}>
      <h2>Личные данные</h2>
      <Input
        children={'Имя'}
        onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
      />
      <Input
        children={'Фамилия'}
        onChange={(e) => setUserData({ ...userData, middle_name: e.target.value })}
      />
      <Input
        children={'Отчество'}
        onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
      />
      <Button type={'submit'} children={'Изменить данные'} />
    </form>
  )
}
