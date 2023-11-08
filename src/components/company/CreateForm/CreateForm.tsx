import s from './CreateForm.module.scss'
import { UseCreateForm } from 'components/company/hooks/useCreateForm.ts'
import { Input } from 'components/cabinet-module/UI/input/Input.tsx'
import { Button } from 'components/cabinet-module/UI/Button/Button.tsx'

export const CreateForm = () => {
  const {
    setFormData,
    formData,
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
        <form className={s.Form}>
          {currentStep === 1 && (
            <>
              <h2>Шаг 1</h2>
              <div className={s.FormStep}>
                <Input children={'Название филиала'} />
                <Input children={'Сфера бизнеса'} />
                <Input children={'Категория'} />
                <Input children={'Страна'} />
                <Input children={'Город'} />
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
                <Input children={'Адрес'} />
                <Input children={'Телефон'} />
                <Input children={'Ссылка на сайт'} />
                <Input children={'Режим работы'} />
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
