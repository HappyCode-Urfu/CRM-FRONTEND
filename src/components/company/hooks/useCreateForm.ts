import { useState, ChangeEvent, FormEvent } from 'react'

export const UseCreateForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    logo: '',
    name: '',
    scopeList: ['Сфера 1', 'Сфера 2', 'Сфера 3', 'Сфера 4', 'Сфера 5'],
    scopeId: 1,
    categoryList: '',
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
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousClick = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
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
