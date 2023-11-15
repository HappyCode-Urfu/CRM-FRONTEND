import { FC } from 'react'
import Input from 'components/inputs/Input.tsx'
import Button from 'components/button/Button.tsx'
import classes from './ForgotPassword.module.scss'
import { useNavigate } from 'react-router-dom'
import { INFORMATION_USER } from 'utils/constsRoutes.ts'

export const ForgotPassword: FC = () => {
  const navigate = useNavigate()
  return (
    <div className={classes.forgot_password_container}>
      <div>Забыли пароль</div>
      <Input label="Email" />
      <Button onClick={() => navigate(INFORMATION_USER)}>Отправить</Button>
    </div>
  )
}
