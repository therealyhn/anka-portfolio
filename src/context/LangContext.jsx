import { createContext, useContext, useState } from 'react'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') ?? 'en')

  const toggle = () => {
    const next = lang === 'en' ? 'sr' : 'en'
    localStorage.setItem('lang', next)
    setLang(next)
  }

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
