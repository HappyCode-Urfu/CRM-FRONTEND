export const nameRegEX = /^[A-Za-zА-Яа-я]+$/
export const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
export const passwordRegEx = /^(?=.*\d)(?=.*[^\d])[\s\S]+$/

export const requiredField = 'Поле обязательно к заполнению'
export const minLengthPasswordMessage = 'Пароль должен содержать не менее 8 символов'
export const maxLengthPasswordMessage = 'Пароль не должен превышать 30 символов'
export const validationPasswordMessage =
  'Пароль должен содержать хотя бы 1 символ или цифру'

export const validationEmailMessage = 'Введите действительный адрес электронной почты'
export const maxLengthEmailMessage = 'Email не должен превышать 60 символов'

export const validationNameMessage = 'Имя может содержать только буквы'
export const maxLengthNameMessage = 'Имя не должно содержать более 50 символов'
export const minLengthNameMessage = 'Имя должно содержать не менее 3 символов'
