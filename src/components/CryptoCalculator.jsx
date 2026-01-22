import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, TrendingUp, ArrowRight, RefreshCw, 
  ChevronDown, Sparkles, DollarSign, Building2,
  Percent, Calendar, PiggyBank, Target
} from 'lucide-react'

// Crypto prices (simulated real-time)
const cryptoPrices = {
  BTC: { price: 97500, change: 2.4, icon: '/img/icon/BTC-icon.svg' },
  ETH: { price: 3250, change: 1.8, icon: '/img/icon/ETH-icon.svg' },
  USDT: { price: 1, change: 0.01, icon: '/img/icon/USDT-logo.svg' },
  XRP: { price: 2.45, change: -0.5, icon: '/img/icon/xrp-logo.svg' },
}

// Currency Selector
const CurrencySelector = ({ value, onChange, currencies }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selected = currencies.find(c => c.id === value)

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 glass-card px-3 py-2 rounded-xl min-w-[120px]"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        <img src={selected?.icon} alt={selected?.name} className="w-6 h-6" />
        <span className="font-medium">{selected?.id}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {currencies.map(currency => (
              <button
                key={currency.id}
                className={`flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 transition-colors ${
                  value === currency.id ? 'bg-crypto-teal/20' : ''
                }`}
                onClick={() => {
                  onChange(currency.id)
                  setIsOpen(false)
                }}
              >
                <img src={currency.icon} alt={currency.name} className="w-5 h-5" />
                <span className="text-sm">{currency.id}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Animated Number Display
const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 60
    const stepValue = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString(undefined, { 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
      })}
      {suffix}
    </span>
  )
}

// Result Card
const ResultCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    className="glass-card rounded-xl p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-2`}>
      <Icon size={18} className="text-white" />
    </div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-bold text-lg">{value}</p>
  </motion.div>
)

const CryptoCalculator = () => {
  const [activeTab, setActiveTab] = useState('investment')
  const [propertyValue, setPropertyValue] = useState(5000000)
  const [selectedCrypto, setSelectedCrypto] = useState('BTC')
  const [investmentYears, setInvestmentYears] = useState(5)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const currencies = Object.entries(cryptoPrices).map(([id, data]) => ({
    id,
    name: id,
    ...data,
  }))

  const handleCalculate = () => {
    setIsCalculating(true)
    setShowResults(false)
    setTimeout(() => {
      setIsCalculating(false)
      setShowResults(true)
    }, 1500)
  }

  // Calculations
  const cryptoAmount = propertyValue / cryptoPrices[selectedCrypto].price
  const futureValue = propertyValue * Math.pow(1 + expectedReturn / 100, investmentYears)
  const totalReturn = futureValue - propertyValue
  const monthlyRental = propertyValue * 0.006 // 6% annual rental yield

  const tabs = [
    { id: 'investment', label: 'Investment', icon: TrendingUp },
    { id: 'conversion', label: 'Conversion', icon: RefreshCw },
  ]

  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crypto-gold/20 to-crypto-purple/20 flex items-center justify-center">
          <Calculator size={20} className="text-crypto-gold" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Investment Calculator</h3>
          <p className="text-xs text-gray-500">Plan your crypto property investment</p>
        </div>
      </div>

      {/* Calculator Card */}
      <motion.div
        className="glass-card rounded-3xl p-5 relative overflow-hidden"
        whileHover={{ scale: 1.01 }}
      >
        {/* Animated Background */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-crypto-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-crypto-purple/10 rounded-full blur-3xl" />

        {/* Tab Selector */}
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'glass-button text-white'
                  : 'glass text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={16} />
              {tab.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'investment' ? (
            <motion.div
              key="investment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Property Value Input */}
              <div className="mb-5">
                <label className="text-xs text-gray-500 mb-2 block">Property Value (AED)</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full glass rounded-xl py-3 pl-10 pr-4 text-lg font-bold outline-none focus:ring-1 focus:ring-crypto-teal"
                  />
                </div>
                {/* Quick Select */}
                <div className="flex gap-2 mt-2">
                  {[2000000, 5000000, 10000000, 25000000].map(value => (
                    <button
                      key={value}
                      className={`flex-1 py-1.5 rounded-lg text-xs transition-all ${
                        propertyValue === value ? 'glass-button' : 'glass text-gray-500'
                      }`}
                      onClick={() => setPropertyValue(value)}
                    >
                      {(value / 1000000).toFixed(0)}M
                    </button>
                  ))}
                </div>
              </div>

              {/* Investment Period */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-gray-500">Investment Period</label>
                  <span className="text-sm font-bold text-crypto-teal">{investmentYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={investmentYears}
                  onChange={(e) => setInvestmentYears(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-crypto-teal"
                />
                <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                  <span>1 Year</span>
                  <span>20 Years</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-gray-500">Expected Annual Return</label>
                  <span className="text-sm font-bold text-crypto-purple">{expectedReturn}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-crypto-purple"
                />
                <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                  <span>5%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Calculate Button */}
              <motion.button
                className="w-full glass-button py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
                onClick={handleCalculate}
                whileTap={{ scale: 0.98 }}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <RefreshCw size={18} />
                  </motion.div>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Calculate Returns
                  </>
                )}
              </motion.button>

              {/* Results */}
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    className="mt-5 pt-5 border-t border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <ResultCard
                        icon={Target}
                        label="Future Value"
                        value={`AED ${(futureValue / 1000000).toFixed(2)}M`}
                        color="bg-gradient-to-br from-crypto-teal to-emerald-600"
                        delay={0}
                      />
                      <ResultCard
                        icon={TrendingUp}
                        label="Total Return"
                        value={`AED ${(totalReturn / 1000000).toFixed(2)}M`}
                        color="bg-gradient-to-br from-crypto-purple to-violet-600"
                        delay={0.1}
                      />
                      <ResultCard
                        icon={PiggyBank}
                        label="Monthly Rental"
                        value={`AED ${monthlyRental.toLocaleString()}`}
                        color="bg-gradient-to-br from-crypto-gold to-amber-600"
                        delay={0.2}
                      />
                      <ResultCard
                        icon={Percent}
                        label="ROI"
                        value={`${((totalReturn / propertyValue) * 100).toFixed(1)}%`}
                        color="bg-gradient-to-br from-crypto-pink to-rose-600"
                        delay={0.3}
                      />
                    </div>

                    {/* Growth Chart Visualization */}
                    <div className="glass rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-3">Projected Growth</p>
                      <div className="flex items-end justify-between h-20 gap-1">
                        {[...Array(investmentYears)].map((_, i) => {
                          const yearValue = propertyValue * Math.pow(1 + expectedReturn / 100, i + 1)
                          const height = (yearValue / futureValue) * 100
                          return (
                            <motion.div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-crypto-teal to-crypto-purple rounded-t"
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                            />
                          )
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-600 mt-2">
                        <span>Year 1</span>
                        <span>Year {investmentYears}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="conversion"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Crypto Selector */}
              <div className="mb-5">
                <label className="text-xs text-gray-500 mb-2 block">Select Cryptocurrency</label>
                <CurrencySelector
                  value={selectedCrypto}
                  onChange={setSelectedCrypto}
                  currencies={currencies}
                />
              </div>

              {/* Property Value */}
              <div className="mb-5">
                <label className="text-xs text-gray-500 mb-2 block">Property Value (AED)</label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full glass rounded-xl py-3 px-4 text-lg font-bold outline-none focus:ring-1 focus:ring-crypto-teal"
                />
              </div>

              {/* Conversion Result */}
              <motion.div
                className="glass rounded-2xl p-5 text-center relative overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-crypto-teal/10 to-crypto-purple/10" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <motion.img
                      src={cryptoPrices[selectedCrypto].icon}
                      alt={selectedCrypto}
                      className="w-12 h-12"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <p className="text-3xl font-bold font-['Space_Grotesk'] mb-1">
                    <AnimatedNumber value={cryptoAmount} decimals={4} suffix={` ${selectedCrypto}`} />
                  </p>
                  <p className="text-sm text-gray-500">
                    @ ${cryptoPrices[selectedCrypto].price.toLocaleString()} per {selectedCrypto}
                  </p>
                  <div className={`inline-flex items-center gap-1 mt-2 text-xs ${
                    cryptoPrices[selectedCrypto].change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp size={12} />
                    {cryptoPrices[selectedCrypto].change >= 0 ? '+' : ''}{cryptoPrices[selectedCrypto].change}% (24h)
                  </div>
                </div>
              </motion.div>

              {/* Other Crypto Options */}
              <div className="mt-5 space-y-2">
                <p className="text-xs text-gray-500 mb-2">Also available in:</p>
                {Object.entries(cryptoPrices).filter(([id]) => id !== selectedCrypto).map(([id, data]) => (
                  <motion.button
                    key={id}
                    className="w-full flex items-center justify-between glass rounded-xl p-3"
                    onClick={() => setSelectedCrypto(id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <img src={data.icon} alt={id} className="w-8 h-8" />
                      <span className="font-medium">{id}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{(propertyValue / data.price).toFixed(4)}</p>
                      <p className="text-[10px] text-gray-500">${data.price.toLocaleString()}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}

export default CryptoCalculator
