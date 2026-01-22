import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, ChevronRight, TrendingUp, Building2, Wallet, Shield, 
  Zap, Star, ArrowUpRight, Play, ChevronDown, Globe, Users, Award
} from 'lucide-react'
import { PageTransition } from '../components/Layout'
import { GlassCard, GlassButton, GlassInput } from '../components/ui/GlassCard'
import { PropertyCard, PropertyCardCompact } from '../components/PropertyCard'
import CryptoCalculator from '../components/CryptoCalculator'

// Hero Image Slideshow
const HeroSlideshow = () => {
  const [currentImage, setCurrentImage] = useState(0)
  
  const images = [
    { src: '/img/property/bulding-1.jpeg', title: 'Palm Jumeirah' },
    { src: '/img/home/street.jpeg', title: 'Dubai Marina' },
    { src: '/img/propertydetails/img-one.png', title: 'Downtown Dubai' },
    { src: '/img/footer/footer-img-one.jpeg', title: 'Emirates Hills' },
    { src: '/img/bg/agent-dashboard-img.jpeg', title: 'Business Bay' },
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <motion.div 
      className="relative h-48 rounded-2xl overflow-hidden mb-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src={images[currentImage].src} 
            alt={images[currentImage].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-crypto-teal/20 to-crypto-purple/20 mix-blend-overlay" />
        </motion.div>
      </AnimatePresence>
      
      {/* Content Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentImage}
            className="text-xs text-crypto-teal mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Featured Location
          </motion.p>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.h3
            key={currentImage}
            className="text-xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.1 }}
          >
            {images[currentImage].title}
          </motion.h3>
        </AnimatePresence>
      </div>
      
      {/* Image Indicators */}
      <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentImage 
                ? 'w-6 h-1.5 bg-crypto-teal' 
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
      
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: '1px solid rgba(20, 184, 166, 0.3)' }}
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(20, 184, 166, 0.1)',
            '0 0 40px rgba(20, 184, 166, 0.2)',
            '0 0 20px rgba(20, 184, 166, 0.1)',
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  )
}

// Hero Section
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    { title: 'Premium', highlight: 'Dubai Properties', subtitle: 'Pay with Cryptocurrency' },
    { title: 'Invest in', highlight: 'Luxury Real Estate', subtitle: 'Blockchain Verified' },
    { title: 'Your Gateway to', highlight: 'Crypto Homes', subtitle: 'Seamless Transactions' },
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <section className="relative mb-8 -mx-4 px-4 pt-2">
      {/* Background Shape */}
      <div className="absolute -top-20 -right-20 w-64 h-64 opacity-30 pointer-events-none">
        <img src="/img/hero/shape-color1.png" alt="" className="w-full animate-pulse-slow" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold font-['Space_Grotesk'] mb-2 leading-tight">
              {slides[currentSlide].title}
              <br />
              <span className="gradient-text">{slides[currentSlide].highlight}</span>
            </h1>
            <p className="text-gray-400 text-base">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* Slide Indicators */}
        <div className="flex gap-2 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-crypto-teal' : 'w-2 bg-gray-700'
              }`}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Hero Image Slideshow */}
      <div className="mt-6">
        <HeroSlideshow />
      </div>
      
      {/* Search Bar */}
      <motion.div 
        className="glass-card rounded-2xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Search size={20} className="text-crypto-teal" />
          <input 
            type="text" 
            placeholder="Search by location, property type..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex-1 glass px-3 py-2 rounded-xl text-xs text-gray-400 flex items-center justify-center gap-1">
            <img src="/img/home/FilterButtonMobile.svg" alt="" className="w-4 h-4 opacity-70" />
            Filters
          </button>
          <GlassButton variant="primary" size="md" className="flex-1">
            Search
          </GlassButton>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="flex justify-center mt-6"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown size={24} className="text-gray-600" />
      </motion.div>
    </section>
  )
}

// Stats Section
const StatsSection = () => {
  const stats = [
    { icon: Building2, value: '2,450+', label: 'Properties', change: '+12%', color: 'from-crypto-teal to-emerald-600', iconImg: '/img/icon/bi_01.png' },
    { icon: TrendingUp, value: '$128M', label: 'Crypto Sales', change: '+28%', color: 'from-crypto-gold to-amber-600', iconImg: '/img/icon/bi_02.png' },
    { icon: Users, value: '15K+', label: 'Happy Clients', change: '+18%', color: 'from-crypto-purple to-violet-600', iconImg: '/img/icon/bi_03.png' },
    { icon: Award, value: '98%', label: 'Satisfaction', change: '', color: 'from-crypto-pink to-rose-600', iconImg: '/img/icon/bi_04.png' },
  ]
  
  return (
    <section className="mb-8">
      <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            className="glass-card rounded-2xl p-4 min-w-[140px] relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 opacity-10">
              <img src={stat.iconImg} alt="" className="w-full" />
            </div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-bold font-['Space_Grotesk']">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            {stat.change && (
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={12} className="text-crypto-teal" />
                <span className="text-xs text-crypto-teal">{stat.change}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Quick Actions
const QuickActions = () => {
  const actions = [
    { icon: Building2, label: 'Buy', gradient: 'from-crypto-teal to-emerald-600', path: '/properties?type=buy' },
    { icon: TrendingUp, label: 'Invest', gradient: 'from-crypto-purple to-violet-600', path: '/properties?type=invest' },
    { icon: Wallet, label: 'Tokenize', gradient: 'from-crypto-gold to-amber-600', path: '/services' },
    { icon: Shield, label: 'Verify', gradient: 'from-crypto-pink to-rose-600', path: '/services' },
  ]
  
  return (
    <section className="mb-8">
      <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action, idx) => (
          <Link key={idx} to={action.path}>
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg`}>
                <action.icon size={24} className="text-white" />
              </div>
              <span className="text-xs text-gray-400">{action.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// Crypto Currencies Section
const CryptoSection = () => {
  const currencies = [
    { name: 'Bitcoin', symbol: 'BTC', icon: '/img/icon/BTC-icon.svg', change: '+2.4%', up: true },
    { name: 'Ethereum', symbol: 'ETH', icon: '/img/icon/ETH-icon.svg', change: '+1.8%', up: true },
    { name: 'Tether', symbol: 'USDT', icon: '/img/icon/USDT-logo.svg', change: '0.0%', up: true },
    { name: 'XRP', symbol: 'XRP', icon: '/img/icon/XRP-icon.svg', change: '-0.5%', up: false },
  ]
  
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Accepted Currencies</h3>
        <span className="text-xs text-crypto-teal">50+ Supported</span>
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
        {currencies.map((currency, idx) => (
          <motion.div
            key={idx}
            className="glass-card rounded-xl p-3 min-w-[120px] flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <img src={currency.icon} alt={currency.name} className="w-8 h-8" />
            <div>
              <p className="font-semibold text-sm">{currency.symbol}</p>
              <p className={`text-[10px] ${currency.up ? 'text-crypto-teal' : 'text-red-400'}`}>
                {currency.change}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Featured Properties
const FeaturedProperties = ({ properties }) => (
  <section className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-lg">Featured Properties</h3>
      <Link to="/properties" className="text-crypto-teal text-sm flex items-center gap-1">
        View All <ChevronRight size={16} />
      </Link>
    </div>
    <div className="space-y-4">
      {properties.slice(0, 2).map((property, idx) => (
        <PropertyCard key={property.id} property={property} featured={idx === 0} index={idx} />
      ))}
    </div>
  </section>
)

// Features Section
const FeaturesSection = () => {
  const features = [
    { 
      icon: '/img/feature/fea-01.svg', 
      title: 'Instant Crypto Payments', 
      desc: 'Pay with BTC, ETH, USDT and 50+ cryptocurrencies' 
    },
    { 
      icon: '/img/feature/fea-02.svg', 
      title: 'Blockchain Verified', 
      desc: 'All properties verified on the blockchain' 
    },
    { 
      icon: '/img/feature/fea-03.svg', 
      title: 'Premium Listings', 
      desc: "Dubai's most exclusive properties" 
    },
    { 
      icon: '/img/feature/fea-04.svg', 
      title: '24/7 Support', 
      desc: 'Expert assistance around the clock' 
    },
  ]
  
  return (
    <section className="mb-8">
      <h3 className="font-semibold text-lg mb-4">Why CryptoHomes?</h3>
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="glass-card rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={feature.icon} alt="" className="w-10 h-10 mb-3" />
            <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Partners Section
const PartnersSection = () => {
  const partners = Array.from({ length: 8 }, (_, i) => `/img/partner/partner_0${i + 1}.png`)
  
  return (
    <section className="mb-8">
      <h3 className="font-semibold text-lg mb-4">Trusted Partners</h3>
      <div className="glass-card rounded-2xl p-4">
        <div className="grid grid-cols-4 gap-4">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-center p-2 opacity-60 hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
            >
              <img src={partner} alt={`Partner ${idx + 1}`} className="w-full h-auto max-h-8 object-contain filter brightness-0 invert" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => (
  <section className="mb-8">
    <motion.div 
      className="glass-card rounded-3xl p-6 relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40">
        <img src="/img/hero/shape-color2.png" alt="" className="w-full opacity-40" />
      </div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-crypto-purple/30 to-transparent rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2">
          Ready to invest in
          <br />
          <span className="gradient-text">Dubai Real Estate?</span>
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Connect your wallet and start exploring premium properties today
        </p>
        <GlassButton variant="primary" fullWidth icon={Wallet}>
          Connect Wallet
          <ArrowUpRight size={16} />
        </GlassButton>
      </div>
    </motion.div>
  </section>
)

// Sample Data
const sampleProperties = [
  {
    id: 1,
    title: 'Luxury Penthouse Palm Jumeirah',
    location: 'Palm Jumeirah, Dubai',
    price: 'AED 15.5M',
    cryptoPrice: '142 BTC',
    image: '/img/property/bulding-1.jpeg',
    beds: 4,
    baths: 5,
    sqft: '8,500 sqft',
    crypto: true,
    liked: true,
    tag: 'Hot Deal'
  },
  {
    id: 2,
    title: 'Modern Villa Emirates Hills',
    location: 'Emirates Hills, Dubai',
    price: 'AED 28M',
    cryptoPrice: '256 BTC',
    image: '/img/propertydetails/img-one.png',
    beds: 6,
    baths: 7,
    sqft: '12,000 sqft',
    crypto: true,
    liked: false,
  },
  {
    id: 3,
    title: 'Waterfront Apartment Marina',
    location: 'Dubai Marina',
    price: 'AED 4.2M',
    cryptoPrice: '38 BTC',
    image: '/img/home/street.jpeg',
    beds: 2,
    baths: 2,
    sqft: '1,800 sqft',
    crypto: true,
    liked: false,
  },
]

// Main HomePage Component
const HomePage = () => {
  return (
    <PageTransition>
      <main className="pt-20 pb-28 px-4 relative z-10 overflow-x-hidden w-full">
        <HeroSection />
        <StatsSection />
        <QuickActions />
        <CryptoSection />
        <CryptoCalculator />
        <FeaturedProperties properties={sampleProperties} />
        <FeaturesSection />
        <PartnersSection />
        <CTASection />
      </main>
    </PageTransition>
  )
}

export default HomePage
