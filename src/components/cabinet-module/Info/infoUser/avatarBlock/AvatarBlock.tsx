import s from './AvatarBlock.module.scss'
import Avatar from 'assets/icon/avatar.svg'
import { ChangeEvent, Dispatch, FC, MutableRefObject, SetStateAction } from 'react'
import { IAccount } from 'models/Account.ts'

interface AvatarBlockProps {
  avatarUrl: string | null
  data: IAccount
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  onUpload: () => void
  fileRef: MutableRefObject<HTMLDivElement | null>
  setNestedModalActive: Dispatch<SetStateAction<boolean>>
}

const AvatarBlock: FC<AvatarBlockProps> = ({
  avatarUrl,
  data,
  onImageChange,
  onUpload,
  setNestedModalActive,
  fileRef,
}) => {
  return (
    <div className={s.avatar}>
      <img
        src={avatarUrl ?? (data.downloadLink || Avatar)}
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
}

export default AvatarBlock
