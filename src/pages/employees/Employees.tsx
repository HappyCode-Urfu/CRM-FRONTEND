import s from './Employees.module.scss'
import { Input } from 'components/UI/input/Input.tsx'
import { Button } from 'components/UI/Button/Button.tsx'
// import { Select } from 'components/UI/Select/Select.tsx'

const Employees = () => {
  // const list = [
  //   { value: 'Финансы и инвестиции', label: 'Финансы и инвестиции' },
  //   {
  //     value: 'Технологии и информационные технологии',
  //     label: 'Технологии и информационные технологии',
  //   },
  //   {
  //     value: 'Здравоохранение и медицина',
  //     label: 'Здравоохранение и медицина',
  //   },
  //   { value: 'Розничная торговля', label: 'Розничная торговля' },
  //   {
  //     value: 'Производство и инжиниринг',
  //     label: 'Производство и инжиниринг',
  //   },
  //   {
  //     value: 'Гостинично-ресторанный бизнес',
  //     label: 'Гостинично-ресторанный бизнес',
  //   },
  //   { value: 'Образование и тренинги', label: 'Образование и тренинги' },
  //   { value: 'Реклама и маркетинг', label: 'Реклама и маркетинг' },
  //   { value: 'Автомобильная индустрия', label: 'Автомобильная индустрия' },
  //   {
  //     value: 'Консалтинг и бизнес-услуги',
  //     label: 'Консалтинг и бизнес-услуги',
  //   },
  // ]

  return (
    <div className={s.container}>
      <div className={s.top}>
        <Input placeholder={'Поиск сотрудника'} />
        <Button children={'Добавить'} />
      </div>
      {/*<div className={s.filter}>*/}
      {/*  <Select options={list} />*/}
      {/*  <Select options={list} />*/}
      {/*  <Select options={list} />*/}
      {/*</div>*/}
      <div className={s.bottom}>
        <div className={s.topBar}>
          <span>Сотрудник</span>
          <span>График работы</span>
          <span>Оказывает услуг</span>
          <span>пользователь</span>
        </div>
        <div className={s.elements}>
          <div className={s.element}>
            <span>Олег</span>
            <span>13.03.2024</span>
            <span>1</span>
            <span>нет</span>
          </div>
          <div className={s.element}>
            <span>Ольга</span>
            <span>21.03.2024</span>
            <span>1</span>
            <span>нет</span>
          </div>
          <div className={s.element}>
            <span>Сергей</span>
            <span>15.09.2024</span>
            <span>2</span>
            <span>нет</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employees
