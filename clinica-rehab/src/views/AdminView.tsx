import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, LogOut, Edit3, Calendar, Clock, 
  MessageSquare, Users, Plus, UserPlus, Search,
  ChevronRight, Heart
} from 'lucide-react';

export const AdminView = ({ user, onLogout }: any) => {
  const [tab, setTab] = useState<'pacientes' | 'mensajes'>('pacientes');
  const [pacientes, setPacientes] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  
  // Estados para Formulario
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState(new Date().toISOString().split('T')[0]);
  const [tiempoTratamiento, setTiempoTratamiento] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const cargarDatos = async () => {
    try {
      const [resP, resM] = await Promise.all([
        fetch('http://localhost:3000/api/pacientes'),
        fetch('http://localhost:3000/api/mensajes')
      ]);
      setPacientes(await resP.json());
      setMensajes(await resM.json());
    } catch (e) {
      console.error("Error cargando datos del backend");
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editandoId ? `http://localhost:3000/api/pacientes/${editandoId}` : 'http://localhost:3000/api/pacientes';
    const method = editandoId ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, edad: Number(edad), fechaIngreso, tiempoTratamiento: Number(tiempoTratamiento), descripcion })
    });

    if (res.ok) {
      alert('✅ Guardado correctamente');
      setEditandoId(null);
      setNombre(''); setEdad(''); setTiempoTratamiento(''); setDescripcion('');
      cargarDatos();
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-navy">
      {/* Header Admin - Estilo Dark Premium */}
      <header className="bg-brand-navy text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-brand-red p-2 rounded-xl shadow-lg">
              <Heart className="text-white fill-current" size={20}/>
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter hidden sm:block">
              Panel Administrativo
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Administrador</p>
              <p className="text-sm font-bold text-white leading-tight">{user?.nombre_completo || 'Alejandro Fabara'}</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout} 
              className="bg-white/5 border border-white/10 p-2.5 md:px-4 md:py-2 rounded-xl hover:bg-brand-red transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
            >
              <LogOut size={16}/> <span className="hidden md:inline">Cerrar Sesión</span>
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Resumen Rápido (Stats) */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-brand-blue/10 p-3 rounded-2xl text-brand-blue"><Users size={20}/></div>
          <div className="text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase">Pacientes</p>
            <p className="text-xl font-black">{pacientes.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-brand-orange/10 p-3 rounded-2xl text-brand-orange"><MessageSquare size={20}/></div>
          <div className="text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase">Mensajes</p>
            <p className="text-xl font-black">{mensajes.length}</p>
          </div>
        </div>
      </div>

      {/* Navegación Estilo Pill */}
      <nav className="max-w-7xl mx-auto px-6 mt-8 flex gap-4">
        <button 
          onClick={() => setTab('pacientes')} 
          className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${tab === 'pacientes' ? 'bg-brand-navy text-white shadow-lg' : 'bg-white text-slate-400 hover:text-brand-navy border border-slate-100'}`}
        >
          <Users size={16}/> Gestión de Pacientes
        </button>
        <button 
          onClick={() => setTab('mensajes')} 
          className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${tab === 'mensajes' ? 'bg-brand-navy text-white shadow-lg' : 'bg-white text-slate-400 hover:text-brand-navy border border-slate-100'}`}
        >
          <MessageSquare size={16}/> Buzón
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 pb-20">
        <AnimatePresence mode="wait">
          {tab === 'pacientes' ? (
            <motion.div 
              key="pacientes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Formulario Estilo Card */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-brand-navy/5 border border-slate-50 h-fit sticky top-28">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-brand-orange/10 p-2 rounded-xl text-brand-orange"><UserPlus size={20}/></div>
                  <h3 className="font-black text-brand-navy uppercase text-sm tracking-widest text-left">
                    {editandoId ? 'Editar Información' : 'Nuevo Registro'}
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Nombre Completo</label>
                    <input type="text" placeholder="Ej. Juan Pérez" value={nombre} onChange={e => setNombre(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-sm font-bold" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Edad</label>
                      <input type="number" placeholder="Años" value={edad} onChange={e => setEdad(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-bold" required />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Tratamiento</label>
                      <input type="number" placeholder="Meses" value={tiempoTratamiento} onChange={e => setTiempoTratamiento(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-bold" required />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Fecha de Ingreso</label>
                    <input type="date" value={fechaIngreso} onChange={e => setFechaIngreso(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-bold" required />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Descripción del Caso</label>
                    <textarea placeholder="Detalles médicos o espirituales..." value={descripcion} onChange={e => setDescripcion(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-bold min-h-[120px]" rows={4}></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-5 rounded-[1.5rem] text-white font-black uppercase tracking-widest text-xs transition shadow-xl ${editandoId ? 'bg-brand-blue' : 'bg-brand-orange shadow-brand-orange/20'}`}
                  >
                    {editandoId ? 'Guardar Cambios' : 'Registrar en Sistema'}
                  </motion.button>
                  
                  {editandoId && (
                    <button type="button" onClick={() => setEditandoId(null)} className="w-full text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Cancelar Edición</button>
                  )}
                </form>
              </div>

              {/* Lista de Pacientes Modernizada */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-6 px-4">
                  <h3 className="font-black text-brand-navy uppercase text-sm tracking-widest">Base de Datos</h3>
                  <div className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-xl text-slate-400">
                    <Search size={14} className="mr-2"/>
                    <input type="text" placeholder="Buscar..." className="bg-transparent text-xs font-bold outline-none"/>
                  </div>
                </div>

                <div className="space-y-3">
                  {pacientes.map((p: any) => (
                    <motion.div 
                      key={p.id} 
                      layout
                      className="bg-white p-6 rounded-[2rem] border border-slate-50 flex justify-between items-center group hover:border-brand-blue/30 transition-all shadow-sm hover:shadow-xl hover:shadow-brand-navy/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-navy font-black border border-slate-100">
                          {p.edad}
                        </div>
                        <div className="text-left">
                          <p className="font-black text-brand-navy text-lg leading-tight uppercase tracking-tight">{p.nombre}</p>
                          <div className="flex flex-wrap gap-3 mt-1">
                            <span className="text-[10px] text-slate-400 font-black uppercase flex items-center gap-1">
                              <Calendar size={12} className="text-brand-blue"/> {p.fecha_ingreso.split('T')[0]}
                            </span>
                            <span className="text-[10px] text-brand-blue font-black uppercase flex items-center gap-1">
                              <Clock size={12}/> {p.tiempo_tratamiento_meses} Meses
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setEditandoId(p.id); setNombre(p.nombre); setEdad(p.edad.toString());
                          setFechaIngreso(p.fecha_ingreso.split('T')[0]); setTiempoTratamiento(p.tiempo_tratamiento_meses.toString());
                          setDescripcion(p.descripcion_caso); window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} 
                        className="p-4 bg-brand-light text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10 rounded-2xl transition-all"
                      >
                        <Edit3 size={20}/>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Buzón Estilo Inbox */
            <motion.div 
              key="mensajes"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="text-left mb-8 px-4">
                <h2 className="text-3xl font-black text-brand-navy uppercase tracking-tighter">Buzón de Mensajes</h2>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Solicitudes y consultas externas</p>
              </div>

              {mensajes.length === 0 ? (
                <div className="bg-white rounded-[3rem] py-32 border-2 border-dashed border-slate-100 flex flex-col items-center">
                  <MessageSquare className="text-slate-200 mb-4" size={48}/>
                  <p className="text-slate-400 font-bold italic tracking-wide uppercase text-xs">No hay mensajes en bandeja</p>
                </div>
              ) : (
                mensajes.map((m: any, i: number) => (
                  <motion.div 
                    key={m.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-[2.5rem] border-l-[12px] border-brand-orange shadow-lg shadow-brand-navy/5 text-left group transition-all hover:scale-[1.01]"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-left">
                        <span className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em]">{m.asunto || 'CONSULTA GENERAL'}</span>
                        <h4 className="font-black text-2xl text-brand-navy leading-none mt-2 uppercase tracking-tight">{m.remitente}</h4>
                        <p className="text-sm text-brand-blue font-bold mt-1 opacity-70 underline">{m.correo}</p>
                      </div>
                      <div className="bg-brand-light px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {new Date(m.fecha_envio).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-brand-light p-6 rounded-3xl border border-slate-100">
                      <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-wrap italic">
                        "{m.mensaje}"
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer del Admin */}
      <footer className="max-w-7xl mx-auto px-6 py-10 border-t border-slate-100 opacity-50">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">
          Ingeniería Aplicada by Formatec | 2026 Admin Suite
        </p>
      </footer>
    </div>
  );
};