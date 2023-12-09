import { FC } from 'react'
import Input from 'components/inputs/input/Input'
import classes from './ConfirmPassword.module.scss'
import Button from 'components/button/Button.tsx'

export const ConfirmPassword: FC = () => {
  return (
    <div className={classes.confirm_password_container}>
      <div>Подтвердить Пароль</div>
      <Input label="Новый пароль" />
      <Input label="Подтвердите пароль" />
      <Button>Отправить</Button>
    </div>
  )
}
