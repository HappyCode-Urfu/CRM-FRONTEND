import s from './AvatarBlock.module.scss'
import Avatar from 'assets/icon/avatar.svg'
import { ChangeEvent, FC, MutableRefObject } from 'react'

interface AvatarBlockProps {
  avatarUrl: string | null
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  onUpload: () => void
  show: boolean
  toggleBlock: () => void
  fileRef: MutableRefObject<HTMLDivElement | null>
}

const AvatarBlock: FC<AvatarBlockProps> = ({
  avatarUrl,
  onImageChange,
  onUpload,
  show,
  toggleBlock,
  fileRef,
}) => (
  <div className={s.avatar}>
    <img
      src={avatarUrl ?? localStorage.getItem('avatarUrl') ?? Avatar}
      alt="user-avatar"
      onClick={toggleBlock}
    />
    <div
      ref={fileRef}
      className={s.fileList}
      style={{ display: show ? 'block' : 'none' }}
    >
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
