import { useState } from 'react'

export const INTEREST_OPTIONS = ['Branding', 'Web Design', 'Marketing Design', 'Presentations', 'Other']
export const BUDGET_RANGES = ['Less than $500', '$500 - $1,500', '$1,500 - $2,500', 'More than $2,500']

export function useContactForm() {
  const [step, setStep] = useState(1)
  const [interests, setInterests] = useState([])
  const [hasBudget, setHasBudget] = useState(null) // null | true | false
  const [budgetRange, setBudgetRange] = useState(null)
  const [projectDetails, setProjectDetails] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const toggleInterest = (option) => {
    setInterests((prev) =>
      prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option]
    )
  }

  const selectBudget = (value) => {
    setHasBudget(value)
    if (!value) setBudgetRange(null)
  }

  const isStep1Valid =
    interests.length > 0 &&
    hasBudget !== null &&
    (hasBudget === false || budgetRange !== null) &&
    projectDetails.trim().length > 0

  const isStep2Valid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email)

  const handleNext = () => {
    if (isStep1Valid) setStep(2)
  }

  const handlePrev = () => setStep(1)

  const handleSubmit = async () => {
    if (!isStep2Valid || isSubmitting) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `New project inquiry from ${name}`,
          from_name: name,
          email,
          company: company || '—',
          phone: phone || '—',
          interests: interests.join(', '),
          budget: hasBudget ? budgetRange : 'No budget in mind',
          project_details: projectDetails,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStep(3)
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setStep(1)
    setInterests([])
    setHasBudget(null)
    setBudgetRange(null)
    setProjectDetails('')
    setName('')
    setEmail('')
    setCompany('')
    setPhone('')
    setSubmitError(null)
  }

  return {
    step,
    interests,
    hasBudget,
    budgetRange,
    projectDetails,
    name,
    email,
    company,
    phone,
    isSubmitting,
    submitError,
    isStep1Valid,
    isStep2Valid,
    toggleInterest,
    selectBudget,
    setBudgetRange,
    setProjectDetails,
    setName,
    setEmail,
    setCompany,
    setPhone,
    handleNext,
    handlePrev,
    handleSubmit,
    reset,
  }
}
