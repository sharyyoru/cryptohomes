import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, Building2, Wallet, User, Search, Bell, Menu, X,
  Info, Phone, Briefcase, Heart, Settings, LogOut, ChevronRight
} from 'lucide-react'

// Background Orbs
export const BackgroundOrbs = () => (
  <>
    <div className="fixed w-[500px] h-[500px] rounded-full bg-gradient-radial from-crypto-teal/20 to-transparent blur-[100px] -top-48 -right-48 pointer-events-none z-0" />
    <div className="fixed w-[400px] h-[400px] rounded-full bg-gradient-radial from-crypto-purple/15 to-transparent blur-[100px] bottom-20 -left-48 pointer-events-none z-0" />
    <div className="fixed w-[300px] h-[300px] rounded-full bg-gradient-radial from-crypto-pink/10 to-transparent blur-[100px] top-1/2 right-0 pointer-events-none z-0" />
  </>
)

// Header Component
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/properties', label: 'Properties', icon: Building2 },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/services', label: 'Services', icon: Briefcase },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/img/logo/logo-3.png" alt="CryptoHomes" className="h-10 w-auto" />
          </NavLink>
          
          <div className="flex items-center gap-3">
            <motion.button 
              className="relative p-2.5 glass rounded-xl"
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} className="text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-crypto-teal rounded-full animate-pulse" />
            </motion.button>
            <motion.button 
              className="p-2.5 glass rounded-xl"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={20} className="text-crypto-teal" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={20} className="text-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 glass-dark z-50 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-crypto-teal to-crypto-purple flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Welcome</p>
                    <p className="text-xs text-gray-500">Connect to continue</p>
                  </div>
                </div>
              </div>
              
              <nav className="flex-1 py-4">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-6 py-3.5 transition-all
                      ${isActive ? 'text-crypto-teal bg-crypto-teal/10 border-r-2 border-crypto-teal' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight size={16} className="ml-auto opacity-50" />
                  </NavLink>
                ))}
              </nav>
              
              <div className="p-4 border-t border-white/5">
                <button className="glass-button w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 text-white">
                  <Wallet size={18} />
                  Connect Wallet
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Bottom Navigation
export const BottomNav = () => {
  const location = useLocation()
  
  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/properties', icon: Building2, label: 'Properties' },
    { path: '/favorites', icon: Heart, label: 'Saved' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-white/5 safe-bottom">
      <div className="flex items-center justify-around py-2 pb-6">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className="relative flex flex-col items-center gap-1 px-4 py-2"
            >
              <motion.div
                className={`relative p-2 rounded-xl transition-colors ${isActive ? 'bg-crypto-teal/20' : ''}`}
                whileTap={{ scale: 0.9 }}
              >
                <tab.icon size={22} className={isActive ? 'text-crypto-teal' : 'text-gray-500'} />
                {isActive && (
                  <motion.div 
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-crypto-teal rounded-full"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-crypto-teal' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

// Page Transition Wrapper
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)
