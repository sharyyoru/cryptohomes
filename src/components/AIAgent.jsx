import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, X, Send, Sparkles, Bot, User,
  Building2, TrendingUp, MapPin, DollarSign, Mic, Paperclip
} from 'lucide-react'

// Typing indicator component
const TypingIndicator = () => (
  <motion.div 
    className="flex items-center gap-1 px-4 py-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-teal to-crypto-purple flex items-center justify-center">
        <Bot size={16} className="text-white" />
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-crypto-teal rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
)

// Chat message component
const ChatMessage = ({ message, isBot, isNew }) => (
  <motion.div
    className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    initial={isNew ? { opacity: 0, y: 20, scale: 0.95 } : false}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
      isBot 
        ? 'bg-gradient-to-br from-crypto-teal to-crypto-purple' 
        : 'bg-gradient-to-br from-crypto-gold to-amber-600'
    }`}>
      {isBot ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
    </div>
    <div className={`max-w-[75%] ${isBot ? '' : 'text-right'}`}>
      <motion.div
        className={`rounded-2xl px-4 py-3 ${
          isBot 
            ? 'glass-card rounded-tl-sm' 
            : 'bg-gradient-to-r from-crypto-teal to-emerald-600 rounded-tr-sm'
        }`}
        initial={isNew ? { scale: 0.8 } : false}
        animate={{ scale: 1 }}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </motion.div>
      {message.options && (
        <motion.div 
          className="flex flex-wrap gap-2 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {message.options.map((option, idx) => (
            <motion.button
              key={idx}
              className="glass px-3 py-1.5 rounded-full text-xs text-crypto-teal hover:bg-crypto-teal/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => option.action?.()}
            >
              {option.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  </motion.div>
)

// Quick action button
const QuickAction = ({ icon: Icon, label, onClick }) => (
  <motion.button
    className="flex items-center gap-2 glass px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-crypto-teal hover:bg-crypto-teal/10 transition-all"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    <Icon size={14} />
    {label}
  </motion.button>
)

// AI responses based on context
const getAIResponse = (userMessage, conversationContext) => {
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      text: "Hey there! 👋 I'm your CryptoHomes AI assistant. I'm here to help you find the perfect property investment in Dubai. Are you looking to buy, invest, or just exploring the market?",
      options: [
        { label: '🏠 Buy a Property' },
        { label: '📈 Investment Advice' },
        { label: '🔍 Just Browsing' }
      ]
    }
  }
  
  if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
    return {
      text: "Great choice! Dubai's real estate market is booming 🚀 What type of property interests you most? We have stunning options from luxury penthouses in Palm Jumeirah to modern apartments in Dubai Marina.",
      options: [
        { label: '🏢 Apartment' },
        { label: '🏠 Villa' },
        { label: '🌆 Penthouse' },
        { label: '💰 Best Deals' }
      ]
    }
  }
  
  if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
    return {
      text: "Smart thinking! 💡 Dubai offers excellent ROI opportunities. Currently, properties in Downtown Dubai and Palm Jumeirah are showing 8-12% annual returns. What's your investment budget range?",
      options: [
        { label: 'Under AED 2M' },
        { label: 'AED 2M - 5M' },
        { label: 'AED 5M - 10M' },
        { label: 'Above AED 10M' }
      ]
    }
  }
  
  if (lowerMessage.includes('budget') || lowerMessage.includes('price') || lowerMessage.includes('aed') || lowerMessage.includes('million')) {
    return {
      text: "Perfect! Within that range, I'd recommend checking out our featured properties in Dubai Marina and Business Bay. They offer great value and strong rental yields. Would you like me to show you some specific listings?",
      options: [
        { label: '📱 Show Listings' },
        { label: '📊 Market Analysis' },
        { label: '🗓️ Schedule Viewing' }
      ]
    }
  }
  
  if (lowerMessage.includes('crypto') || lowerMessage.includes('bitcoin') || lowerMessage.includes('btc') || lowerMessage.includes('ethereum')) {
    return {
      text: "Yes! We fully support crypto payments 🪙 You can purchase any of our properties using Bitcoin, Ethereum, USDT, and 50+ other cryptocurrencies. The transaction is seamless and blockchain-verified. Would you like to know more about the process?",
      options: [
        { label: '🔗 How it Works' },
        { label: '💱 Conversion Rates' },
        { label: '🛡️ Security Info' }
      ]
    }
  }
  
  if (lowerMessage.includes('palm') || lowerMessage.includes('jumeirah')) {
    return {
      text: "Palm Jumeirah is absolutely stunning! 🌴 We have exclusive listings there starting from AED 5M. The beachfront villas offer private beaches, and the apartments have breathtaking sea views. It's one of Dubai's most prestigious addresses!",
      options: [
        { label: '🏠 View Villas' },
        { label: '🏢 View Apartments' },
        { label: '📍 Area Guide' }
      ]
    }
  }
  
  if (lowerMessage.includes('marina') || lowerMessage.includes('downtown')) {
    return {
      text: "Excellent choice! Dubai Marina is perfect for waterfront living with vibrant nightlife 🌃 Downtown is the heart of the city with Burj Khalifa views! Both areas have strong rental demand. What matters more to you - lifestyle or investment returns?",
      options: [
        { label: '🎉 Lifestyle First' },
        { label: '💰 Returns First' },
        { label: '⚖️ Balance Both' }
      ]
    }
  }
  
  if (lowerMessage.includes('viewing') || lowerMessage.includes('visit') || lowerMessage.includes('schedule')) {
    return {
      text: "I'd be happy to arrange a viewing! 📅 Our property consultants are available 7 days a week. We can also do virtual tours if you're not in Dubai yet. When would be a good time for you?",
      options: [
        { label: '📹 Virtual Tour' },
        { label: '🗓️ This Week' },
        { label: '📞 Call Me Back' }
      ]
    }
  }
  
  if (lowerMessage.includes('apartment') || lowerMessage.includes('flat')) {
    return {
      text: "We have beautiful apartments ranging from cozy studios to spacious 4-bedrooms! 🏢 Popular areas include Dubai Marina (great for expats), Downtown (iconic views), and JBR (beach lifestyle). What size are you looking for?",
      options: [
        { label: 'Studio/1BR' },
        { label: '2-3 Bedrooms' },
        { label: '4+ Bedrooms' }
      ]
    }
  }
  
  if (lowerMessage.includes('villa') || lowerMessage.includes('house')) {
    return {
      text: "Our villa portfolio is impressive! 🏡 From Emirates Hills mansions to Arabian Ranches family homes. Most come with private pools, gardens, and smart home features. Are you looking for something specific - family home or luxury showcase?",
      options: [
        { label: '👨‍👩‍👧 Family Home' },
        { label: '✨ Luxury Estate' },
        { label: '🌴 Beachfront' }
      ]
    }
  }
  
  // Default response
  const defaults = [
    {
      text: "That's interesting! Tell me more about what you're looking for. Are you focused on a specific area in Dubai, or would you like me to recommend some top locations based on your preferences?",
      options: [
        { label: '🗺️ Show Areas' },
        { label: '⭐ Top Picks' },
        { label: '💬 More Questions' }
      ]
    },
    {
      text: "I'd love to help you with that! Dubai has so much to offer - from stunning waterfront properties to serene golf course communities. What's your top priority when choosing a home?",
      options: [
        { label: '📍 Location' },
        { label: '💵 Price' },
        { label: '🏊 Amenities' }
      ]
    },
    {
      text: "Great question! Let me think about that... 🤔 Based on current market trends, I'd say now is actually a great time to invest. The expo effect is still driving growth, and new infrastructure projects are boosting property values.",
      options: [
        { label: '📈 Market Trends' },
        { label: '🆕 New Projects' },
        { label: '🏆 Best Deals' }
      ]
    }
  ]
  
  return defaults[Math.floor(Math.random() * defaults.length)]
}

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 I'm Luna, your CryptoHomes AI assistant. I can help you find the perfect property investment in Dubai. What are you looking for today?",
      isBot: true,
      options: [
        { label: '🏠 Buy Property' },
        { label: '📈 Investment Tips' },
        { label: '💰 Crypto Payments' },
        { label: '🔍 Browse Areas' }
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return
    
    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      isNew: true
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    // Simulate AI thinking time
    const thinkingTime = 1000 + Math.random() * 1500
    
    setTimeout(() => {
      setIsTyping(false)
      const response = getAIResponse(text, messages)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        ...response,
        isBot: true,
        isNew: true
      }])
    }, thinkingTime)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-crypto-teal to-crypto-purple shadow-lg shadow-crypto-teal/30 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: isOpen ? 0 : 1, 
          rotate: 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-crypto-teal"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles size={24} className="text-white" />
        </motion.div>
        
        {/* Notification badge */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-crypto-gold rounded-full flex items-center justify-center text-[10px] font-bold text-black"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          AI
        </motion.div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Container */}
            <motion.div
              className="relative w-full sm:max-w-md h-[85vh] sm:h-[600px] glass-dark rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden"
              initial={{ y: '100%', scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: '100%', scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="relative px-4 py-4 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-crypto-teal/20 to-crypto-purple/20" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-crypto-teal to-crypto-purple flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Bot size={20} className="text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        Luna AI
                        <motion.span
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </h3>
                      <p className="text-xs text-gray-400">Your Property Investment Assistant</p>
                    </div>
                  </div>
                  <motion.button
                    className="p-2 glass rounded-xl"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} className="text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} isBot={msg.isBot} isNew={msg.isNew} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-white/5">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                  <QuickAction icon={Building2} label="Properties" onClick={() => handleSend("Show me properties")} />
                  <QuickAction icon={TrendingUp} label="Investment" onClick={() => handleSend("Investment advice")} />
                  <QuickAction icon={MapPin} label="Areas" onClick={() => handleSend("Best areas in Dubai")} />
                  <QuickAction icon={DollarSign} label="Budget" onClick={() => handleSend("Properties under 5 million")} />
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <motion.button
                    className="p-2.5 glass rounded-xl text-gray-500 hover:text-crypto-teal transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Paperclip size={18} />
                  </motion.button>
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Luna anything..."
                      className="w-full glass rounded-xl py-3 px-4 pr-12 text-sm outline-none focus:ring-1 focus:ring-crypto-teal"
                    />
                    <motion.button
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-crypto-teal transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mic size={18} />
                    </motion.button>
                  </div>
                  <motion.button
                    className="p-2.5 glass-button rounded-xl"
                    onClick={() => handleSend()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputValue.trim()}
                  >
                    <Send size={18} className="text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIAgent
