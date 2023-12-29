import s from './Loading.module.scss'
import { memo } from 'react'

export const Loading = memo(() => {
  return (
    <div className={s.loadingContainer}>
      <div className={s.loadingSpinner}></div>
      <div className={s.loadingText}>Загрузка...</div>
    </div>
  )
})
