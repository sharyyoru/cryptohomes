import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header, BottomNav, BackgroundOrbs } from './components/Layout'
import Loader from './components/Loader'
import AIAgent from './components/AIAgent'

// Pages
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'

// Animated Routes Wrapper
const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </AnimatePresence>
  )
}

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      <Router>
        <div className={`min-h-screen bg-[#0a0a0f] relative transition-opacity duration-500 overflow-x-hidden w-full max-w-[100vw] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <BackgroundOrbs />
          <Header />
          <AnimatedRoutes />
          <BottomNav />
          <AIAgent />
        </div>
      </Router>
    </>
  )
}

export default App
