import { useState } from 'react'

export const UseCreateForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    logo: '',
    name: '',
    scopeList: [
      'Категория 1',
      'Категория 2',
      'Категория 3',
      'Категория 4',
      'Категория 5',
    ],
    categoryList: [
      'Категория 1',
      'Категория 2',
      'Категория 3',
      'Категория 4',
      'Категория 5',
    ],
    selectedScope: '',
    selectedCategory: '',
    country: '',
    city: '',
    address: '',
    phone_number: '',
    url_site: '',
    work_time: '',
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousClick = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCurrentStep(3)
  }
  return {
    currentStep,
    formData,
    setFormData,
    handleInputChange,
    handleNextClick,
    handlePreviousClick,
    handleFormSubmit,
  }
}
