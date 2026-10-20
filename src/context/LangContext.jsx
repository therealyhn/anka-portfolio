import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') ?? 'en')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

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

// The hook stays next to its provider, where every component imports it from; on an edit of this file
// Fast Refresh reloads the page instead of swapping the component.
// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LangContext)
}
