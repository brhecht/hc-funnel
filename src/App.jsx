import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FunnelProvider } from './context/FunnelContext'
import { useMetaPixel, usePixelPageView } from './hooks/useMetaPixel'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

function AppRoutes() {
  usePixelPageView()

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  useMetaPixel()

  return (
    <FunnelProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FunnelProvider>
  )
}
