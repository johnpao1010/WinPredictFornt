import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { User, LogOut, Plus, Users, Settings } from 'lucide-react';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      <div className="bg-violet-950 text-white pt-12 pb-6 px-6 rounded-b-[32px] shadow-sm">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="w-6 h-6" /> Mi Perfil
        </h1>
      </div>

      <div className="px-6 py-6 space-y-6 -mt-4 relative z-10">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-violet-100 text-violet-900 rounded-full flex items-center justify-center font-bold text-2xl">
              {user?.nombre?.substring(0, 2).toUpperCase() || 'US'}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">{user?.nombre}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
              {user?.is_pro && (
                <span className="inline-block mt-1 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  USUARIO PRO
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Gestión de Grupos</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button variant="outline" className="flex flex-col h-auto py-4 gap-2 border-violet-200 text-violet-900 hover:bg-violet-50" onClick={() => {setShowCreate(!showCreate); setShowJoin(false);}}>
              <Plus className="w-6 h-6" />
              <span>Crear Grupo</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4 gap-2 border-violet-200 text-violet-900 hover:bg-violet-50" onClick={() => {setShowJoin(!showJoin); setShowCreate(false);}}>
              <Users className="w-6 h-6" />
              <span>Unirse</span>
            </Button>
          </div>

          {showCreate && (
            <Card className="border-violet-200 bg-violet-50 shadow-sm mb-4">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-bold text-violet-900 text-sm">Crear Nuevo Grupo</h4>
                <Input placeholder="Nombre del grupo" />
                <Input type="number" placeholder="Máx. participantes" />
                <Button className="w-full bg-violet-900 hover:bg-violet-800 text-white" onClick={() => alert('Grupo creado')}>Crear</Button>
              </CardContent>
            </Card>
          )}

          {showJoin && (
            <Card className="border-violet-200 bg-violet-50 shadow-sm mb-4">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-bold text-violet-900 text-sm">Unirse a un Grupo</h4>
                <Input placeholder="Código de invitación (Ej: Z1C01W)" />
                <Button className="w-full bg-violet-900 hover:bg-violet-800 text-white" onClick={() => alert('Te has unido al grupo')}>Unirse</Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <Card className="border-gray-100 shadow-sm cursor-pointer hover:border-violet-200" onClick={() => navigate('/grupos/1')}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900">Polla Mundial</h4>
                  <p className="text-xs text-gray-500">12 participantes</p>
                </div>
                <Settings className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          </div>
        </div>

        <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};
