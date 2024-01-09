import React, { SetStateAction } from 'react'
import s from './UserInfoBlock.module.scss'
import { Button } from 'components/UI/Button/Button.tsx'

interface UserInfoBlockProps {
  name: string
  email: string
  city: string | null
  emailConfirmed: boolean
  setModalActive: React.Dispatch<SetStateAction<boolean>>
}

const UserInfoBlock: React.FC<UserInfoBlockProps> = ({
  name,
  email,
  city,
  emailConfirmed,
  setModalActive,
}) => (
  <div className={s.infoUser}>
    <p>Имя: {name}</p>
    <p>Почта: {email}</p>
    <p>Город: {city ?? 'Отсутствует'}</p>
    {!emailConfirmed && <p>Почта подтверждена: Нет</p>}
    <Button onClick={() => setModalActive(true)} children={'Редактировать данные'} />
  </div>
)

export default UserInfoBlock
