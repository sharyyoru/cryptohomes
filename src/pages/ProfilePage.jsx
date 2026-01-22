import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Wallet, Settings, Bell, Shield, HelpCircle, LogOut,
  ChevronRight, Copy, ExternalLink, Check, Edit2, Camera,
  Heart, Building2, Clock, TrendingUp
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageTransition } from '../components/Layout'
import { GlassButton } from '../components/ui/GlassCard'

// Profile Stat
const ProfileStat = ({ icon: Icon, value, label, color }) => (
  <motion.div
    className="glass-card rounded-xl p-3 text-center"
    whileHover={{ scale: 1.05 }}
  >
    <Icon size={20} className={`mx-auto mb-1 ${color}`} />
    <p className="font-bold text-lg">{value}</p>
    <p className="text-[10px] text-gray-500">{label}</p>
  </motion.div>
)

// Menu Item
const MenuItem = ({ icon: Icon, label, value, to, onClick, danger = false }) => {
  const content = (
    <motion.div
      className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
        danger ? 'hover:bg-red-500/10' : 'hover:bg-white/5'
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-10 h-10 rounded-xl ${danger ? 'bg-red-500/20' : 'glass'} flex items-center justify-center`}>
        <Icon size={20} className={danger ? 'text-red-400' : 'text-gray-400'} />
      </div>
      <div className="flex-1">
        <p className={`font-medium ${danger ? 'text-red-400' : ''}`}>{label}</p>
        {value && <p className="text-xs text-gray-500">{value}</p>}
      </div>
      <ChevronRight size={18} className="text-gray-600" />
    </motion.div>
  )
  
  if (to) {
    return <Link to={to}>{content}</Link>
  }
  
  return <button onClick={onClick} className="w-full text-left">{content}</button>
}

const ProfilePage = () => {
  const [walletConnected, setWalletConnected] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const walletAddress = '0x1234...5678'
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const stats = [
    { icon: Heart, value: '12', label: 'Saved', color: 'text-crypto-pink' },
    { icon: Building2, value: '3', label: 'Viewed', color: 'text-crypto-teal' },
    { icon: Clock, value: '8', label: 'Inquiries', color: 'text-crypto-gold' },
    { icon: TrendingUp, value: '$2.4M', label: 'Invested', color: 'text-crypto-purple' },
  ]
  
  return (
    <PageTransition>
      <main className="pt-20 pb-28 px-4 relative z-10">
        {/* Profile Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-crypto-teal to-crypto-purple p-0.5">
              <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                <User size={40} className="text-gray-400" />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 glass-button rounded-full flex items-center justify-center">
              <Camera size={14} />
            </button>
          </div>
          
          {walletConnected ? (
            <>
              <h2 className="text-xl font-bold mb-1">Welcome Back!</h2>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span>{walletAddress}</span>
                <button onClick={handleCopyAddress} className="p-1 hover:text-crypto-teal transition-colors">
                  {copied ? <Check size={14} className="text-crypto-teal" /> : <Copy size={14} />}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-1">Welcome</h2>
              <p className="text-sm text-gray-500">Connect your wallet to get started</p>
            </>
          )}
        </motion.div>
        
        {/* Wallet Connection */}
        {!walletConnected && (
          <motion.div
            className="glass-card rounded-2xl p-5 mb-6 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-crypto-teal/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-crypto-purple/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crypto-teal/20 to-crypto-purple/20 flex items-center justify-center mx-auto mb-4">
                <Wallet size={32} className="text-crypto-teal" />
              </div>
              <h3 className="font-bold text-lg mb-2">Connect Your Wallet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Link your crypto wallet to track investments and save properties
              </p>
              <GlassButton 
                variant="primary" 
                fullWidth
                onClick={() => setWalletConnected(true)}
              >
                Connect Wallet
              </GlassButton>
            </div>
          </motion.div>
        )}
        
        {/* Stats */}
        {walletConnected && (
          <motion.div
            className="grid grid-cols-4 gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {stats.map((stat, idx) => (
              <ProfileStat key={idx} {...stat} />
            ))}
          </motion.div>
        )}
        
        {/* Wallet Info (when connected) */}
        {walletConnected && (
          <motion.div
            className="glass-card rounded-2xl p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Wallet Balance</h3>
              <button className="text-xs text-crypto-teal flex items-center gap-1">
                View on Explorer <ExternalLink size={12} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/img/icon/BTC-icon.svg" alt="BTC" className="w-8 h-8" />
                  <div>
                    <p className="font-medium">Bitcoin</p>
                    <p className="text-xs text-gray-500">BTC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">2.45 BTC</p>
                  <p className="text-xs text-gray-500">$245,000</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/img/icon/ETH-icon.svg" alt="ETH" className="w-8 h-8" />
                  <div>
                    <p className="font-medium">Ethereum</p>
                    <p className="text-xs text-gray-500">ETH</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">15.8 ETH</p>
                  <p className="text-xs text-gray-500">$52,000</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/img/icon/USDT-logo.svg" alt="USDT" className="w-8 h-8" />
                  <div>
                    <p className="font-medium">Tether</p>
                    <p className="text-xs text-gray-500">USDT</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">125,000 USDT</p>
                  <p className="text-xs text-gray-500">$125,000</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Menu */}
        <motion.div
          className="glass-card rounded-2xl overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MenuItem icon={Heart} label="Saved Properties" value="12 properties" to="/favorites" />
          <MenuItem icon={Clock} label="Recently Viewed" value="8 properties" to="/properties" />
          <MenuItem icon={Building2} label="My Inquiries" value="3 active" to="/properties" />
        </motion.div>
        
        <motion.div
          className="glass-card rounded-2xl overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <MenuItem icon={Bell} label="Notifications" value="Enabled" to="/profile" />
          <MenuItem icon={Shield} label="Security" value="2FA Enabled" to="/profile" />
          <MenuItem icon={Settings} label="Settings" to="/profile" />
          <MenuItem icon={HelpCircle} label="Help & Support" to="/contact" />
        </motion.div>
        
        {walletConnected && (
          <motion.div
            className="glass-card rounded-2xl overflow-hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MenuItem 
              icon={LogOut} 
              label="Disconnect Wallet" 
              danger 
              onClick={() => setWalletConnected(false)} 
            />
          </motion.div>
        )}
        
        {/* App Info */}
        <motion.div
          className="text-center text-xs text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>CryptoHomes DXB v1.0.0</p>
          <p className="mt-1">Made with ❤️ in Dubai</p>
        </motion.div>
      </main>
    </PageTransition>
  )
}

export default ProfilePage
