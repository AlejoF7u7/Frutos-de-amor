import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowRight, Shield, Activity, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingView = ({ onLogin }: { onLogin: () => void }) => {
  // Variantes para animaciones de entrada
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-navy scroll-smooth">
      <Navbar onLoginClick={onLogin} />
      
      {/* Header (Hero Section) */}
      <header className="relative bg-brand-navy text-white py-24 md:py-32 overflow-hidden text-center px-6 border-b border-brand-light/10">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1527525443983-6e60c75fff50?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">Restauración y Vida</h1>
          <p className="text-base md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">Una casa de acogida diseñada para sanar el alma y restaurar familias en Sangolquí.</p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 px-4 md:px-0 font-bold">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={onLogin}
              className="bg-brand-orange text-white px-10 py-5 rounded-full font-black text-lg shadow-xl flex items-center justify-center gap-2 w-full md:w-auto"
            >
              Voluntariado <ArrowRight size={22}/>
            </motion.button>
            <button onClick={onLogin} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white/20 transition w-full md:w-auto">
              Busco Ayuda
            </button>
          </div>
        </motion.div>
      </header>

      {/* Sección Nuestra Esencia (Tarjetas) */}
      <section id="nosotros" className="py-24 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-black text-center text-brand-navy mb-16 uppercase tracking-tighter"
          >
            Nuestra Esencia
          </motion.h2>

          {/* Grid responsiva: 1 columna en móvil, 3 en escritorio */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          >
            
            {/* MISIÓN */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-brand-blue">
              <Shield className="text-brand-blue mb-6" size={48}/>
              <b className="text-xl tracking-widest text-brand-navy">MISIÓN</b>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed font-medium">Tratamiento ético y espiritual para superar adicciones.</p>
            </motion.div>

            {/* VISIÓN */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-2xl text-center flex flex-col items-center border-b-8 border-brand-orange md:scale-105 z-10">
              <Activity className="text-brand-orange mb-6" size={48}/>
              <b className="text-xl tracking-widest text-brand-navy">VISIÓN</b>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed font-medium">Ser el instituto referente en trato humano en Ecuador.</p>
            </motion.div>

            {/* VALORES */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-brand-red">
              <Users className="text-brand-red mb-6" size={48}/>
              <b className="text-xl tracking-widest text-brand-navy">VALORES</b>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed font-medium">Respeto absoluto y empatía profunda en cada proceso.</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <Footer onAdminClick={onLogin} />
    </div>
  );
};