import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { authService } from '../services/api';
import { Star } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setDemoMode } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authService.login({ email, password });
      // Assuming backend returns token and user info, or we fetch user info next
      // For now, we'll just mock the user object based on the token
      login(res.data.access_token, { id: '1', nombre: 'Usuario', email, is_pro: false });
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas o error de conexión.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-violet-950 text-white p-6 max-w-md mx-auto justify-center">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2 mb-2">
          Win<Star className="w-8 h-8 text-amber-400 fill-amber-400" />Predict
        </h1>
        <p className="text-violet-200">Pronostica y gana con tus amigos</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl text-gray-900">
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="tu@email.com"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
            required 
          />
        </div>
        <Button type="submit" className="w-full bg-violet-900 hover:bg-violet-800 text-white">
          Ingresar
        </Button>
      </form>

      <div className="mt-8 space-y-4">
        <div className="text-center text-sm text-violet-300 mb-4">O prueba la demo (Sin backend):</div>
        <Button 
          variant="outline" 
          className="w-full border-violet-700 bg-violet-900/50 text-white hover:bg-violet-800 hover:text-white"
          onClick={() => { setDemoMode(false); navigate('/'); }}
        >
          Demo: Usuario Gratuito
        </Button>
        <Button 
          variant="pro" 
          className="w-full"
          onClick={() => { setDemoMode(true); navigate('/'); }}
        >
          Demo: Usuario PRO
        </Button>
      </div>
    </div>
  );
};
