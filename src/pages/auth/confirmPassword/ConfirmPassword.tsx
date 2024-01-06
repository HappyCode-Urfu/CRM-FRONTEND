import { FC } from 'react'
import Input from 'components/fields/input/Input'
import classes from './ConfirmPassword.module.scss'
import Button from 'components/button/Button.tsx'

const ConfirmPassword: FC = () => {
  return (
    <div className={classes.confirm_password_container}>
      <div>Подтвердить Пароль</div>
      <Input label="Новый пароль" />
      <Input label="Подтвердите пароль" />
      <Button>Отправить</Button>
    </div>
  )
}

export default ConfirmPassword
