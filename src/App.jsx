import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FunnelProvider } from './context/FunnelContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

export default function App() {
  return (
    <FunnelProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FunnelProvider>
  )
}
