import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import PolicyPage from './pages/PolicyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<Project />} />
      <Route path="/privacy" element={<PolicyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
