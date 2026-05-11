import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Project = lazy(() => import('./pages/Project'))
const PolicyPage = lazy(() => import('./pages/PolicyPage'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-charcoal" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<Project />} />
        <Route path="/privacy" element={<PolicyPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
