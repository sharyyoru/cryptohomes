import { motion } from 'framer-motion'
import { 
  Award, Users, Globe, TrendingUp, CheckCircle, ArrowRight,
  Linkedin, Twitter, Instagram
} from 'lucide-react'
import { PageTransition } from '../components/Layout'
import { GlassButton } from '../components/ui/GlassCard'
import { Link } from 'react-router-dom'

// Team Member Card
const TeamMember = ({ member, index }) => (
  <motion.div
    className="glass-card rounded-2xl p-4 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <div className="relative inline-block mb-3">
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-20 h-20 rounded-2xl object-cover mx-auto"
      />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-crypto-teal rounded-lg flex items-center justify-center">
        <CheckCircle size={14} className="text-white" />
      </div>
    </div>
    <h4 className="font-semibold">{member.name}</h4>
    <p className="text-xs text-gray-500 mb-3">{member.role}</p>
    <div className="flex justify-center gap-2">
      <button className="p-2 glass rounded-lg hover:text-crypto-teal transition-colors">
        <Linkedin size={14} />
      </button>
      <button className="p-2 glass rounded-lg hover:text-crypto-teal transition-colors">
        <Twitter size={14} />
      </button>
    </div>
  </motion.div>
)

// Stats Card
const StatCard = ({ icon: Icon, value, label, index }) => (
  <motion.div
    className="glass-card rounded-2xl p-4 text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crypto-teal/20 to-crypto-purple/20 flex items-center justify-center mx-auto mb-3">
      <Icon size={24} className="text-crypto-teal" />
    </div>
    <p className="text-2xl font-bold font-['Space_Grotesk'] gradient-text">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{label}</p>
  </motion.div>
)

// Commitment Card
const CommitmentCard = ({ item, index }) => (
  <motion.div
    className="glass-card rounded-2xl p-4 flex items-start gap-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <img src={item.icon} alt="" className="w-12 h-12 object-contain" />
    <div>
      <h4 className="font-semibold mb-1">{item.title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
    </div>
  </motion.div>
)

const AboutPage = () => {
  const stats = [
    { icon: Award, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '15K+', label: 'Happy Clients' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: TrendingUp, value: '$500M+', label: 'Properties Sold' },
  ]
  
  const team = [
    { name: 'Ahmed Hassan', role: 'CEO & Founder', image: '/img/about/ourTeam/CEO.png' },
    { name: 'Sarah Miller', role: 'Head of Sales', image: '/img/about/ourTeam/RealState.png' },
    { name: 'David Chen', role: 'Tech Lead', image: '/img/about/ourTeam/Developer.png' },
    { name: 'Maria Garcia', role: 'Property Expert', image: '/img/about/ourTeam/RealState2.png' },
  ]
  
  const commitments = [
    { 
      icon: '/img/about/about-commitment1.png',
      title: 'Transparency First',
      description: 'Every transaction is recorded on the blockchain for complete transparency and trust.'
    },
    { 
      icon: '/img/about/about-commitment2.png',
      title: 'Premium Service',
      description: 'Dedicated support team available 24/7 to assist with all your real estate needs.'
    },
    { 
      icon: '/img/about/about-commitment3.png',
      title: 'Secure Transactions',
      description: 'Advanced security protocols to protect your investments and personal data.'
    },
  ]
  
  const values = [
    'Blockchain-verified property ownership',
    'Instant cryptocurrency payments',
    'Zero hidden fees policy',
    'Expert market analysis',
    'Personalized investment advice',
    'Global property portfolio',
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
            About <span className="gradient-text">CryptoHomes</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Pioneering the future of real estate with blockchain technology and cryptocurrency payments
          </p>
        </motion.div>
        
        {/* About Image */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <img 
            src="/img/about/about-img.png" 
            alt="About CryptoHomes" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="glass rounded-xl p-3 flex items-center gap-3">
              <img src="/img/logo/Logo.png" alt="Logo" className="h-8" />
              <div>
                <p className="font-semibold text-sm">CryptoHomes DXB</p>
                <p className="text-[10px] text-gray-500">Dubai's Premier Crypto Real Estate</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} index={idx} />
          ))}
        </div>
        
        {/* Our Story */}
        <motion.div
          className="glass-card rounded-2xl p-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4">Our Story</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Founded in 2019, CryptoHomes emerged from a vision to bridge the gap between cryptocurrency wealth and premium real estate investment. We recognized that crypto investors needed a trusted platform to convert their digital assets into tangible property investments.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Today, we've facilitated over $500 million in property transactions, helping thousands of clients from 50+ countries invest in Dubai's thriving real estate market using their preferred cryptocurrency.
          </p>
        </motion.div>
        
        {/* What We Offer */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4">What We Offer</h2>
          <div className="glass-card rounded-2xl p-4">
            <div className="space-y-3">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                >
                  <div className="w-6 h-6 rounded-full bg-crypto-teal/20 flex items-center justify-center shrink-0">
                    <CheckCircle size={14} className="text-crypto-teal" />
                  </div>
                  <span className="text-sm text-gray-300">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Our Commitments */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Our Commitment</h2>
          <div className="space-y-3">
            {commitments.map((item, idx) => (
              <CommitmentCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
        
        {/* Team */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-2 gap-3">
            {team.map((member, idx) => (
              <TeamMember key={idx} member={member} index={idx} />
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <motion.div
          className="glass-card rounded-3xl p-6 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-crypto-teal/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-crypto-purple/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-sm text-gray-500 mb-4">
              Let us help you find your perfect crypto home in Dubai
            </p>
            <Link to="/contact">
              <GlassButton variant="primary" fullWidth>
                Contact Us <ArrowRight size={16} />
              </GlassButton>
            </Link>
          </div>
        </motion.div>
      </main>
    </PageTransition>
  )
}

export default AboutPage
