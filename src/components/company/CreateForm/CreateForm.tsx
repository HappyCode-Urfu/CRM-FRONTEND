import s from './CreateForm.module.scss'
import { UseCreateForm } from 'components/company/hooks/useCreateForm.ts'
import { Input } from 'components/UI/input/Input.tsx'
import { Button } from 'components/UI/Button/Button.tsx'
import { Select } from 'components/UI/Select/Select.tsx'

export const CreateForm = () => {
  const {
    handleFormSubmit,
    handleInputChange,
    handleSelectChange,
    handleAddressChange,
    SearchAddress,
    formData,
    setFormData,
    selectAddress,
  } = UseCreateForm()

  return (
    <div className={s.container}>
      <div className={s.bottom}>
        <form onSubmit={handleFormSubmit} className={s.Form}>
          <div className={s.FormStep}>
            <Input
              name={'name'}
              placeholder={'Введите название'}
              children={'Название филиала'}
              value={formData.name}
              onChange={handleInputChange}
            />
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
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            />

            <div className={s.formGroup}>
              <label htmlFor="startTime">Режим работы</label>
              <div className={s.InputBlock}>
                <input
                  type="time"
                  id="startTime"
                  value={formData.start_time}
                  onChange={(e) =>
                    setFormData({ ...formData, start_time: e.target.value })
                  }
                />
                -
                <input
                  type="time"
                  id="startTime"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                />
              </div>
            </div>
            <Select
              children={'Сфера бизнеса'}
              value={formData.businessName}
              options={formData.businessList}
              onChange={handleSelectChange}
            />
            <div className={s.buttonContainer}>
              <Button
                onClick={() => handleFormSubmit}
                type={'submit'}
                children={'Отправить'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
