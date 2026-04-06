import { useState } from 'react'
import { useLang } from '../context/LangContext'
import useTranslation from './useTranslation'

export const INTEREST_OPTIONS = ['branding', 'webDesign', 'marketingDesign', 'presentations', 'other']
export const BUDGET_RANGES = ['lt500', 'r500_1500', 'r1500_2500', 'gt2500']

const INTEREST_LABELS_EN = {
  branding: 'Branding',
  webDesign: 'Web Design',
  marketingDesign: 'Marketing Design',
  presentations: 'Presentations',
  other: 'Other',
}

const BUDGET_LABELS_EN = {
  lt500: 'Less than $500',
  r500_1500: '$500 - $1,500',
  r1500_2500: '$1,500 - $2,500',
  gt2500: 'More than $2,500',
}

export function useContactForm() {
  const { t } = useTranslation()
  const { lang } = useLang()
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

  const toggleInterest = (optionKey) => {
    setInterests((prev) =>
      prev.includes(optionKey) ? prev.filter((item) => item !== optionKey) : [...prev, optionKey]
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
          subject: lang === 'sr' ? `Novi upit od ${name}` : `New project inquiry from ${name}`,
          from_name: name,
          email,
          company: company || '-',
          phone: phone || '-',
          interests: interests.map((interest) => INTEREST_LABELS_EN[interest] || interest).join(', '),
          budget: hasBudget
            ? (BUDGET_LABELS_EN[budgetRange] || budgetRange)
            : t('contact.budget.noMind'),
          project_details: projectDetails,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setStep(3)
      } else {
        setSubmitError(t('contact.error.submit'))
      }
    } catch {
      setSubmitError(t('contact.error.submit'))
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
