import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Filter, Grid, List, MapPin, ChevronDown, X, SlidersHorizontal
} from 'lucide-react'
import { PageTransition } from '../components/Layout'
import { GlassButton } from '../components/ui/GlassCard'
import { PropertyCard } from '../components/PropertyCard'

// Filter Modal
const FilterModal = ({ isOpen, onClose }) => (
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
          className="fixed bottom-0 left-0 right-0 glass-dark rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Filters</h3>
              <button onClick={onClose} className="p-2 glass rounded-xl">
                <X size={20} />
              </button>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Price Range (AED)</h4>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Min" 
                  className="flex-1 glass rounded-xl px-4 py-3 bg-transparent text-sm outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Max" 
                  className="flex-1 glass rounded-xl px-4 py-3 bg-transparent text-sm outline-none"
                />
              </div>
            </div>
            
            {/* Property Type */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Property Type</h4>
              <div className="flex flex-wrap gap-2">
                {['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Office'].map((type) => (
                  <button 
                    key={type}
                    className="glass px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:border-crypto-teal transition-all"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Bedrooms */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Bedrooms</h4>
              <div className="flex gap-2">
                {['Any', '1', '2', '3', '4', '5+'].map((bed) => (
                  <button 
                    key={bed}
                    className="flex-1 glass px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:border-crypto-teal transition-all"
                  >
                    {bed}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Payment Method</h4>
              <div className="flex gap-3">
                <button className="flex-1 glass-button px-4 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                  <img src="/img/icon/BTC-icon.svg" alt="Crypto" className="w-5 h-5" />
                  Crypto
                </button>
                <button className="flex-1 glass px-4 py-3 rounded-xl text-sm text-gray-400">
                  Fiat
                </button>
                <button className="flex-1 glass px-4 py-3 rounded-xl text-sm text-gray-400">
                  Both
                </button>
              </div>
            </div>
            
            {/* Amenities */}
            <div className="mb-8">
              <h4 className="font-semibold mb-3">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Beach Access'].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 glass px-3 py-2 rounded-xl cursor-pointer">
                    <input type="checkbox" className="accent-crypto-teal" />
                    <span className="text-sm text-gray-400">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <GlassButton variant="secondary" className="flex-1">
                Reset
              </GlassButton>
              <GlassButton variant="primary" className="flex-1" onClick={onClose}>
                Apply Filters
              </GlassButton>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

// Properties Data
const propertiesData = [
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
  {
    id: 4,
    title: 'Sky Villa Downtown',
    location: 'Downtown Dubai',
    price: 'AED 22M',
    cryptoPrice: '201 BTC',
    image: '/img/property/bulding-1.jpeg',
    beds: 5,
    baths: 6,
    sqft: '9,200 sqft',
    crypto: true,
    liked: true,
    tag: 'New'
  },
  {
    id: 5,
    title: 'Beach House JBR',
    location: 'JBR, Dubai',
    price: 'AED 8.5M',
    cryptoPrice: '78 BTC',
    image: '/img/home/street.jpeg',
    beds: 3,
    baths: 4,
    sqft: '4,500 sqft',
    crypto: true,
    liked: false,
  },
]

const PropertiesPage = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  
  return (
    <PageTransition>
      <main className="pt-20 pb-28 px-4 relative z-10">
        {/* Header */}
        <div className="mb-6">
          <motion.h1 
            className="text-2xl font-bold font-['Space_Grotesk'] mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore <span className="gradient-text">Properties</span>
          </motion.h1>
          <p className="text-gray-500 text-sm">{propertiesData.length} properties found</p>
        </div>
        
        {/* Search Bar */}
        <motion.div 
          className="glass-card rounded-2xl p-3 flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search size={20} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search properties..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
          />
        </motion.div>
        
        {/* Filter Bar */}
        <motion.div 
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button 
            onClick={() => setFilterOpen(true)}
            className="glass-button px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          
          <div className="flex-1 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2">
              {['All', 'Villa', 'Apartment', 'Penthouse'].map((type) => (
                <button 
                  key={type}
                  className="glass px-3 py-2 rounded-xl text-xs text-gray-400 whitespace-nowrap hover:text-white transition-colors"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-1 glass rounded-xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-crypto-teal/20 text-crypto-teal' : 'text-gray-500'}`}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-crypto-teal/20 text-crypto-teal' : 'text-gray-500'}`}
            >
              <List size={16} />
            </button>
          </div>
        </motion.div>
        
        {/* Sort */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Showing {propertiesData.length} results</span>
          <button className="flex items-center gap-1 text-sm text-gray-400">
            Sort: <span className="text-white">Newest</span>
            <ChevronDown size={14} />
          </button>
        </div>
        
        {/* Properties Grid */}
        <div className={viewMode === 'grid' ? 'space-y-4' : 'space-y-3'}>
          {propertiesData.map((property, idx) => (
            <PropertyCard key={property.id} property={property} index={idx} />
          ))}
        </div>
        
        {/* Load More */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <GlassButton variant="secondary">
            Load More Properties
          </GlassButton>
        </motion.div>
      </main>
      
      <FilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </PageTransition>
  )
}

export default PropertiesPage
