import { FC, FormEvent, useState } from 'react'
import classes from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
import { REGISTRATION } from 'utils/constsRoutes.ts'
import { RootState } from 'store/store.ts'
import { ChangeEvent } from 'react'
import { login } from 'store/reducers/AuthSlice.ts'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux.ts'

export const Login: FC = () => {
  const navigate = useNavigate()

  const dispatch = useTypedDispatch()

  const isLoading = useTypedSelector((state: RootState) => state.auth.isLoading)

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })

  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name]: value,
    })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(loginForm))
  }

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit}>
        <div className={classes.header_container}>Авторизация</div>
        <div className={classes.input_container}>
          <label>Login</label>
          <input
            name="email"
            value={loginForm.email}
            type="email"
            onChange={handlerInput}
          />
        </div>
        <div className={classes.input_container}>
          <label>Password</label>
          <input
            name="password"
            value={loginForm.password}
            type="password"
            onChange={handlerInput}
          />
        </div>
        <div className={classes.button_container}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Отправляется...' : 'Отправить'}
          </button>
        </div>
        <div
          className={classes.sign_up_container}
          onClick={() => navigate(REGISTRATION)}
        >
          Cоздать новый аккаунт
        </div>
      </form>
    </div>
  )
}
