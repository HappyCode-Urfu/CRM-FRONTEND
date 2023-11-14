import { FC, FormEvent } from 'react'
import classes from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
import {
  CABINET_ROUTE,
  FORGOT_PASSWORD,
  NOT_FOUND,
  REGISTRATION,
} from 'utils/constsRoutes.ts'
import { RootState } from 'store/store.ts'
import { login, Response, TLogin } from 'store/reducers/auth/AuthSlice.ts'
import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux.ts'
import Input from 'components/inputs/Input.tsx'
import Button from 'components/button/Button.tsx'
import { useInput } from '../../../hooks/useInput.ts'

export const Login: FC = () => {
  const navigate = useNavigate()

  const dispatch = useTypedDispatch()

  const isLoading = useTypedSelector((state: RootState) => state.auth.isLoading)

  const { values, handleChange } = useInput<TLogin>({
    username: '',
    password: '',
    grant_type: 'password',
    client_id: 'frontend',
    client_secret: 'secret',
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await dispatch(login(values))
    const responseStatus: Response = response.payload as Response
    console.log(responseStatus)

    if (!isLoading && responseStatus.status === 200) {
      navigate(CABINET_ROUTE)
    } else {
      navigate(NOT_FOUND)
    }
  }

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit}>
        <div className={classes.header_container}>Вход</div>
        <Input
          label="Email"
          name="username"
          value={values.username}
          type="email"
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          value={values.password}
          type="password"
          onChange={handleChange}
        />
        <div className={classes.checkbox}>
          <div className={classes.remember_me}>
            <input type="checkbox" />
            <div className={classes.text_checkbox}>Запомнить меня</div>
          </div>
          <div
            onClick={() => navigate(FORGOT_PASSWORD)}
            className={classes.sign_up_container}
          >
            Забыли пароль?
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Отправляется...' : 'Войти'}
        </Button>
        <div className={classes.not_acc}>
          <div className={classes.not_acc_text}>Нет аккаунта?</div>
          <button
            className={classes.not_acc_button}
            onClick={() => navigate(REGISTRATION)}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  )
}
