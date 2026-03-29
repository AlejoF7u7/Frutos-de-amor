import { Heart, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = ({ onLoginClick }: { onLoginClick: () => void }) => (
  <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-brand-red p-2 rounded-xl shadow-md">
          <Heart className="text-white fill-current" size={22}/>
        </div>
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-black text-brand-navy uppercase tracking-tighter leading-none">
            Frutos de Amor
          </span>
          <span className="text-[10px] font-bold text-brand-blue tracking-[0.2em] uppercase">Fundación</span>
        </div>
      </motion.div>

      <div className="flex items-center gap-3 md:gap-6">
        <a href="#nosotros" className="hidden md:block font-bold text-slate-500 hover:text-brand-navy transition-colors text-sm uppercase">Nosotros</a>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLoginClick} 
          className="bg-brand-orange text-white px-5 md:px-8 py-2.5 rounded-full font-bold shadow-lg shadow-brand-orange/20 text-xs md:text-sm uppercase"
        >
          Donar
        </motion.button>

        <button onClick={onLoginClick} className="p-2 text-slate-300 hover:text-brand-navy transition-colors">
          <Lock size={20}/>
        </button>
      </div>
    </div>
  </nav>
);