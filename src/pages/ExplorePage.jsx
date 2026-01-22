import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, MapPin, TrendingUp, Flame, Star, Clock,
  ChevronRight, Filter
} from 'lucide-react'
import { PageTransition } from '../components/Layout'
import { PropertyCardCompact } from '../components/PropertyCard'

// Area Card
const AreaCard = ({ area, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Link to={`/properties?area=${area.slug}`}>
      <motion.div
        className="relative rounded-2xl overflow-hidden h-40"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <img 
          src={area.image} 
          alt={area.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-lg">{area.name}</h3>
          <p className="text-xs text-gray-300">{area.properties} Properties</p>
        </div>
        {area.trending && (
          <div className="absolute top-3 right-3">
            <span className="bg-crypto-gold/90 text-black px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
              <Flame size={10} />
              Trending
            </span>
          </div>
        )}
      </motion.div>
    </Link>
  </motion.div>
)

// Category Chip
const CategoryChip = ({ label, icon: Icon, active, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
      active 
        ? 'glass-button text-white' 
        : 'glass text-gray-400 hover:text-white'
    }`}
    whileTap={{ scale: 0.95 }}
  >
    {Icon && <Icon size={16} />}
    {label}
  </motion.button>
)

// Search Suggestion
const SearchSuggestion = ({ icon: Icon, text, subtext }) => (
  <motion.button
    className="flex items-center gap-3 w-full p-3 glass rounded-xl text-left hover:bg-white/5 transition-colors"
    whileHover={{ x: 5 }}
  >
    <div className="w-10 h-10 rounded-xl bg-crypto-teal/20 flex items-center justify-center shrink-0">
      <Icon size={18} className="text-crypto-teal" />
    </div>
    <div>
      <p className="font-medium text-sm">{text}</p>
      <p className="text-xs text-gray-500">{subtext}</p>
    </div>
  </motion.button>
)

const ExplorePage = () => {
  const [searchFocused, setSearchFocused] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', label: 'All', icon: null },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'new', label: 'New', icon: Star },
    { id: 'luxury', label: 'Luxury', icon: TrendingUp },
  ]
  
  const popularAreas = [
    { name: 'Palm Jumeirah', slug: 'palm-jumeirah', properties: 245, image: '/img/property/bulding-1.jpeg', trending: true },
    { name: 'Downtown Dubai', slug: 'downtown', properties: 189, image: '/img/propertydetails/img-one.png', trending: false },
    { name: 'Dubai Marina', slug: 'marina', properties: 312, image: '/img/home/street.jpeg', trending: true },
    { name: 'Emirates Hills', slug: 'emirates-hills', properties: 78, image: '/img/property/bulding-1.jpeg', trending: false },
  ]
  
  const recentSearches = [
    { icon: MapPin, text: 'Palm Jumeirah', subtext: '245 properties' },
    { icon: MapPin, text: 'Dubai Marina Apartments', subtext: '189 properties' },
    { icon: TrendingUp, text: 'Investment Properties', subtext: 'Off-plan projects' },
  ]
  
  const trendingProperties = [
    {
      id: 1,
      title: 'Palm Jumeirah Villa',
      location: 'Palm Jumeirah',
      price: 'AED 18.5M',
      image: '/img/property/bulding-1.jpeg',
      beds: 5,
      baths: 6,
      crypto: true,
    },
    {
      id: 2,
      title: 'Marina Sky Tower',
      location: 'Dubai Marina',
      price: 'AED 4.2M',
      image: '/img/home/street.jpeg',
      beds: 2,
      baths: 3,
      crypto: true,
    },
    {
      id: 3,
      title: 'Downtown Penthouse',
      location: 'Downtown Dubai',
      price: 'AED 12M',
      image: '/img/propertydetails/img-one.png',
      beds: 3,
      baths: 4,
      crypto: true,
    },
  ]
  
  return (
    <PageTransition>
      <main className="pt-20 pb-28 px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] mb-2">
            Explore <span className="gradient-text">Dubai</span>
          </h1>
          <p className="text-gray-500 text-sm">Discover your perfect property</p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          className={`glass-card rounded-2xl p-4 mb-6 transition-all ${
            searchFocused ? 'ring-1 ring-crypto-teal' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <Search size={20} className="text-crypto-teal" />
            <input
              type="text"
              placeholder="Search areas, properties..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            />
            <button className="p-2 glass rounded-xl">
              <Filter size={18} className="text-gray-400" />
            </button>
          </div>
          
          {/* Search Suggestions */}
          {searchFocused && (
            <motion.div
              className="mt-4 pt-4 border-t border-white/5 space-y-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xs text-gray-500 mb-2">Recent Searches</p>
              {recentSearches.map((item, idx) => (
                <SearchSuggestion key={idx} {...item} />
              ))}
            </motion.div>
          )}
        </motion.div>
        
        {/* Categories */}
        <motion.div
          className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 -mx-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </motion.div>
        
        {/* Popular Areas */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Popular Areas</h2>
            <Link to="/properties" className="text-crypto-teal text-sm flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularAreas.map((area, idx) => (
              <AreaCard key={idx} area={area} index={idx} />
            ))}
          </div>
        </section>
        
        {/* Trending Now */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Flame size={18} className="text-crypto-gold" />
              Trending Now
            </h2>
            <Link to="/properties" className="text-crypto-teal text-sm flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
            {trendingProperties.map((property, idx) => (
              <PropertyCardCompact key={property.id} property={property} index={idx} />
            ))}
          </div>
        </section>
        
        {/* Property Types */}
        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">Property Types</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Apartments', count: '1,245', icon: '🏢' },
              { name: 'Villas', count: '567', icon: '🏠' },
              { name: 'Penthouses', count: '89', icon: '🌆' },
              { name: 'Townhouses', count: '234', icon: '🏘️' },
              { name: 'Offices', count: '156', icon: '🏛️' },
              { name: 'Land', count: '45', icon: '🌍' },
            ].map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/properties?type=${type.name.toLowerCase()}`}>
                  <motion.div
                    className="glass-card rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl mb-2 block">{type.icon}</span>
                    <p className="font-medium text-sm">{type.name}</p>
                    <p className="text-xs text-gray-500">{type.count}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Price Ranges */}
        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">By Budget</h2>
          <div className="space-y-2">
            {[
              { range: 'Under AED 2M', count: '456 properties', color: 'from-green-500 to-emerald-600' },
              { range: 'AED 2M - 5M', count: '678 properties', color: 'from-crypto-teal to-cyan-600' },
              { range: 'AED 5M - 10M', count: '234 properties', color: 'from-crypto-purple to-violet-600' },
              { range: 'Above AED 10M', count: '123 properties', color: 'from-crypto-gold to-amber-600' },
            ].map((budget, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/properties?budget=${encodeURIComponent(budget.range)}`}>
                  <motion.div
                    className="glass-card rounded-xl p-4 flex items-center justify-between"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${budget.color}`} />
                      <span className="font-medium">{budget.range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-sm">{budget.count}</span>
                      <ChevronRight size={16} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  )
}

export default ExplorePage
