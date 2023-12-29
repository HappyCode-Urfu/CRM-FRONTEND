import s from './Services.module.scss'
import { Input } from 'components/UI/input/Input.tsx'
import { Button } from 'components/UI/Button/Button.tsx'

const Services = () => {
  return (
    <div className={s.container}>
      <div className={s.top}>
        <Input placeholder={'Поиск услуги'} />
        <Button children={'Создать'} />
      </div>
      <div className={s.bottom}>
        <div className={s.topBar}>
          <span>Имя</span>
          <span>Цена</span>
          <span>Длительность</span>
          <span>Сотрудники</span>
        </div>
        <div className={s.elements}>
          <div className={s.element}>
            <span>Стрижка</span>
            <span>600 руб.</span>
            <span>1ч</span>
            <span>Ольга</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
