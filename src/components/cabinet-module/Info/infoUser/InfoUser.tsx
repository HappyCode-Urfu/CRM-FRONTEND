import s from './InfoUser.module.scss'
import Avatar from 'assets/icon/avatar.svg'
import { Button } from 'components/UI/Button/Button.tsx'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { Loading } from 'components/loading/Loading.tsx'
import { useEffect } from 'react'
import { getInfoUser } from 'store/reducers/Account/AccountActionCreator.ts'

export const InfoUser = () => {
  const dispatch = useTypedDispatch()
  const { data, error, isLoading } = useTypedSelector((state) => state.accountReducer)

  useEffect(() => {
    dispatch(getInfoUser())
  }, [dispatch])

  return (
    <div className={s.container}>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <div className={s.title}>Личные данные</div>
          <div className={s.block}>
            <div className={s.avatar}>
              <img src={Avatar} alt="avatar" />
            </div>
            <div className={s.infoUser}>
              <p>
                ФИО: {data.surname ? data.surname : ''} {data.name}{' '}
                {data.patronymic ? data.patronymic : ''}
              </p>
              <p>Почта: {data.email}</p>
              <p>Город: {data.city !== null ? data.city : 'Отсутствует'}</p>
              {data.emailConfirmed === true ? '' : <p>Почта подтверждена: Нет</p>}
              <Button children={'Редактировать данные'} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
