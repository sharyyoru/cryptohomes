import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, DollarSign, User, Mail, Phone, MessageSquare,
  Check, ArrowRight, Sparkles, Building2, Calendar,
  CreditCard, Bitcoin, Shield, Send, CheckCircle2
} from 'lucide-react'

// Step indicator
const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {[...Array(totalSteps)].map((_, idx) => (
      <motion.div
        key={idx}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          idx < currentStep 
            ? 'bg-crypto-teal w-8' 
            : idx === currentStep 
              ? 'bg-crypto-teal w-8' 
              : 'bg-gray-700 w-4'
        }`}
        initial={{ scale: 0.8 }}
        animate={{ scale: idx === currentStep ? 1.1 : 1 }}
      />
    ))}
  </div>
)

// Animated input field
const AnimatedInput = ({ icon: Icon, label, type = 'text', value, onChange, placeholder, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <label className="text-xs text-gray-500 mb-1.5 block">{label}</label>
    <div className="relative">
      <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full glass rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-crypto-teal transition-all"
      />
    </div>
  </motion.div>
)

// Payment method option
const PaymentOption = ({ icon: Icon, label, sublabel, selected, onClick, iconSrc }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all ${
      selected 
        ? 'glass-card ring-1 ring-crypto-teal bg-crypto-teal/10' 
        : 'glass hover:bg-white/5'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
      selected ? 'bg-crypto-teal/20' : 'bg-white/5'
    }`}>
      {iconSrc ? (
        <img src={iconSrc} alt={label} className="w-6 h-6" />
      ) : (
        <Icon size={20} className={selected ? 'text-crypto-teal' : 'text-gray-400'} />
      )}
    </div>
    <div className="text-left flex-1">
      <p className={`font-medium text-sm ${selected ? 'text-white' : 'text-gray-300'}`}>{label}</p>
      <p className="text-xs text-gray-500">{sublabel}</p>
    </div>
    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-6 h-6 rounded-full bg-crypto-teal flex items-center justify-center"
      >
        <Check size={14} className="text-white" />
      </motion.div>
    )}
  </motion.button>
)

// Success animation
const SuccessAnimation = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="w-24 h-24 rounded-full bg-gradient-to-br from-crypto-teal/20 to-crypto-purple/20 flex items-center justify-center mb-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
      >
        <CheckCircle2 size={48} className="text-crypto-teal" />
      </motion.div>
    </motion.div>
    
    <motion.h3
      className="text-xl font-bold mb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      Offer Submitted! 🎉
    </motion.h3>
    
    <motion.p
      className="text-gray-400 text-sm text-center max-w-xs mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      Our team will review your offer and get back to you within 24 hours.
    </motion.p>
    
    <motion.div
      className="flex items-center gap-2 glass-card px-4 py-2 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles size={16} className="text-crypto-gold" />
      </motion.div>
      <span className="text-sm text-gray-400">Reference: #CH-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
    </motion.div>
  </motion.div>
)

const OfferForm = ({ isOpen, onClose, property }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  const [formData, setFormData] = useState({
    offerAmount: property?.price?.replace(/[^\d]/g, '') || '5000000',
    name: '',
    email: '',
    phone: '',
    message: '',
    paymentMethod: 'crypto',
    preferredCrypto: 'BTC',
    moveInDate: '',
    financing: 'cash'
  })

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 2000)
  }

  const resetForm = () => {
    setCurrentStep(0)
    setIsComplete(false)
    setFormData({
      offerAmount: property?.price?.replace(/[^\d]/g, '') || '5000000',
      name: '',
      email: '',
      phone: '',
      message: '',
      paymentMethod: 'crypto',
      preferredCrypto: 'BTC',
      moveInDate: '',
      financing: 'cash'
    })
    onClose()
  }

  const steps = [
    // Step 1: Offer Amount
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crypto-gold/20 to-crypto-purple/20 flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <DollarSign size={28} className="text-crypto-gold" />
        </motion.div>
        <h3 className="text-lg font-bold">Your Offer</h3>
        <p className="text-xs text-gray-500">Enter the amount you'd like to offer</p>
      </div>
      
      <div>
        <label className="text-xs text-gray-500 mb-2 block">Offer Amount (AED)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">AED</span>
          <input
            type="text"
            value={Number(formData.offerAmount).toLocaleString()}
            onChange={(e) => updateField('offerAmount', e.target.value.replace(/[^\d]/g, ''))}
            className="w-full glass rounded-xl py-4 pl-14 pr-4 text-2xl font-bold outline-none focus:ring-1 focus:ring-crypto-teal text-center"
          />
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Listed Price</span>
          <span className="font-semibold">{property?.price || 'AED 15.5M'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Your Offer</span>
          <span className={`font-bold ${
            Number(formData.offerAmount) < Number(property?.price?.replace(/[^\d]/g, '') || 15500000) * 0.95
              ? 'text-red-400'
              : 'text-crypto-teal'
          }`}>
            AED {Number(formData.offerAmount).toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2">
        {['-10%', '-5%', 'List Price', '+5%'].map((label, idx) => {
          const listPrice = Number(property?.price?.replace(/[^\d]/g, '') || 15500000)
          const multipliers = [0.9, 0.95, 1, 1.05]
          return (
            <motion.button
              key={label}
              className="flex-1 py-2 glass rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              whileTap={{ scale: 0.95 }}
              onClick={() => updateField('offerAmount', Math.round(listPrice * multipliers[idx]).toString())}
            >
              {label}
            </motion.button>
          )
        })}
      </div>
    </motion.div>,
    
    // Step 2: Payment Method
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crypto-teal/20 to-crypto-purple/20 flex items-center justify-center mx-auto mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CreditCard size={28} className="text-crypto-teal" />
        </motion.div>
        <h3 className="text-lg font-bold">Payment Method</h3>
        <p className="text-xs text-gray-500">How would you like to pay?</p>
      </div>
      
      <PaymentOption
        icon={Bitcoin}
        iconSrc="/img/icon/BTC-icon.svg"
        label="Cryptocurrency"
        sublabel="BTC, ETH, USDT & 50+ more"
        selected={formData.paymentMethod === 'crypto'}
        onClick={() => updateField('paymentMethod', 'crypto')}
      />
      
      <PaymentOption
        icon={CreditCard}
        label="Bank Transfer"
        sublabel="Direct wire transfer"
        selected={formData.paymentMethod === 'bank'}
        onClick={() => updateField('paymentMethod', 'bank')}
      />
      
      <PaymentOption
        icon={Building2}
        label="Mortgage/Financing"
        sublabel="We'll help arrange financing"
        selected={formData.paymentMethod === 'mortgage'}
        onClick={() => updateField('paymentMethod', 'mortgage')}
      />
      
      {formData.paymentMethod === 'crypto' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pt-4 border-t border-white/10"
        >
          <p className="text-xs text-gray-500 mb-3">Preferred Cryptocurrency</p>
          <div className="flex gap-2">
            {[
              { id: 'BTC', icon: '/img/icon/BTC-icon.svg' },
              { id: 'ETH', icon: '/img/icon/ETH-icon.svg' },
              { id: 'USDT', icon: '/img/icon/USDT-logo.svg' },
            ].map((crypto) => (
              <motion.button
                key={crypto.id}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                  formData.preferredCrypto === crypto.id
                    ? 'glass-card ring-1 ring-crypto-teal'
                    : 'glass'
                }`}
                onClick={() => updateField('preferredCrypto', crypto.id)}
                whileTap={{ scale: 0.95 }}
              >
                <img src={crypto.icon} alt={crypto.id} className="w-6 h-6" />
                <span className="text-sm font-medium">{crypto.id}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>,
    
    // Step 3: Contact Details
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crypto-purple/20 to-crypto-pink/20 flex items-center justify-center mx-auto mb-4"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <User size={28} className="text-crypto-purple" />
        </motion.div>
        <h3 className="text-lg font-bold">Your Details</h3>
        <p className="text-xs text-gray-500">So we can get back to you</p>
      </div>
      
      <AnimatedInput
        icon={User}
        label="Full Name"
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="John Smith"
        delay={0}
      />
      
      <AnimatedInput
        icon={Mail}
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="john@example.com"
        delay={0.1}
      />
      
      <AnimatedInput
        icon={Phone}
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => updateField('phone', e.target.value)}
        placeholder="+971 50 123 4567"
        delay={0.2}
      />
      
      <AnimatedInput
        icon={Calendar}
        label="Preferred Move-in Date"
        type="date"
        value={formData.moveInDate}
        onChange={(e) => updateField('moveInDate', e.target.value)}
        delay={0.3}
      />
    </motion.div>,
    
    // Step 4: Review & Submit
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crypto-teal/20 to-crypto-gold/20 flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Shield size={28} className="text-crypto-teal" />
        </motion.div>
        <h3 className="text-lg font-bold">Review Your Offer</h3>
        <p className="text-xs text-gray-500">Make sure everything looks good</p>
      </div>
      
      <div className="glass-card rounded-xl p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Property</span>
          <span className="text-sm font-medium">{property?.title || 'Luxury Penthouse'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Your Offer</span>
          <span className="text-sm font-bold text-crypto-teal">AED {Number(formData.offerAmount).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Payment</span>
          <span className="text-sm font-medium capitalize">{formData.paymentMethod} {formData.paymentMethod === 'crypto' && `(${formData.preferredCrypto})`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Contact</span>
          <span className="text-sm font-medium">{formData.email || 'Not provided'}</span>
        </div>
      </div>
      
      <div>
        <label className="text-xs text-gray-500 mb-2 block">Additional Message (Optional)</label>
        <textarea
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Any special requests or conditions..."
          className="w-full glass rounded-xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-crypto-teal resize-none h-24"
        />
      </div>
      
      <motion.div 
        className="flex items-center gap-2 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Shield size={14} className="text-crypto-teal" />
        <span>Your information is secure and encrypted</span>
      </motion.div>
    </motion.div>
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full sm:max-w-md max-h-[90vh] overflow-y-auto glass-dark rounded-t-3xl sm:rounded-3xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 px-4 py-4 border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-crypto-teal to-crypto-purple flex items-center justify-center"
                    animate={{ rotate: isSubmitting ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                  >
                    <Sparkles size={18} className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">Make an Offer</h3>
                    <p className="text-xs text-gray-500">{property?.title || 'Property'}</p>
                  </div>
                </div>
                <motion.button
                  className="p-2 glass rounded-xl"
                  onClick={resetForm}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className="text-gray-400" />
                </motion.button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {isComplete ? (
                <SuccessAnimation />
              ) : (
                <>
                  <StepIndicator currentStep={currentStep} totalSteps={4} />
                  
                  <AnimatePresence mode="wait">
                    {steps[currentStep]}
                  </AnimatePresence>
                </>
              )}
            </div>
            
            {/* Footer */}
            {!isComplete && (
              <div className="sticky bottom-0 p-4 border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl">
                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <motion.button
                      className="flex-1 py-3 glass rounded-xl font-medium text-gray-400"
                      onClick={handleBack}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    className="flex-1 py-3 glass-button rounded-xl font-medium flex items-center justify-center gap-2"
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles size={18} />
                      </motion.div>
                    ) : currentStep === 3 ? (
                      <>
                        <Send size={18} />
                        Submit Offer
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
            
            {isComplete && (
              <div className="p-4 border-t border-white/10">
                <motion.button
                  className="w-full py-3 glass-button rounded-xl font-medium"
                  onClick={resetForm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OfferForm
