import s from './AvatarBlock.module.scss'
import Avatar from 'assets/icon/avatar.svg'
import { ChangeEvent, Dispatch, FC, MutableRefObject, SetStateAction } from 'react'

interface AvatarBlockProps {
  avatarUrl: string | null
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  onUpload: () => void
  fileRef: MutableRefObject<HTMLDivElement | null>
  setNestedModalActive: Dispatch<SetStateAction<boolean>>
}

const AvatarBlock: FC<AvatarBlockProps> = ({
  avatarUrl,
  onImageChange,
  onUpload,
  setNestedModalActive,
  fileRef,
}) => (
  <div className={s.avatar}>
    <img
      src={avatarUrl ?? localStorage.getItem('avatarUrl') ?? Avatar}
      alt="user-avatar"
      onClick={() => setNestedModalActive(true)}
    />
    <div ref={fileRef} className={s.fileList}>
      <div className={s.file_container}>
        <label className={s.label_container}>
          Выбрать
          <input className={s.input} onChange={onImageChange} type="file" />
        </label>
        <span className={s.send} onClick={onUpload}>
          Сохранить
        </span>
      </div>
    </div>
  </div>
)

export default AvatarBlock
