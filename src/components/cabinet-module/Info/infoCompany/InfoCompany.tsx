import s from './InfoCompany.module.scss'
import { NavButton } from 'components/UI/NavButton/NavButton.tsx'
import { COMPANIES_ROUTE } from 'utils/constsRoutes.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { useEffect } from 'react'
import { getDepartment } from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { Loading } from 'components/loading/Loading.tsx'

export const InfoCompany = () => {
  const dispatch = useTypedDispatch()
  const { data, isLoading, error } = useTypedSelector((state) => state.departmentReducer)

  useEffect(() => {
    dispatch(getDepartment())
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <div className={s.container}>
            <div className={s.title}>Ваши филиалы</div>
            <div className={s.block}>
              <div className={s.infoCompany}>
                <p>Cписок филиалов:</p>
              </div>
              <div className={s.companyList}>
                {data.map((res, index) => (
                  <div key={res.id}>
                    <p>{index + 1}</p>
                    <p>{res.name}</p>
                  </div>
                ))}
              </div>
              <div className={s.route}>
                <NavButton route={COMPANIES_ROUTE} children={'Создать филиал'} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
