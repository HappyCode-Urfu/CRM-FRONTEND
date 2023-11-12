import s from './Loading.module.scss'

export const Loading = () => {
  return (
    <div className={s.loadingContainer}>
      <div className={s.loadingSpinner}></div>
      <div className={s.loadingText}>Загрузка...</div>
    </div>
  )
}
