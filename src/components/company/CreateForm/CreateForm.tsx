import s from './CreateForm.module.scss'
import { UseCreateForm } from 'components/company/hooks/useCreateForm.ts'
import { Input } from 'components/UI/input/Input.tsx'
import { Button } from 'components/UI/Button/Button.tsx'
import { Select } from 'components/UI/Select/Select.tsx'

export const CreateForm = () => {
  const {
    handleFormSubmit,
    handleNextClick,
    handlePreviousClick,
    handleInputChange,
    handleSelectChange,
    handleAddressChange,
    currentStep,
    SearchAddress,
    formData,
    selectAddress,
  } = UseCreateForm()

  return (
    <div className={s.container}>
      <div className={s.top}>
        <div className={s.progressContainer}>
          <div className={s.progress} style={{ width: `${currentStep * 33}%` }}></div>
        </div>
      </div>
      <div className={s.bottom}>
        <form onSubmit={handleFormSubmit} className={s.Form}>
          {currentStep === 1 && (
            <>
              <h2>Шаг 1</h2>
              <div className={s.FormStep}>
                <Input
                  name={'name'}
                  placeholder={'Введите название'}
                  children={'Название филиала'}
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Input
                  name={'categoryName'}
                  value={formData.categoryName}
                  children={'Категория'}
                  placeholder={'Введите категорию'}
                  onChange={handleInputChange}
                />
                <Input
                  name={'country'}
                  value={formData.country}
                  children={'Страна'}
                  placeholder={'Введите страну'}
                  onChange={handleInputChange}
                />
                <Input
                  name={'city'}
                  value={formData.city}
                  children={'Город'}
                  placeholder={'Введите город'}
                  onChange={handleInputChange}
                />
                <Input
                  name={'district'}
                  value={formData.district}
                  children={'Район'}
                  placeholder={'Введите район'}
                  onChange={handleInputChange}
                />
                <Select
                  children={'Сфера бизнеса'}
                  value={formData.businessName}
                  options={formData.businessList}
                  onChange={handleSelectChange}
                />
              </div>
              <div className={s.buttonContainer}>
                <Button onClick={handleNextClick} type={'button'} children={'Далее'} />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <h2>Шаг 2</h2>
              <div className={s.FormStep}>
                <div className={s.searchAddress}>
                  <div className={s.topAddress}>
                    <Input
                      value={formData.address}
                      children={'Адрес'}
                      placeholder={'Введите адрес'}
                      onChange={handleAddressChange}
                    />
                    <Button
                      children={'Поиск'}
                      type={'button'}
                      onClick={() => SearchAddress()}
                    />
                  </div>
                  {formData.availableAddresses.length !== 0 && (
                    <div className={s.bottomAddress}>
                      {formData.availableAddresses.map((value) => (
                        <div
                          onClick={() =>
                            selectAddress(value.address, value.latitude, value.longitude)
                          }
                          className={s.addressItem}
                        >
                          {value.address}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Input
                  name={'phone_number'}
                  phone_number={true}
                  value={formData.phone_number}
                  children={'Телефон'}
                  placeholder={'Введите номер телефона'}
                  onChange={handleInputChange}
                />
                <Input
                  name={'work_time'}
                  value={formData.work_time}
                  children={'Режим работы'}
                  placeholder={'10:00-22:00'}
                  onChange={handleInputChange}
                />
              </div>
              <div className={s.buttonContainer}>
                <Button
                  onClick={handlePreviousClick}
                  type={'button'}
                  children={'Назад'}
                />
                <Button
                  onClick={() => handleFormSubmit}
                  type={'submit'}
                  children={'Отправить'}
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
