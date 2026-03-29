import { useState } from 'react';
import { LandingView } from './views/LandingView';
import { AuthView } from './views/AuthView';
import { AdminView } from './views/AdminView';
import { VisitorView } from './views/VisitorView';

function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'admin' | 'visitor'>('landing');
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setView(userData.rol === 'superusuario' ? 'admin' : 'visitor');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  return (
    <>
      {view === 'landing' && <LandingView onLogin={() => setView('auth')} />}
      {view === 'auth' && <AuthView onLoginSuccess={handleLoginSuccess} onBack={() => setView('landing')} />}
      {view === 'admin' && <AdminView user={user} onLogout={handleLogout} />}
      {view === 'visitor' && <VisitorView user={user} onLogout={handleLogout} />}
    </>
  );
}

export default App;