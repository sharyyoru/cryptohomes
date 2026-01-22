import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setShowLoader(false)
            onComplete?.()
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0a0a0f] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-crypto-teal/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-crypto-purple/20 rounded-full blur-[100px]"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-crypto-gold/10 rounded-full blur-[80px]"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Logo Animation */}
          <motion.div
            className="relative z-10 mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
          >
            <motion.div
              className="relative"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img 
                src="/img/logo/logo-3.png" 
                alt="CryptoHomes" 
                className="w-32 h-32 object-contain"
              />
            </motion.div>
            
            {/* Orbiting particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 3 === 0 ? '#14b8a6' : i % 3 === 1 ? '#a855f7' : '#f59e0b',
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos((i * 60) * Math.PI / 180) * 60, 0],
                  y: [0, Math.sin((i * 60) * Math.PI / 180) * 60, 0],
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* Brand Name */}
          <motion.div
            className="relative z-10 text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold font-['Space_Grotesk']">
              <motion.span
                className="gradient-text inline-block"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Crypto
              </motion.span>
              <span className="text-white">Homes</span>
            </h1>
            <motion.p
              className="text-xs text-gray-500 mt-1 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              DUBAI
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="relative z-10 w-48"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-crypto-teal via-crypto-purple to-crypto-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.p
              className="text-center text-xs text-gray-500 mt-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress < 30 && 'Initializing blockchain...'}
              {progress >= 30 && progress < 60 && 'Loading properties...'}
              {progress >= 60 && progress < 90 && 'Connecting wallet...'}
              {progress >= 90 && 'Almost ready...'}
            </motion.p>
          </motion.div>

          {/* Crypto Icons Floating */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {['BTC', 'ETH', 'USDT'].map((crypto, i) => (
              <motion.img
                key={crypto}
                src={`/img/icon/${crypto}-icon.svg`}
                alt={crypto}
                className="absolute w-8 h-8 opacity-20"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${70 + i * 5}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
