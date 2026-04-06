import en from '../locales/en.json'
import sr from '../locales/sr.json'
import { useLang } from '../context/LangContext'

const LOCALES = { en, sr }

export default function useTranslation() {
  const { lang } = useLang()
  const t = (key) => LOCALES[lang]?.[key] ?? LOCALES.en[key] ?? key
  return { t, lang }
}
