import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';

export const AuthView = ({ onLoginSuccess, onBack }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? 'login' : 'registro';
    const body = isLogin 
      ? { correo: email, password: pass } 
      : { nombreCompleto: nombre, correo: email, password: pass };

    try {
      const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        if (isLogin) onLoginSuccess(data.usuario);
        else { 
          alert('✅ Cuenta creada con éxito'); 
          setIsLogin(true); 
        }
      } else { 
        setError(data.error); 
      }
    } catch (err) { 
      setError('Error de conexión con el servidor'); 
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-brand-navy/5 overflow-hidden border border-slate-100"
      >
        <div className="p-8 md:p-12">
          
          {/* Header con el Corazón del Logo */}
          <div className="flex flex-col items-center mb-8 text-center">
            <motion.div 
              key={isLogin ? 'login-icon' : 'reg-icon'}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-brand-red p-3 rounded-2xl shadow-lg mb-4"
            >
              <Heart className="text-white fill-current" size={32}/>
            </motion.div>
            <h2 className="text-3xl font-black text-brand-navy uppercase tracking-tighter leading-none">
              {isLogin ? 'Bienvenido' : 'Únete'}
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
              Fundación Frutos de Amor
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-brand-red text-center text-xs font-black bg-brand-red/10 p-3 rounded-xl uppercase tracking-wider"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {/* Campo Nombre (Solo en Registro) */}
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative group"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" size={20}/>
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    value={nombre} 
                    onChange={e => setNombre(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-brand-navy" 
                    required 
                  />
                </motion.div>
              )}

              {/* Campo Correo */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" size={20}/>
                <input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-brand-navy" 
                  required 
                />
              </div>

              {/* Campo Contraseña */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" size={20}/>
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  value={pass} 
                  onChange={e => setPass(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-brand-navy" 
                  required 
                />
              </div>
            </div>

            {/* Botón Principal */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-2 mt-4 hover:bg-[#e09a35] transition-all uppercase tracking-tight"
            >
              {isLogin ? 'Entrar al Panel' : 'Crear Cuenta'} 
              <ArrowRight size={20}/>
            </motion.button>

            {/* Switch entre Login/Registro */}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)} 
              className="w-full text-brand-blue font-black text-xs uppercase tracking-widest hover:underline transition-all"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>

            {/* Botón Volver */}
            <button 
              type="button" 
              onClick={onBack} 
              className="w-full text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-brand-navy transition-colors pt-4"
            >
              <ArrowLeft size={12}/> Volver al inicio
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Ingeniería Aplicada by Formatec
          </p>
        </div>
      </motion.div>
    </div>
  );
};