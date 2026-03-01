import { ref } from 'vue'

export const useFormValidation = () => {
  const errors = ref({})

  const validateField = (name, value, rules) => {
    if (rules.required && !value) {
      errors.value[name] = 'Это поле обязательно'
      return false
    }

    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        errors.value[name] = 'Введите корректный email'
        return false
      }
    }

    if (rules.phone && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
        errors.value[name] = 'Введите корректный номер телефона'
        return false
      }
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors.value[name] = `Минимум ${rules.minLength} символов`
      return false
    }

    delete errors.value[name]
    return true
  }

  const validateForm = (formData, validationRules) => {
    errors.value = {}
    let isValid = true

    for (const [field, rules] of Object.entries(validationRules)) {
      if (!validateField(field, formData[field], rules)) {
        isValid = false
      }
    }

    return isValid
  }

  const clearErrors = () => {
    errors.value = {}
  }

  return {
    errors,
    validateField,
    validateForm,
    clearErrors
  }
}
