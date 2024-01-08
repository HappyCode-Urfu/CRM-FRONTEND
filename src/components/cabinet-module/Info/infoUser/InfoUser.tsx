import s from './InfoUser.module.scss'
import Avatar from 'assets/icon/avatar.svg'
import { Button } from 'components/UI/Button/Button.tsx'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { Loading } from 'components/loading/Loading.tsx'
import { memo, useEffect, useRef, useState, ChangeEvent } from 'react'
import { getInfoUser, sendAvatar } from 'store/reducers/Account/AccountActionCreator.ts'
import { toast } from 'react-toastify'

export const InfoUser = memo(() => {
  const dispatch = useTypedDispatch()
  const { data, error, isLoading, avatarUrl } = useTypedSelector(
    (state) => state.accountReducer
  )
  const [img, setImg] = useState<File | null>(null)
  const fileRef = useRef<null | HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(getInfoUser())
  }, [dispatch])

  const toggleBlock = () => {
    if (fileRef.current) {
      fileRef.current.style.display = show ? 'none' : 'block'
      setShow(!show)
    }
  }

  const handleUpload = async () => {
    if (img) {
      const formData = new FormData()
      formData.append('userId', data.id)
      formData.append('image', img)
      dispatch(sendAvatar(formData))
    } else {
      toast('Выберите изображение перед тем как его сохранить')
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0])
      toast('Сохраните изображение')
    }
  }

  return (
    <div className={s.container}>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <div className={s.title}>Личные данные</div>
          <div className={s.block}>
            <div className={s.avatar}>
              <img
                src={avatarUrl ?? localStorage.getItem('avatarUrl') ?? Avatar}
                alt="user-avatar"
                onClick={toggleBlock}
              />
              <div ref={fileRef} className={s.fileList}>
                <div className={s.file_container}>
                  <label className={s.label_container}>
                    Выбрать
                    <input className={s.input} onChange={handleImageChange} type="file" />
                  </label>
                  <span className={s.send} onClick={handleUpload}>
                    Сохранить
                  </span>
                </div>
              </div>
            </div>
            <div className={s.infoUser}>
              <p>
                ФИО: {data.surname ? data.surname : ''} {data.name}{' '}
                {data.patronymic ? data.patronymic : ''}
              </p>
              <p>Почта: {data.email}</p>
              <p>Город: {data.city ?? 'Отсутствует'}</p>
              {data.emailConfirmed === true ? '' : <p>Почта подтверждена: Нет</p>}
              <Button children={'Редактировать данные'} />
            </div>
          </div>
        </>
      )}
    </div>
  )
})
