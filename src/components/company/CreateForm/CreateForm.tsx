import s from './CreateForm.module.scss'
import { UseCreateForm } from 'components/company/hooks/useCreateForm.ts'
import { Input } from 'components/UI/input/Input.tsx'
import { Button } from 'components/UI/Button/Button.tsx'

export const CreateForm = () => {
  const {
    handleFormSubmit,
    handleNextClick,
    handlePreviousClick,
    handleInputChange,
    currentStep,
  } = UseCreateForm()
  return (
    <div className={s.container}>
      <div className={s.top}>
        <div className={s.progressContainer}>
          <div
            className={s.progress}
            style={{ width: `${currentStep * 33}%` }}
          ></div>
        </div>
      </div>
      <div className={s.bottom}>
        <form onSubmit={handleFormSubmit} className={s.Form}>
          {currentStep === 1 && (
            <>
              <h2>Шаг 1</h2>
              <div className={s.FormStep}>
                <Input
                  children={'Название филиала'}
                  onChange={handleInputChange}
                />
                <Input
                  children={'Сфера бизнеса'}
                  onChange={handleInputChange}
                />
                <Input children={'Категория'} onChange={handleInputChange} />
                <Input children={'Страна'} onChange={handleInputChange} />
                <Input children={'Город'} onChange={handleInputChange} />
              </div>
              <div className={s.buttonContainer}>
                <Button
                  onClick={handleNextClick}
                  type={'button'}
                  children={'Далее'}
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <h2>Шаг 2</h2>
              <div className={s.FormStep}>
                <Input children={'Адрес'} onChange={handleInputChange} />
                <Input children={'Телефон'} onChange={handleInputChange} />
                <Input
                  children={'Ссылка на сайт'}
                  onChange={handleInputChange}
                />
                <Input children={'Режим работы'} onChange={handleInputChange} />
              </div>
              <div className={s.buttonContainer}>
                <Button
                  onClick={handlePreviousClick}
                  type={'button'}
                  children={'Назад'}
                />
                <Button
                  onClick={handleNextClick}
                  type={'button'}
                  children={'Далее'}
                />
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <h2>Филиал создан!</h2>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
