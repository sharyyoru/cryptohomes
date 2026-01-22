import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart, Sparkles } from 'lucide-react'

export const PropertyCard = ({ property, featured = false, index = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <Link to={`/property/${property.id}`}>
      <motion.div 
        className={`glass-card rounded-3xl overflow-hidden ${featured ? 'col-span-full' : ''}`}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="relative">
          <motion.img 
            src={property.image} 
            alt={property.title}
            className="w-full h-52 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {property.crypto && (
              <span className="glass px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 backdrop-blur-md">
                <img src="/img/icon/BTC-icon.svg" alt="BTC" className="w-3 h-3" />
                Crypto Ready
              </span>
            )}
            {featured && (
              <span className="bg-gradient-to-r from-crypto-teal to-crypto-purple px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                <Sparkles size={10} />
                Featured
              </span>
            )}
            {property.tag && (
              <span className="bg-crypto-gold/90 text-black px-2.5 py-1 rounded-full text-[10px] font-semibold">
                {property.tag}
              </span>
            )}
          </div>
          
          {/* Favorite Button */}
          <motion.button 
            className="absolute top-3 right-3 p-2.5 glass rounded-full backdrop-blur-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={18} className={property.liked ? 'fill-crypto-pink text-crypto-pink' : 'text-white'} />
          </motion.button>
          
          {/* Price */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold font-['Space_Grotesk'] text-white drop-shadow-lg">
                  {property.price}
                </p>
                {property.cryptoPrice && (
                  <p className="text-xs text-crypto-gold flex items-center gap-1 mt-0.5">
                    <img src="/img/icon/BTC-icon.svg" alt="BTC" className="w-3 h-3" />
                    {property.cryptoPrice}
                  </p>
                )}
              </div>
              {property.developer && (
                <img src={property.developerLogo} alt={property.developer} className="h-6 object-contain opacity-80" />
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
          <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-3">
            <MapPin size={14} className="text-crypto-teal shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </p>
          
          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <img src="/img/property/green-bed.png" alt="Beds" className="w-4 h-4 opacity-70" />
              {property.beds} Beds
            </span>
            <span className="flex items-center gap-1.5">
              <img src="/img/property/green-bath.png" alt="Baths" className="w-4 h-4 opacity-70" />
              {property.baths} Baths
            </span>
            <span className="flex items-center gap-1.5">
              <img src="/img/property/green-size.png" alt="Size" className="w-4 h-4 opacity-70" />
              {property.sqft}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  </motion.div>
)

export const PropertyCardCompact = ({ property, index = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <Link to={`/property/${property.id}`}>
      <motion.div 
        className="glass-card rounded-2xl overflow-hidden flex min-w-[280px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative w-28 h-28 shrink-0">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {property.crypto && (
            <div className="absolute top-2 left-2">
              <img src="/img/icon/BTC-icon.svg" alt="BTC" className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col justify-between flex-1">
          <div>
            <h4 className="font-semibold text-sm line-clamp-1">{property.title}</h4>
            <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
              <MapPin size={10} />
              {property.location}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-crypto-teal font-bold text-sm">{property.price}</span>
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              <span>{property.beds} BD</span>
              <span>{property.baths} BA</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  </motion.div>
)
