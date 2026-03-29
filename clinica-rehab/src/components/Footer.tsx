import { Heart, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => (
  <footer className="bg-brand-navy text-white py-16 px-6 text-left border-t-4 border-brand-orange">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
      
      {/* Columna 1: Marca */}
      <div className="col-span-1 text-left">
        <div className="flex items-center gap-2 mb-6 font-black text-white text-2xl uppercase tracking-tighter text-left">
          <Heart className="text-brand-red fill-current" size={24}/> Frutos de Amor
        </div>
        <p className="text-sm leading-relaxed italic text-slate-400 font-medium opacity-80">"Devolviendo la esperanza y construyendo futuros brillantes para las familias de Ecuador."</p>
      </div>

      {/* Columna 2: Navegación */}
      <div className="text-left">
        <h4 className="text-brand-orange font-black mb-6 uppercase text-xs tracking-widest text-left">Navegación</h4>
        <ul className="space-y-4 text-sm text-left font-bold text-slate-300">
          <li><a href="#" className="hover:text-white transition text-left">Inicio</a></li>
          <li><a href="#nosotros" className="hover:text-white transition text-left">Sobre Nosotros</a></li>
          <li><button onClick={onAdminClick} className="hover:text-white transition text-left">Dejanos un Mensaje</button></li>
        </ul>
      </div>

      {/* Columna 3: Contacto */}
      <div className="text-left font-bold">
        <h4 className="text-brand-orange font-black mb-6 uppercase text-xs tracking-widest text-left">Contáctanos</h4>
        <ul className="space-y-4 text-sm text-left font-bold text-slate-300">
          <li className="flex items-center gap-3 text-left"><Phone size={16} className="text-brand-blue"/> +593 99 520 0408</li>
          <li className="flex items-center gap-3 text-left"><Mail size={16} className="text-brand-blue"/> ayuda@frutosdeamor.org</li>
          <li className="flex items-center gap-3 text-left"><MapPin size={16} className="text-brand-blue"/> Sangolquí, Ecuador</li>
        </ul>
      </div>

      {/* Columna 4: Síguenos */}
      <div className="text-left">
        <h4 className="text-brand-orange font-black mb-6 uppercase text-xs tracking-widest text-left">Síguenos</h4>
        <div className="flex gap-4 mt-4 text-left">
          {[Facebook, Instagram].map((Icon, i) => (
            <a key={i} href="#" className="bg-white/5 p-3 rounded-full hover:bg-brand-orange hover:text-white transition shadow-sm border border-white/10">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </div>
    
    {/* Copyright */}
    <div className="text-center font-bold">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
        © 2026 Fundación Frutos de Amor - Sangolquí, Ecuador | 
        <span className="text-brand-blue/60 ml-1">Ingeniería Aplicada by Formatec</span>
      </p>
    </div>
  </footer>
);