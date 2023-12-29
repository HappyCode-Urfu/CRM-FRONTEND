import { FC, useState } from 'react'
import classes from './Registration.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { CABINET_ROUTE, LOGIN, NOT_FOUND } from 'utils/constsRoutes.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { TRegister } from 'models/Registration.ts'
import { TLogin } from 'models/Auth.ts'
import { ResponseRegistration } from 'models/Registration.ts'
import Input from 'components/inputs/input/Input.tsx'
import Button from 'components/button/Button.tsx'
import { Controller, useForm } from 'react-hook-form'
import { registerUser } from 'store/reducers/registration/RegistrationActionCreator.ts'
import { login } from 'store/reducers/auth/AuthActionCreator.ts'
import PasswordInput from 'components/inputs/passwordInput/PasswordInput.tsx'

const Registration: FC = () => {
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()
  const isError = useTypedSelector((state) => state.registrationSlice.isError)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TRegister>({
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (values: TRegister) => {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const response = await dispatch(registerUser(values))
      const responseData: ResponseRegistration = response.payload as ResponseRegistration
      console.log(responseData)

      if (responseData.status === 200) {
        const { email, password } = values

        const modal: TLogin = {
          username: email,
          password: password,
          client_secret: 'secret',
          client_id: 'frontend',
          grant_type: 'password',
        }

        dispatch(login(modal))
        console.log('modal', modal)
        navigate(CABINET_ROUTE)
      }
    } catch (e) {
      navigate(NOT_FOUND)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={classes.page_container}>
        <div className={classes.register_container}>
          <div className={classes.header_register}>Регистрация</div>{' '}
          {isError && (
            <p className={classes.bad_request}>
              Пользователь с таким email уже зарегистрирован
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form_container}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 3,
                  message: 'Имя должно содержать не менее 3 символов',
                },
                maxLength: {
                  value: 50,
                  message: 'Имя не должно содержать более 50 символов',
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-я]+$/,
                  message: 'Имя может содержать только буквы',
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  isError={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label="Имя"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
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
                  message: 'Пароль не должен превышать 30 символов',
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-я0-9]+$/,
                  message: 'Пароль может содержать только буквы и цифры',
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
              <Button type="submit" disabled={!isValid}>
                {loading ? 'Загрузка...' : 'Зарегистрироваться'}
              </Button>
            </div>
          </form>
          <div className={classes.account_container}>
            <div className={classes.text_account}>Есть учетная запись?</div>
            <Link to={LOGIN} className={classes.link_sign_in}>
              Войти
            </Link>
          </div>
        </div>
      </div>
      {isError}
    </>
  )
}

export default Registration
