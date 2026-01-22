import { motion } from 'framer-motion'

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = false,
  glow = null,
  ...props 
}) => (
  <motion.div 
    className={`
      glass-card rounded-2xl overflow-hidden
      ${gradient ? 'gradient-border' : ''}
      ${glow ? `glow-${glow}` : ''}
      ${className}
    `}
    whileHover={hover ? { y: -5, scale: 1.01 } : {}}
    whileTap={hover ? { scale: 0.99 } : {}}
    {...props}
  >
    {children}
  </motion.div>
)

export const GlassButton = ({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon = null,
  ...props 
}) => {
  const variants = {
    primary: 'glass-button text-white',
    secondary: 'glass text-gray-300 hover:text-white',
    outline: 'bg-transparent border border-crypto-teal/50 text-crypto-teal hover:bg-crypto-teal/10',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  
  return (
    <motion.button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-xl font-medium flex items-center justify-center gap-2 transition-all
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
    </motion.button>
  )
}

export const GlassInput = ({ 
  icon: Icon = null,
  className = '',
  ...props 
}) => (
  <div className={`glass-card rounded-xl flex items-center gap-3 px-4 py-3 ${className}`}>
    {Icon && <Icon size={20} className="text-gray-500 shrink-0" />}
    <input 
      className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
      {...props}
    />
  </div>
)

export const AnimatedCounter = ({ value, duration = 2 }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.span>
  )
}
