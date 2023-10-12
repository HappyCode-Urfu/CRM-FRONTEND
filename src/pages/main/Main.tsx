import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts'
import { useEffect } from 'react'
import { fetchUsers } from 'store/reducers/ActionCreators.ts'

export const Main = () => {
  const dispatch = useAppDispatch()
  const { users, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  )
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  return (
    <div>
      {isLoading && <h1>Идёт загрузка...</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users, null, 2)}
    </div>
  )
}
