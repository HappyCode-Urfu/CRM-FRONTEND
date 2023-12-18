import s from './InfoCompany.module.scss'
import { NavButton } from 'components/UI/NavButton/NavButton.tsx'
import { CATEGORY_COMPANY, COMPANIES_ROUTE } from 'utils/constsRoutes.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { useEffect } from 'react'
import { getDepartment } from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { Loading } from 'components/loading/Loading.tsx'
import { categorySlice } from 'store/reducers/Category/CategorySlice.ts'

export const InfoCompany = () => {
  const dispatch = useTypedDispatch()
  const { selectDepartmentId, selectName } = categorySlice.actions
  const { data, isLoading, error } = useTypedSelector((state) => state.departmentReducer)

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

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
                    <NavButton
                      onClick={() => {
                        dispatch(selectDepartmentId(res.id))
                        dispatch(selectName(res.name))
                      }}
                      route={CATEGORY_COMPANY}
                      children={'Список категорий'}
                    />
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
