import { FC, FormEvent } from 'react'
import classes from './Registration.module.scss'
import { useNavigate } from 'react-router-dom'
import { CABINET_ROUTE, LOGIN, NOT_FOUND } from 'utils/constsRoutes.ts'
import { RootState } from 'store/store.ts'
import {
  registerUser,
  ResponseData,
  TRegister,
} from 'store/reducers/RegistarationSlice.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import Input from 'components/inputs/Input.tsx'
import { useInput } from 'hooks/useInput.ts'
import { login, TLogin } from 'store/reducers/auth/AuthSlice.ts'

export const Registration: FC = () => {
  const navigate = useNavigate()

  const dispatch = useTypedDispatch()

  const isLoading = useTypedSelector((state: RootState) => state.registration.isLoading)

  const { values, handleChange } = useInput<TRegister>({
    name: '',
    email: '',
    password: '',
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await dispatch(registerUser(values))
      const responseData: ResponseData = response.payload as ResponseData
      console.log(responseData)

      if (!isLoading && responseData.status === 200) {
        const { email, password } = values

        const modal: TLogin = {
          username: email,
          password: password,
          client_secret: 'secret',
          client_id: 'frontend',
          grant_type: 'password',
        }
        dispatch(login(modal))
        navigate(CABINET_ROUTE)
      }
    } catch (e) {
      navigate(NOT_FOUND)
    }
  }

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit}>
        <div className={classes.header_container}>Регистрация</div>
        <Input label="Имя" name="name" value={values.name} onChange={handleChange} />
        <Input label="Email" name="email" value={values.email} onChange={handleChange} />
        <Input
          type="password"
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <div className={classes.button_container}>
          <button className={classes.button} type="submit" disabled={isLoading}>
            {isLoading ? 'Отправляется...' : 'Зарегистрироваться'}
          </button>
        </div>
        <div className={classes.acc}>
          <div className={classes.text_acc}>Есть учетная запись?</div>
          <button className={classes.button_acc} onClick={() => navigate(LOGIN)}>
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}
