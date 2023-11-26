import s from './InfoUser.module.scss'
import Avatar from 'assets/icon/avatar.svg'
import { Button } from 'components/UI/Button/Button.tsx'

export const InfoUser = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>Личные данные</div>
      <div className={s.block}>
        <div className={s.avatar}>
          <img src={Avatar} alt="avatar" />
        </div>
        <div className={s.infoUser}>
          <p>ФИО: Власов Игорь Александрович </p>
          <p>Номер Телефона: +7(999)-333-22-11</p>
          <p>Почта: user@mail.ru</p>
          <Button children={'Редактировать данные'} />
        </div>
      </div>
    </div>
  )
}
