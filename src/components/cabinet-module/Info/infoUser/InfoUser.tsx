import { memo } from 'react'
import s from './InfoUser.module.scss'
import ModalUniversal from 'components/cabinet-module/Info/infoUser/ModalUpdateInfoUser/ModalUniversal.tsx'
import { Loading } from 'components/loading/Loading.tsx'
import Input from 'components/fields/input/Input.tsx'
import AvatarBlock from 'components/cabinet-module/Info/infoUser/avatarBlock/AvatarBlock.tsx'
import UserInfoBlock from 'components/cabinet-module/Info/infoUser/userInfoBlock/UserInfoBlock.tsx'
import { useInfoUser } from 'components/cabinet-module/Info/infoUser/hooks/useInfoUser.ts'
import Button from 'components/button/Button.tsx'
import Image from '../../../../assets/icon/account.svg'

export const InfoUser = memo(() => {
  const {
    selectedImage,
    nestedModalActive,
    data,
    fileRef,
    error,
    isLoading,
    avatarUrl,
    modalActive,
    values,
    handleChange,
    handleUpload,
    handleImageChange,
    handleSubmit,
    setModalActive,
    setNestedModalActive,
  } = useInfoUser()

  return (
    <div className={s.container}>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <div className={s.title}>Личные данные</div>
          <div className={s.block}>
            <AvatarBlock
              data={data}
              avatarUrl={avatarUrl}
              onImageChange={handleImageChange}
              onUpload={handleUpload}
              fileRef={fileRef}
              setNestedModalActive={setNestedModalActive}
            />

            <ModalUniversal active={nestedModalActive} setActive={setNestedModalActive}>
              <div className={s.modal_avatar_container}>
                <div className={s.avatar_container}>
                  <img
                    src={selectedImage ?? (data.downloadLink || Image)}
                    alt="Update-avater"
                  />
                  <label className={s.label_container}>
                    Выбрать
                    <input onChange={handleImageChange} className={s.input} type="file" />
                  </label>
                </div>
              </div>
              <p className={s.p}>Максимальный размер файла: 5 мб</p>
              <div className={s.button_container}>
                <span className={s.button} onClick={handleUpload}>
                  Загрузить
                </span>
              </div>
            </ModalUniversal>

            <UserInfoBlock
              name={data.name}
              email={data.email}
              city={data.city}
              emailConfirmed={data.emailConfirmed}
              setModalActive={setModalActive}
            />

            <ModalUniversal active={modalActive} setActive={setModalActive}>
              <form onSubmit={handleSubmit}>
                <h1 className={s.title_modal}>Изменить данные</h1>
                <Input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  label="Имя"
                />
                <Input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  label="Email"
                />
                <Input
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="Город"
                />
                <Button type="submit">Отправить</Button>
              </form>
            </ModalUniversal>
          </div>
        </>
      )}
    </div>
  )
})
