import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, LogOut, Info, Send, Phone, MessageSquare, ChevronRight } from 'lucide-react';

export const VisitorView = ({ user, onLogout }: any) => {
  const [asunto, setAsunto] = useState('');
  const [contacto, setContacto] = useState('');
  const [texto, setTexto] = useState('');

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const final = `${texto} \n\n--------------------------\n📞 CONTACTO DIRECTO: ${contacto}`;
    try {
      const res = await fetch('http://localhost:3000/api/mensajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId: user.id, asunto, mensaje: final })
      });
      if (res.ok) { 
        alert('✅ Mensaje enviado con éxito'); 
        setAsunto(''); setContacto(''); setTexto(''); 
      }
    } catch (err) { 
      alert('Error de envío'); 
    }
  };

  return (
    <div className="min-h-screen bg-brand-light text-left font-sans text-brand-navy">
      {/* Header Minimalista */}
      <header className="bg-white p-6 shadow-sm border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-brand-navy text-xl uppercase tracking-tighter">
            <div className="bg-brand-red p-2 rounded-lg shadow-md">
              <Heart className="text-white fill-current" size={18}/>
            </div>
            Frutos de Amor
          </div>
          <button 
            onClick={onLogout} 
            className="p-3 text-slate-300 hover:text-brand-red hover:bg-brand-red/10 rounded-xl transition-all"
          >
            <LogOut size={22}/>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-12 md:py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-brand-navy/5 border border-slate-50"
        >
          {/* Bienvenida */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-brand-navy uppercase tracking-tighter italic leading-none">
              Hola, {user?.nombre_completo.split(' ')[0]}
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-3">
              ¿En qué podemos ayudarte hoy?
            </p>
          </div>

          {/* Banner Informativo */}
          <div className="bg-brand-orange/5 border-l-4 border-brand-orange p-5 mb-10 rounded-r-2xl flex items-start gap-4">
             <Info className="text-brand-orange shrink-0 mt-1" size={24}/>
             <div className="text-left">
               <p className="text-brand-orange text-[10px] font-black uppercase tracking-widest mb-1">Nota importante</p>
               <p className="text-slate-600 text-xs font-bold leading-relaxed">
                 Es obligatorio dejar tu número o correo para que Andre pueda contactarte lo antes posible.
               </p>
             </div>
          </div>

          <form onSubmit={enviar} className="space-y-6 text-left">
            {/* Motivo */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Motivo de contacto</label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors" size={20}/>
                <select 
                  value={asunto} 
                  onChange={e => setAsunto(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl appearance-none focus:ring-2 focus:ring-brand-blue/20 outline-none font-bold text-sm text-brand-navy" 
                  required
                >
                  <option value="">Selecciona una opción...</option>
                  <option value="Donación">Quiero realizar una Donación</option>
                  <option value="Paciente">Ingresar a un Paciente</option>
                  <option value="Voluntario">Quiero ser Voluntario</option>
                  <option value="Otro">Otros asuntos</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none rotate-90" size={16}/>
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Tu Teléfono / WhatsApp</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors" size={20}/>
                <input 
                  type="text" 
                  placeholder="Ej: 099 520 0408" 
                  value={contacto} 
                  onChange={e => setContacto(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-blue/20 outline-none font-bold text-sm text-brand-navy placeholder:text-slate-300" 
                  required 
                />
              </div>
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Tu Mensaje</label>
              <textarea 
                placeholder="Cuéntanos un poco más sobre tu solicitud..." 
                value={texto} 
                onChange={e => setTexto(e.target.value)} 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-brand-blue/20 outline-none font-medium text-sm text-brand-navy min-h-[150px]" 
                rows={4} 
                required
              ></textarea>
            </div>

            {/* Botón Enviar */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-orange text-white p-5 rounded-[1.5rem] font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20 hover:bg-[#e09a35] transition-all"
            >
              Enviar Mensaje <Send size={20} className="group-hover:translate-x-1 transition-transform"/>
            </motion.button>
          </form>
        </motion.div>

        <p className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] text-center">
          Tu mensaje será recibido por el equipo de administración
        </p>
      </main>
    </div>
  );
};