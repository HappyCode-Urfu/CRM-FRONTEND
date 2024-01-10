import { FC, useState } from 'react'
import classes from './Registration.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { CABINET_ROUTE, LOGIN, NOT_FOUND } from 'utils/constsRoutes.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { TRegister } from 'models/Registration.ts'
import { TLogin } from 'models/Auth.ts'
import { ResponseRegistration } from 'models/Registration.ts'
import Input from 'components/fields/input/Input.tsx'
import Button from 'components/button/Button.tsx'
import { Controller, useForm } from 'react-hook-form'
import { registerUser } from 'store/reducers/registration/RegistrationActionCreator.ts'
import { login } from 'store/reducers/auth/AuthActionCreator.ts'
import PasswordInput from 'components/fields/passwordInput/PasswordInput.tsx'
import {
  emailRegEx,
  maxLengthEmailMessage,
  maxLengthNameMessage,
  maxLengthPasswordMessage,
  minLengthNameMessage,
  minLengthPasswordMessage,
  nameRegEX,
  passwordRegEx,
  requiredField,
  validationEmailMessage,
  validationNameMessage,
  validationPasswordMessage,
} from 'utils/const.ts'

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
                required: requiredField,
                minLength: {
                  value: 3,
                  message: minLengthNameMessage,
                },
                maxLength: {
                  value: 50,
                  message: maxLengthNameMessage,
                },
                pattern: {
                  value: nameRegEX,
                  message: validationNameMessage,
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
                required: requiredField,
                maxLength: {
                  value: 60,
                  message: maxLengthEmailMessage,
                },
                pattern: {
                  value: emailRegEx,
                  message: validationEmailMessage,
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
                required: requiredField,
                minLength: {
                  value: 8,
                  message: minLengthPasswordMessage,
                },
                maxLength: {
                  value: 30,
                  message: maxLengthPasswordMessage,
                },
                pattern: {
                  value: passwordRegEx,
                  message: validationPasswordMessage,
                },
              }}
              render={({ field, fieldState }) => (
                <PasswordInput
                  {...field}
                  isError={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label="Пароль"
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
