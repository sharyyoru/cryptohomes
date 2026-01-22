import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, Share2, Bell, Filter, Grid, List } from 'lucide-react'
import { PageTransition } from '../components/Layout'
import { GlassButton } from '../components/ui/GlassCard'
import { PropertyCard } from '../components/PropertyCard'

// Empty State
const EmptyState = () => (
  <motion.div
    className="text-center py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="w-20 h-20 rounded-full bg-crypto-pink/20 flex items-center justify-center mx-auto mb-6">
      <Heart size={40} className="text-crypto-pink" />
    </div>
    <h3 className="text-xl font-bold mb-2">No Saved Properties</h3>
    <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
      Start exploring and save properties you love to see them here
    </p>
    <GlassButton variant="primary" onClick={() => window.location.href = '/properties'}>
      Explore Properties
    </GlassButton>
  </motion.div>
)

// Saved Collection Card
const CollectionCard = ({ collection, index }) => (
  <motion.div
    className="glass-card rounded-2xl overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="relative h-24">
      <div className="absolute inset-0 grid grid-cols-3 gap-0.5">
        {collection.images.slice(0, 3).map((img, idx) => (
          <img key={idx} src={img} alt="" className="w-full h-full object-cover" />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
    <div className="p-3">
      <h4 className="font-semibold text-sm">{collection.name}</h4>
      <p className="text-xs text-gray-500">{collection.count} properties</p>
    </div>
  </motion.div>
)

const FavoritesPage = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [editMode, setEditMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  
  const savedProperties = [
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
      liked: true,
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
      liked: true,
    },
  ]
  
  const collections = [
    { 
      name: 'Investment Properties', 
      count: 5, 
      images: ['/img/property/bulding-1.jpeg', '/img/home/street.jpeg', '/img/propertydetails/img-one.png']
    },
    { 
      name: 'Family Homes', 
      count: 3, 
      images: ['/img/propertydetails/img-one.png', '/img/property/bulding-1.jpeg', '/img/home/street.jpeg']
    },
  ]
  
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }
  
  const handleDelete = () => {
    // Handle delete logic
    setSelectedIds([])
    setEditMode(false)
  }
  
  return (
    <PageTransition>
      <main className="pt-20 pb-28 px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold font-['Space_Grotesk']">
              Saved <span className="gradient-text">Properties</span>
            </h1>
            <p className="text-gray-500 text-sm">{savedProperties.length} properties saved</p>
          </motion.div>
          
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button 
              onClick={() => setEditMode(!editMode)}
              className={`p-2.5 rounded-xl transition-colors ${editMode ? 'glass-button' : 'glass'}`}
            >
              <Trash2 size={18} className={editMode ? 'text-white' : 'text-gray-400'} />
            </button>
          </motion.div>
        </div>
        
        {savedProperties.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Collections */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Collections</h2>
                <button className="text-crypto-teal text-sm">+ New</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {collections.map((collection, idx) => (
                  <CollectionCard key={idx} collection={collection} index={idx} />
                ))}
              </div>
            </section>
            
            {/* Action Bar (when editing) */}
            <AnimatePresence>
              {editMode && selectedIds.length > 0 && (
                <motion.div
                  className="fixed bottom-24 left-4 right-4 glass-dark rounded-2xl p-4 flex items-center justify-between z-30"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                >
                  <span className="text-sm">{selectedIds.length} selected</span>
                  <div className="flex gap-2">
                    <GlassButton variant="secondary" size="sm" onClick={() => setSelectedIds([])}>
                      Cancel
                    </GlassButton>
                    <GlassButton variant="primary" size="sm" onClick={handleDelete}>
                      <Trash2 size={14} />
                      Remove
                    </GlassButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* View Toggle & Filter */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">All Saved</h2>
              <div className="flex gap-2">
                <button className="p-2 glass rounded-xl">
                  <Filter size={16} className="text-gray-400" />
                </button>
                <div className="flex gap-1 glass rounded-xl p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-crypto-teal/20 text-crypto-teal' : 'text-gray-500'}`}
                  >
                    <Grid size={14} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-crypto-teal/20 text-crypto-teal' : 'text-gray-500'}`}
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Properties */}
            <div className="space-y-4">
              {savedProperties.map((property, idx) => (
                <motion.div
                  key={property.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {editMode && (
                    <button
                      onClick={() => toggleSelect(property.id)}
                      className={`absolute top-4 left-4 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedIds.includes(property.id)
                          ? 'bg-crypto-teal border-crypto-teal'
                          : 'border-white/50 bg-black/50'
                      }`}
                    >
                      {selectedIds.includes(property.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Heart size={12} className="text-white fill-white" />
                        </motion.div>
                      )}
                    </button>
                  )}
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
            
            {/* Price Alert */}
            <motion.div
              className="glass-card rounded-2xl p-4 mt-8 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-crypto-teal/20 flex items-center justify-center shrink-0">
                <Bell size={22} className="text-crypto-teal" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Price Alerts</h4>
                <p className="text-xs text-gray-500">Get notified when prices drop</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-crypto-teal"></div>
              </label>
            </motion.div>
          </>
        )}
      </main>
    </PageTransition>
  )
}

export default FavoritesPage
