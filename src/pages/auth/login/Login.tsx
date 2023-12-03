import { FC, useState } from 'react'
import classes from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import {
  CABINET_ROUTE,
  FORGOT_PASSWORD,
  NOT_FOUND,
  REGISTRATION,
} from 'utils/constsRoutes.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { login } from 'store/reducers/auth/AuthActionCreator.ts'
import { ResponseLogin, TLogin } from 'models/Auth.ts'
import { Button } from 'components/button/Button.tsx'
import { Controller, useForm } from 'react-hook-form'
import Input from 'components/inputs/input/Input.tsx'
import PasswordInput from 'components/inputs/passwordInput/PasswordInput.tsx'

export const Login: FC = () => {
  const navigate = useNavigate()

  const dispatch = useTypedDispatch()

  const isError = useTypedSelector((state) => state.authSlice.isError)

  const [loadingLoginForm, setLoadingLoginForm] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<TLogin>({
    defaultValues: {
      username: '',
      password: '',
      grant_type: 'password',
      client_id: 'frontend',
      client_secret: 'secret',
    },
    mode: 'onSubmit',
  })

  const onSubmit = async (values: TLogin) => {
    if (loadingLoginForm) {
      return
    }

    setLoadingLoginForm(true)

    try {
      const response = await dispatch(login(values))
      const responseStatus: ResponseLogin = response.payload as ResponseLogin
      console.log(responseStatus)

      if (responseStatus.status === 200) {
        navigate(CABINET_ROUTE)
      }
    } catch (e) {
      navigate(NOT_FOUND)
    } finally {
      setLoadingLoginForm(false)
    }
  }

  return (
    <>
      <div className={classes.page}>
        <div className={classes.container}>
          <div className={classes.header_container}>Вход</div>
          {isError && <p className={classes.bad_request}>Неверный логин или пароль</p>}
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form_container}>
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'Поле обязательно к заполнению',
                maxLength: {
                  value: 60,
                  message: 'Email не должен превышать 60 символов',
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'Введите действительный адрес электронной почты',
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  isError={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label="Email"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 8,
                  message: 'Пароль должен содержать не менее 8 символов',
                },
                maxLength: {
                  value: 30,
                  message: 'Пароль должен содержать не более 30 символов',
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-я0-9]+$/,
                  message: 'Пароль должен содержать только буквы и цифры',
                },
              }}
              render={({ field, fieldState }) => (
                <PasswordInput
                  {...field}
                  isError={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label="Password"
                />
              )}
            />
            <div>
              <Link to={FORGOT_PASSWORD} className={classes.forgot_password}>
                Забыли пароль?
              </Link>
            </div>
            <Button type="submit" disabled={isValid}>
              {loadingLoginForm ? 'Загрузка...' : 'Войти'}
            </Button>
            <div className={classes.not_account}>
              <div className={classes.not_acc_text}>Нет аккаунта?</div>
              <Link to={REGISTRATION} className={classes.link_sign_up}>
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
