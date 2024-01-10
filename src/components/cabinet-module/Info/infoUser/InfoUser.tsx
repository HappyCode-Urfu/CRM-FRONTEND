import { memo } from 'react'
import s from './InfoUser.module.scss'
import ModalUniversal from 'components/cabinet-module/Info/infoUser/ModalUpdateInfoUser/ModalUniversal.tsx'
import { Loading } from 'components/loading/Loading.tsx'
import Input from 'components/fields/input/Input.tsx'
import AvatarBlock from 'components/cabinet-module/Info/infoUser/avatarBlock/AvatarBlock.tsx'
import UserInfoBlock from 'components/cabinet-module/Info/infoUser/userInfoBlock/UserInfoBlock.tsx'
import { useInfoUser } from 'components/cabinet-module/Info/infoUser/hooks/useInfoUser.ts'
import Button from 'components/button/Button.tsx'

export const InfoUser = memo(() => {
  const {
    data,
    fileRef,
    error,
    isLoading,
    avatarUrl,
    show,
    modalActive,
    values,
    handleChange,
    toggleBlock,
    handleUpload,
    handleImageChange,
    handleSubmit,
    setModalActive,
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
              avatarUrl={avatarUrl}
              onImageChange={handleImageChange}
              onUpload={handleUpload}
              show={show}
              toggleBlock={toggleBlock}
              fileRef={fileRef}
            />
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
