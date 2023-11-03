import { ChangeEvent, FC, FormEvent, useState } from 'react'
import classes from './Registration.module.scss'
import { useNavigate } from 'react-router-dom'
import { LOGIN } from 'utils/constsRoutes.ts'
import { RootState } from 'store/store.ts'
import { registerUser } from 'store/reducers/RegistarationSlice.ts'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux.ts'

export const Registration: FC = () => {
  const navigate = useNavigate()

  const dispatch = useTypedDispatch()

  const isLoading = useTypedSelector(
    (state: RootState) => state.registration.isLoading
  )

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'fullName') {
      const [firstName, lastName, middleName] = value.split(' ')
      setFormData({
        ...formData,
        firstName,
        lastName,
        middleName,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { firstName, lastName, middleName, email, password } = formData
    console.log({ firstName, lastName, middleName, email, password })
    dispatch(
      registerUser({
        firstName,
        lastName,
        middleName,
        email,
        password,
      })
    )
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div className={classes.header_container}>Регистрация</div>
        <div className={classes.input_container}>
          <label>ФИО</label>
          <input
            name="fullName"
            value={
              formData.firstName +
              ' ' +
              formData.lastName +
              ' ' +
              formData.middleName
            }
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.input_container}>
          <label>Почта</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.input_container}>
          <label>Пароль</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.button_container}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Отправляется...' : 'Отправить'}
          </button>
        </div>
        <div
          className={classes.sign_in_container}
          onClick={() => navigate(LOGIN)}
        >
          Есть аккаунт?
        </div>
      </form>
    </div>
  )
}
