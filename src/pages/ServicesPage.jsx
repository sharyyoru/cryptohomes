import { motion } from 'framer-motion'
import { 
  Building2, Wallet, TrendingUp, Shield, FileText, Users,
  ArrowRight, CheckCircle, Zap, Globe, Lock, Clock
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageTransition } from '../components/Layout'
import { GlassButton } from '../components/ui/GlassCard'

// Service Card
const ServiceCard = ({ service, index }) => (
  <motion.div
    className="glass-card rounded-2xl p-5 relative overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-crypto-teal/10 to-transparent rounded-full blur-2xl" />
    
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}>
      <service.icon size={28} className="text-white" />
    </div>
    
    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
    
    <ul className="space-y-2 mb-4">
      {service.features.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-2 text-xs text-gray-400">
          <CheckCircle size={12} className="text-crypto-teal shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    
    <Link to={service.link}>
      <button className="text-crypto-teal text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
        Learn More <ArrowRight size={14} />
      </button>
    </Link>
  </motion.div>
)

// Process Step
const ProcessStep = ({ step, index, total }) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.15 }}
  >
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crypto-teal to-crypto-purple flex items-center justify-center text-white font-bold">
          {index + 1}
        </div>
        {index < total - 1 && (
          <div className="w-0.5 h-full bg-gradient-to-b from-crypto-teal/50 to-transparent mt-2" />
        )}
      </div>
      <div className="pb-8">
        <h4 className="font-semibold mb-1">{step.title}</h4>
        <p className="text-sm text-gray-500">{step.description}</p>
      </div>
    </div>
  </motion.div>
)

// Benefit Card
const BenefitCard = ({ benefit, index }) => (
  <motion.div
    className="glass-card rounded-xl p-4 flex items-start gap-3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 + index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="w-10 h-10 rounded-xl bg-crypto-teal/20 flex items-center justify-center shrink-0">
      <benefit.icon size={20} className="text-crypto-teal" />
    </div>
    <div>
      <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
      <p className="text-xs text-gray-500">{benefit.description}</p>
    </div>
  </motion.div>
)

const ServicesPage = () => {
  const services = [
    {
      icon: Building2,
      title: 'Property Purchase',
      description: 'Buy premium Dubai real estate using your preferred cryptocurrency with our seamless process.',
      gradient: 'from-crypto-teal to-emerald-600',
      features: [
        'Direct crypto-to-property transactions',
        'Access to exclusive listings',
        'Legal documentation support',
        'End-to-end assistance'
      ],
      link: '/properties'
    },
    {
      icon: TrendingUp,
      title: 'Investment Advisory',
      description: 'Expert guidance on maximizing ROI with strategic property investments in Dubai.',
      gradient: 'from-crypto-purple to-violet-600',
      features: [
        'Market analysis reports',
        'Portfolio diversification',
        'Risk assessment',
        'ROI projections'
      ],
      link: '/contact'
    },
    {
      icon: Wallet,
      title: 'Property Tokenization',
      description: 'Convert your property into blockchain tokens for fractional ownership and liquidity.',
      gradient: 'from-crypto-gold to-amber-600',
      features: [
        'Fractional ownership',
        'Increased liquidity',
        'Smart contract security',
        'Global accessibility'
      ],
      link: '/contact'
    },
    {
      icon: Shield,
      title: 'Escrow Services',
      description: 'Secure crypto escrow services ensuring safe transactions for both buyers and sellers.',
      gradient: 'from-crypto-pink to-rose-600',
      features: [
        'Multi-signature wallets',
        'Automated release',
        'Full transparency',
        'Dispute resolution'
      ],
      link: '/contact'
    },
    {
      icon: FileText,
      title: 'Legal Support',
      description: 'Comprehensive legal assistance for crypto real estate transactions in UAE.',
      gradient: 'from-blue-500 to-blue-700',
      features: [
        'Contract preparation',
        'Due diligence',
        'Regulatory compliance',
        'Title transfer'
      ],
      link: '/contact'
    },
    {
      icon: Users,
      title: 'Property Management',
      description: 'Full-service property management for your Dubai real estate investments.',
      gradient: 'from-indigo-500 to-indigo-700',
      features: [
        'Tenant screening',
        'Rent collection in crypto',
        'Maintenance coordination',
        'Financial reporting'
      ],
      link: '/contact'
    },
  ]
  
  const process = [
    {
      title: 'Connect Your Wallet',
      description: 'Link your crypto wallet to our secure platform to get started.'
    },
    {
      title: 'Browse Properties',
      description: 'Explore our curated selection of premium Dubai properties.'
    },
    {
      title: 'Due Diligence',
      description: 'Our team verifies all property details and legal documentation.'
    },
    {
      title: 'Secure Transaction',
      description: 'Complete payment via smart contract with escrow protection.'
    },
    {
      title: 'Ownership Transfer',
      description: 'Receive blockchain-verified ownership documentation.'
    },
  ]
  
  const benefits = [
    { icon: Zap, title: 'Fast Transactions', description: 'Complete purchases in hours, not weeks' },
    { icon: Globe, title: 'Global Access', description: 'Invest from anywhere in the world' },
    { icon: Lock, title: 'Secure & Transparent', description: 'Blockchain-verified transactions' },
    { icon: Clock, title: '24/7 Support', description: 'Expert assistance around the clock' },
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
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Comprehensive crypto real estate solutions tailored for modern investors
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="space-y-4 mb-10">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </div>
        
        {/* How It Works */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-6 text-center">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="glass-card rounded-2xl p-5">
            {process.map((step, idx) => (
              <ProcessStep key={idx} step={step} index={idx} total={process.length} />
            ))}
          </div>
        </motion.div>
        
        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Why Choose Us</h2>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, idx) => (
              <BenefitCard key={idx} benefit={benefit} index={idx} />
            ))}
          </div>
        </div>
        
        {/* Supported Currencies */}
        <motion.div
          className="glass-card rounded-2xl p-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-4 text-center">Supported Cryptocurrencies</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { icon: '/img/icon/BTC-icon.svg', name: 'BTC' },
              { icon: '/img/icon/ETH-icon.svg', name: 'ETH' },
              { icon: '/img/icon/USDT-logo.svg', name: 'USDT' },
              { icon: '/img/icon/XRP-icon.svg', name: 'XRP' },
            ].map((crypto, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                  <img src={crypto.icon} alt={crypto.name} className="w-8 h-8" />
                </div>
                <span className="text-xs text-gray-500">{crypto.name}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-4">+ 50 more cryptocurrencies supported</p>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          className="glass-card rounded-3xl p-6 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-crypto-purple/20 rounded-full blur-3xl" />
          
          <h3 className="text-xl font-bold mb-2 relative z-10">Need Custom Solutions?</h3>
          <p className="text-sm text-gray-500 mb-4 relative z-10">
            Our team is ready to assist with your unique requirements
          </p>
          <Link to="/contact">
            <GlassButton variant="primary" fullWidth>
              Get in Touch <ArrowRight size={16} />
            </GlassButton>
          </Link>
        </motion.div>
      </main>
    </PageTransition>
  )
}

export default ServicesPage
