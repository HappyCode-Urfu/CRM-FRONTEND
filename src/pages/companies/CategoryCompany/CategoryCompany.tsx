import s from './CategoryCompany.module.scss'
import { Button } from 'components/UI/Button/Button.tsx'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { Loading } from 'components/loading/Loading.tsx'
import { useEffect, useState } from 'react'
import {
  createCategory,
  getAllCategories,
} from 'store/reducers/Category/CategoryActionCreators.ts'
import { Input } from 'components/UI/input/Input.tsx'

export const CategoryCompany = () => {
  const dispatch = useTypedDispatch()
  const {
    data,
    departmentId,
    isLoading,
    error,
    name: departmentName,
  } = useTypedSelector((state) => state.categoryReducer)

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
    dispatch(getAllCategories({ departmentId }))
  }, [dispatch, departmentId])

  console.log(departmentId)
  return (
    <>
      <div className={s.container}>
        {isLoading && <Loading />}
        {error && <h1>{error}</h1>}
        {!isLoading && !error && (
          <>
            <div className={s.title}>
              <h2>{departmentName}</h2>
              {data.length != 0 && (
                <Button children={'Создать'} onClick={handleAddCategory} />
              )}
            </div>
            <div className={s.list}>
              {data.length == 0 && !useData.isNewCategory ? (
                <>
                  <h2>Категории отсутствуют</h2>
                  <Button children={'Создать'} onClick={handleAddCategory} />
                </>
              ) : (
                <>
                  {useData.isNewCategory && (
                    <div className={s.element}>
                      <Input
                        name={'Введите название'}
                        value={useData.newCategoryName}
                        onChange={(e) =>
                          setUseData({ ...useData, newCategoryName: e.target.value })
                        }
                      />
                      <Button onClick={handleSaveCategory}>Сохранить</Button>
                      <Button onClick={handleCancelAddCategory}>Отменить</Button>
                    </div>
                  )}
                  {data.map((res) => (
                    <div className={s.element} key={res.id}>
                      {res.name}
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
