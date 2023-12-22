import s from './CategoryCompany.module.scss'
import { Button } from 'components/UI/Button/Button.tsx'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { Loading } from 'components/loading/Loading.tsx'
import { useEffect, useState } from 'react'
import {
  createCategory,
  delIdCategory,
  getAllCategories,
} from 'store/reducers/Category/CategoryActionCreators.ts'
import Map from 'components/map/Map.tsx'
import { useParams } from 'react-router-dom'
import { NavButton } from 'components/UI/NavButton/NavButton.tsx'
import { SERVICE_COMPANY } from 'utils/constsRoutes.ts'
import { getIdDepartment } from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import Input from 'components/inputs/input/Input.tsx'

export const CategoryCompany = () => {
  const dispatch = useTypedDispatch()
  const { data, departmentId, isLoading, error } = useTypedSelector(
    (state) => state.categoryReducer
  )
  const { dataId } = useTypedSelector((state) => state.departmentReducer)

  const { id } = useParams()

  const [useData, setUseData] = useState({
    isNewCategory: false,
    newCategoryName: '',
  })

  const handleAddCategory = () => {
    setUseData({ ...useData, isNewCategory: true })
  }

  const handleCancelAddCategory = () => {
    setUseData((prevState) => ({
      ...prevState,
      isNewCategory: false,
      newCategoryName: '',
    }))
  }

  const handleSaveCategory = () => {
    dispatch(
      createCategory({ departmentId: departmentId, name: useData.newCategoryName })
    )
    setUseData((prevState) => ({
      ...prevState,
      isNewCategory: true,
      newCategoryName: '',
    }))
  }

  useEffect(() => {
    dispatch(getIdDepartment({ Id: id }))
    dispatch(getAllCategories({ departmentId: id }))
  }, [dispatch])

  return (
    <>
      <div className={s.container}>
        {isLoading && <Loading />}
        {error && <h1>{error}</h1>}
        {!isLoading && !error && (
          <>
            <div className={s.title}>
              <h2>{dataId?.name}</h2>
            </div>
            <div className={s.info}>
              <div className={s.main}>
                <h2>Информация</h2>
                <span>Сфера деятельности: {dataId?.businessArea}</span>
                <span>Номер телефона: {dataId?.phoneNumber}</span>
                <span>Адрес: {dataId?.location.address}</span>
                <span>
                  Режим работы: {dataId?.workMode.startTime} - {dataId?.workMode.endTime}
                </span>
              </div>
              <div className={s.map}>
                <Map
                  latitude={dataId?.location.latitude}
                  longitude={dataId?.location.longitude}
                />
              </div>
            </div>
            <div className={s.list}>
              {data.length == 0 && !useData.isNewCategory ? (
                <>
                  <h2>Категории отсутствуют</h2>
                  <Button children={'Создать'} onClick={handleAddCategory} />
                </>
              ) : (
                <>
                  <div className={s.title}>
                    <h2>Категории:</h2>
                    {data.length != 0 && (
                      <Button children={'Создать'} onClick={handleAddCategory} />
                    )}
                  </div>
                  {useData.isNewCategory && (
                    <div className={s.element}>
                      <Input
                        label={'Введите название'}
                        value={useData.newCategoryName}
                        onChange={(e) =>
                          setUseData({ ...useData, newCategoryName: e.target.value })
                        }
                      />
                      <div>
                        <Button onClick={handleSaveCategory}>Сохранить</Button>
                        <Button onClick={handleCancelAddCategory}>Отменить</Button>
                      </div>
                    </div>
                  )}
                  {data.map((res) => (
                    <div className={s.element} key={res.id}>
                      {res.name}
                      <div className={s.buttons}>
                        <NavButton
                          route={SERVICE_COMPANY + '/' + res.id}
                          children={'Посмотреть'}
                        />
                        <Button
                          children={'Удалить'}
                          onClick={() =>
                            dispatch(delIdCategory({ departmentId: res.id }))
                          }
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
