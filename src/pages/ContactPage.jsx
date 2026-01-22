import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Clock, Send, MessageCircle,
  Instagram, Twitter, Linkedin, Facebook, ArrowRight, CheckCircle
} from 'lucide-react'
import { PageTransition } from '../components/Layout'
import { GlassButton } from '../components/ui/GlassCard'

// Contact Info Card
const ContactInfoCard = ({ icon: Icon, title, value, link, color }) => (
  <motion.a
    href={link}
    className="glass-card rounded-2xl p-4 flex items-center gap-4"
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <p className="font-medium text-sm">{value}</p>
    </div>
  </motion.a>
)

// Social Link
const SocialLink = ({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="glass rounded-xl p-3 flex items-center justify-center hover:bg-crypto-teal/20 transition-colors"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    title={label}
  >
    <Icon size={20} className="text-gray-400 hover:text-crypto-teal transition-colors" />
  </motion.a>
)

// FAQ Item
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-sm pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="shrink-0"
        >
          <ArrowRight size={16} className={`transform rotate-90 ${isOpen ? 'text-crypto-teal' : 'text-gray-500'}`} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  )
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }
  
  const contactInfo = [
    { icon: Phone, title: 'Phone', value: '+971 4 123 4567', link: 'tel:+97141234567', color: 'from-crypto-teal to-emerald-600' },
    { icon: MessageCircle, title: 'WhatsApp', value: '+971 50 123 4567', link: 'https://wa.me/971501234567', color: 'from-green-500 to-green-700' },
    { icon: Mail, title: 'Email', value: 'info@cryptohomes.ae', link: 'mailto:info@cryptohomes.ae', color: 'from-crypto-purple to-violet-600' },
    { icon: MapPin, title: 'Address', value: 'DIFC, Dubai, UAE', link: '#', color: 'from-crypto-gold to-amber-600' },
  ]
  
  const faqs = [
    {
      question: 'Which cryptocurrencies do you accept?',
      answer: 'We accept over 50 cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), USDT, USDC, BNB, and many more. Contact us for the full list.'
    },
    {
      question: 'How long does a crypto property purchase take?',
      answer: 'With cryptocurrency payments, transactions can be completed in as little as 24-48 hours once all documentation is in order, compared to weeks with traditional methods.'
    },
    {
      question: 'Is it legal to buy property with crypto in Dubai?',
      answer: 'Yes, Dubai has embraced cryptocurrency for real estate transactions. We ensure all transactions comply with UAE regulations and RERA guidelines.'
    },
    {
      question: 'Do you provide escrow services?',
      answer: 'Yes, we offer secure escrow services with multi-signature wallets to protect both buyers and sellers throughout the transaction process.'
    },
  ]
  
  return (
    <PageTransition>
      <main className="pt-20 pb-28 px-4 relative z-10">
        {/* Hero */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-3">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Ready to invest in Dubai real estate? Our team is here to help
          </p>
        </motion.div>
        
        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <ContactInfoCard {...info} />
            </motion.div>
          ))}
        </div>
        
        {/* Office Hours */}
        <motion.div
          className="glass-card rounded-2xl p-4 mb-8 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crypto-pink to-rose-600 flex items-center justify-center">
            <Clock size={22} className="text-white" />
          </div>
          <div>
            <p className="font-medium">Office Hours</p>
            <p className="text-sm text-gray-500">Sunday - Thursday: 9AM - 6PM GST</p>
          </div>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div
          className="glass-card rounded-2xl p-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-bold mb-4">Send us a Message</h2>
          
          {submitted ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 rounded-full bg-crypto-teal/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-crypto-teal" />
              </div>
              <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
              <p className="text-sm text-gray-500">We'll get back to you within 24 hours</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full glass rounded-xl px-4 py-3 bg-transparent text-sm outline-none focus:ring-1 focus:ring-crypto-teal transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="glass rounded-xl px-4 py-3 bg-transparent text-sm outline-none focus:ring-1 focus:ring-crypto-teal transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="glass rounded-xl px-4 py-3 bg-transparent text-sm outline-none focus:ring-1 focus:ring-crypto-teal transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <select
                className="w-full glass rounded-xl px-4 py-3 bg-transparent text-sm outline-none focus:ring-1 focus:ring-crypto-teal transition-all text-gray-400"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option value="">Select Subject</option>
                <option value="buy">Buy Property</option>
                <option value="sell">Sell Property</option>
                <option value="invest">Investment Inquiry</option>
                <option value="other">Other</option>
              </select>
              
              <textarea
                placeholder="Your Message"
                rows={4}
                required
                className="w-full glass rounded-xl px-4 py-3 bg-transparent text-sm outline-none resize-none focus:ring-1 focus:ring-crypto-teal transition-all"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              
              <GlassButton type="submit" variant="primary" fullWidth>
                Send Message <Send size={16} />
              </GlassButton>
            </form>
          )}
        </motion.div>
        
        {/* Social Links */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-4 text-center">Follow Us</h3>
          <div className="flex justify-center gap-3">
            <SocialLink icon={Instagram} href="https://instagram.com/cryptohomesdxb" label="Instagram" />
            <SocialLink icon={Twitter} href="https://twitter.com/cryptohomesdxb" label="Twitter" />
            <SocialLink icon={Linkedin} href="https://linkedin.com/company/cryptohomesdxb" label="LinkedIn" />
            <SocialLink icon={Facebook} href="https://facebook.com/cryptohomesdxb" label="Facebook" />
          </div>
        </motion.div>
        
        {/* Map */}
        <motion.div
          className="glass-card rounded-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative h-48">
            <img 
              src="/img/propertydetails/map.jpeg" 
              alt="Office Location" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass rounded-xl p-3 flex items-center gap-3">
                <MapPin size={20} className="text-crypto-teal shrink-0" />
                <div>
                  <p className="font-medium text-sm">CryptoHomes DXB</p>
                  <p className="text-xs text-gray-500">DIFC, Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} {...faq} index={idx} />
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default ContactPage
