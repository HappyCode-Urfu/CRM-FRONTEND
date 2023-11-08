import s from './InfoUser.module.scss'
import Avatar from 'assets/icon/avatar.svg'

export const InfoUser = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>Личные данные</div>
      <div className={s.block}>
        <div className={s.avatar}>
          <img src={Avatar} alt="avatar" />
        </div>
        <div className={s.infoUser}>
          <p>Имя</p>
          <p>+7(999)-333-22-11</p>
          <p>user@mail.ru</p>
        </div>
      </div>
    </div>
  )
}
