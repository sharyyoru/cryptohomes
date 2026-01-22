import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, 
  Car, Dumbbell, Waves, Shield, Wifi, TreePine,
  Phone, MessageCircle, Mail, ChevronRight, Play, X,
  Building2, Calendar, Check, Info, Sparkles
} from 'lucide-react'
import { PageTransition } from '../components/Layout'
import { GlassButton } from '../components/ui/GlassCard'
import OfferForm from '../components/OfferForm'

// Sample property data
const propertyData = {
  id: 1,
  title: 'Luxury Penthouse Palm Jumeirah',
  location: 'Palm Jumeirah, Dubai, UAE',
  price: 'AED 15,500,000',
  cryptoPrice: '142 BTC',
  ethPrice: '4,250 ETH',
  usdtPrice: '4,221,630 USDT',
  description: 'Experience unparalleled luxury in this stunning penthouse located in the heart of Palm Jumeirah. This exceptional residence offers breathtaking panoramic views of the Arabian Gulf and Dubai skyline. Featuring premium finishes, smart home technology, and exclusive amenities.',
  images: [
    '/img/property/bulding-1.jpeg',
    '/img/propertydetails/img-one.png',
    '/img/home/street.jpeg',
  ],
  beds: 4,
  baths: 5,
  sqft: '8,500',
  parking: 3,
  yearBuilt: 2023,
  type: 'Penthouse',
  status: 'Ready',
  developer: 'Emaar Properties',
  developerLogo: '/img/propertydetails/logo-1.png',
  amenities: [
    { icon: Waves, label: 'Private Pool' },
    { icon: Dumbbell, label: 'Gym' },
    { icon: Car, label: '3 Parking' },
    { icon: Shield, label: '24/7 Security' },
    { icon: Wifi, label: 'Smart Home' },
    { icon: TreePine, label: 'Garden' },
  ],
  features: [
    'Floor-to-ceiling windows',
    'Italian marble flooring',
    'Bulthaup kitchen',
    'Private elevator',
    'Maid\'s room',
    'Study room',
    'Walk-in closets',
    'Jacuzzi',
  ],
  agent: {
    name: 'Sarah Johnson',
    title: 'Senior Property Consultant',
    image: '/img/agent/agent-1.jpeg',
    phone: '+971 50 123 4567',
    whatsapp: '+971501234567',
    email: 'sarah@cryptohomes.ae',
  },
  floorPlan: '/img/propertydetails/Floor-Plan-bg.png',
  video: '/img/propertydetails/example.mp4',
  crypto: true,
  liked: false,
}

// Image Gallery Modal
const GalleryModal = ({ images, currentIndex, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-3 glass rounded-full z-10"
        >
          <X size={24} />
        </button>
        <motion.img
          src={images[currentIndex]}
          alt=""
          className="max-w-full max-h-full object-contain"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      </motion.div>
    )}
  </AnimatePresence>
)

// Contact Modal
const ContactModal = ({ agent, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="fixed bottom-0 left-0 right-0 glass-dark rounded-t-3xl z-50 p-6"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-2xl object-cover" />
            <div>
              <h3 className="font-bold text-lg">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.title}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <a href={`tel:${agent.phone}`} className="flex items-center gap-4 glass rounded-xl p-4">
              <div className="w-12 h-12 rounded-xl bg-crypto-teal/20 flex items-center justify-center">
                <Phone size={20} className="text-crypto-teal" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{agent.phone}</p>
              </div>
            </a>
            
            <a href={`https://wa.me/${agent.whatsapp}`} className="flex items-center gap-4 glass rounded-xl p-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <MessageCircle size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-medium">Send Message</p>
              </div>
            </a>
            
            <a href={`mailto:${agent.email}`} className="flex items-center gap-4 glass rounded-xl p-4">
              <div className="w-12 h-12 rounded-xl bg-crypto-purple/20 flex items-center justify-center">
                <Mail size={20} className="text-crypto-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{agent.email}</p>
              </div>
            </a>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

const PropertyDetailPage = () => {
  const { id } = useParams()
  const [currentImage, setCurrentImage] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [offerOpen, setOfferOpen] = useState(false)
  const [liked, setLiked] = useState(propertyData.liked)
  const [activeTab, setActiveTab] = useState('details')
  
  const property = propertyData
  
  return (
    <PageTransition>
      <main className="pb-28 relative z-10">
        {/* Image Gallery */}
        <div className="relative h-72">
          <motion.img
            src={property.images[currentImage]}
            alt={property.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setGalleryOpen(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          
          {/* Header Actions */}
          <div className="absolute top-4 left-4 right-4 flex justify-between safe-top">
            <Link to="/properties">
              <motion.button 
                className="p-3 glass rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <div className="flex gap-2">
              <motion.button 
                className="p-3 glass rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={20} />
              </motion.button>
              <motion.button 
                className="p-3 glass rounded-xl"
                whileTap={{ scale: 0.95 }}
                onClick={() => setLiked(!liked)}
              >
                <Heart size={20} className={liked ? 'fill-crypto-pink text-crypto-pink' : ''} />
              </motion.button>
            </div>
          </div>
          
          {/* Crypto Badge */}
          {property.crypto && (
            <div className="absolute top-20 left-4">
              <span className="glass px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md">
                <img src="/img/icon/BTC-icon.svg" alt="BTC" className="w-4 h-4" />
                Crypto Accepted
              </span>
            </div>
          )}
          
          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImage ? 'w-6 bg-crypto-teal' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="px-4 -mt-4 relative z-10">
          {/* Price & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-4 mb-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-2xl font-bold font-['Space_Grotesk'] gradient-text">
                  {property.price}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-crypto-gold flex items-center gap-1">
                    <img src="/img/icon/BTC-icon.svg" alt="BTC" className="w-3 h-3" />
                    {property.cryptoPrice}
                  </span>
                  <span className="text-xs text-crypto-purple flex items-center gap-1">
                    <img src="/img/icon/ETH-icon.svg" alt="ETH" className="w-3 h-3" />
                    {property.ethPrice}
                  </span>
                </div>
              </div>
              <span className="bg-crypto-teal/20 text-crypto-teal px-3 py-1 rounded-full text-xs font-medium">
                {property.status}
              </span>
            </div>
            
            <h1 className="text-xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-500 text-sm flex items-center gap-1.5">
              <MapPin size={14} className="text-crypto-teal" />
              {property.location}
            </p>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-4 gap-3 mb-4"
          >
            {[
              { icon: '/img/property/green-bed.png', value: property.beds, label: 'Beds' },
              { icon: '/img/property/green-bath.png', value: property.baths, label: 'Baths' },
              { icon: '/img/property/green-size.png', value: property.sqft, label: 'Sq.Ft' },
              { icon: '/img/propertydetails/Component4.png', value: property.parking, label: 'Parking' },
            ].map((stat, idx) => (
              <div key={idx} className="glass-card rounded-xl p-3 text-center">
                <img src={stat.icon} alt="" className="w-5 h-5 mx-auto mb-1 opacity-70" />
                <p className="font-bold text-sm">{stat.value}</p>
                <p className="text-[10px] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
            {['details', 'amenities', 'floor plan', 'location'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab 
                    ? 'glass-button text-white' 
                    : 'glass text-gray-400'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Description */}
                <div className="glass-card rounded-2xl p-4 mb-4">
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{property.description}</p>
                </div>
                
                {/* Property Info */}
                <div className="glass-card rounded-2xl p-4 mb-4">
                  <h3 className="font-semibold mb-3">Property Information</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-400">Type:</span>
                      <span className="text-sm font-medium">{property.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-400">Built:</span>
                      <span className="text-sm font-medium">{property.yearBuilt}</span>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="glass-card rounded-2xl p-4 mb-4">
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <Check size={14} className="text-crypto-teal shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'amenities' && (
              <motion.div
                key="amenities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-2xl p-4 mb-4"
              >
                <h3 className="font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="glass rounded-xl p-3 text-center">
                      <amenity.icon size={24} className="mx-auto mb-2 text-crypto-teal" />
                      <p className="text-xs text-gray-400">{amenity.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'floor plan' && (
              <motion.div
                key="floorplan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-2xl p-4 mb-4"
              >
                <h3 className="font-semibold mb-3">Floor Plan</h3>
                <img 
                  src={property.floorPlan} 
                  alt="Floor Plan" 
                  className="w-full rounded-xl"
                />
              </motion.div>
            )}
            
            {activeTab === 'location' && (
              <motion.div
                key="location"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-2xl p-4 mb-4"
              >
                <h3 className="font-semibold mb-3">Location</h3>
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src="/img/propertydetails/map.jpeg" 
                    alt="Map" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-button px-4 py-2 rounded-xl text-sm flex items-center gap-2">
                      <MapPin size={16} />
                      View on Map
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Developer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-4 mb-4"
          >
            <h3 className="font-semibold mb-3">Developer</h3>
            <div className="flex items-center gap-3">
              <img src={property.developerLogo} alt={property.developer} className="h-10 object-contain" />
              <div>
                <p className="font-medium">{property.developer}</p>
                <p className="text-xs text-gray-500">Premium Developer</p>
              </div>
            </div>
          </motion.div>
          
          {/* Agent Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-4 mb-4"
          >
            <h3 className="font-semibold mb-3">Property Agent</h3>
            <div className="flex items-center gap-3">
              <img 
                src={property.agent.image} 
                alt={property.agent.name} 
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{property.agent.name}</p>
                <p className="text-xs text-gray-500">{property.agent.title}</p>
              </div>
              <ChevronRight size={20} className="text-gray-500" />
            </div>
          </motion.div>
        </div>
        
        {/* Fixed Bottom CTA - positioned above bottom nav */}
        <motion.div 
          className="fixed bottom-24 left-0 right-0 p-4 z-30"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-dark rounded-2xl p-3 border border-white/10 shadow-2xl shadow-black/50">
            {/* Agent Info Row */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
              <img 
                src={property.agent.image} 
                alt={property.agent.name} 
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{property.agent.name}</p>
                <p className="text-[10px] text-gray-500">{property.agent.title}</p>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
            </div>
            
            {/* Buttons */}
            <div className="flex gap-3">
              <motion.button 
                className="flex-1 flex items-center justify-center gap-2 py-3 glass rounded-xl font-medium text-sm"
                onClick={() => setContactOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={16} className="text-crypto-teal" />
                Call
              </motion.button>
              <motion.button 
                className="flex-1 flex items-center justify-center gap-2 py-3 glass-button rounded-xl font-medium text-sm"
                onClick={() => setOfferOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={16} />
                Make an Offer
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <GalleryModal 
          images={property.images} 
          currentIndex={currentImage}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
        
        <ContactModal
          agent={property.agent}
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
        
        <OfferForm
          isOpen={offerOpen}
          onClose={() => setOfferOpen(false)}
          property={property}
        />
      </main>
    </PageTransition>
  )
}

export default PropertyDetailPage
