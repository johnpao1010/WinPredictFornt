import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Settings, ListChecks } from 'lucide-react';
import { cn } from '../lib/utils';

export const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reglas');

  const [rules, setRules] = useState({
    pts_marcador_exacto: 5,
    pts_ganador: 3,
    pts_empate: 2,
    pts_gol: 1
  });

  const handleSaveRules = () => {
    alert('Reglas actualizadas');
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      <div className="bg-violet-950 text-white pt-12 pb-6 px-6 rounded-b-[32px] shadow-sm">
        <button onClick={() => navigate(-1)} className="flex items-center text-violet-200 hover:text-white mb-4">
          <ArrowLeft className="w-5 h-5 mr-1" /> Volver
        </button>
        <h1 className="text-2xl font-bold">Polla Mundial</h1>
        <p className="text-violet-200 text-sm mt-1">Código: Z1C01W</p>
        
        <div className="flex gap-6 text-sm font-medium border-b border-violet-800/50 mt-6">
          <button onClick={() => setActiveTab('reglas')} className={cn("pb-3 relative transition-colors", activeTab === 'reglas' ? "text-amber-400" : "text-violet-300")}>
            Reglas
            {activeTab === 'reglas' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-t-full"></div>}
          </button>
          <button onClick={() => setActiveTab('pronosticos')} className={cn("pb-3 relative transition-colors", activeTab === 'pronosticos' ? "text-amber-400" : "text-violet-300")}>
            Mis Pronósticos
            {activeTab === 'pronosticos' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-t-full"></div>}
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {activeTab === 'reglas' ? (
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-violet-900" />
                <h3 className="font-bold text-gray-900">Configuración de Puntos</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-600">Marcador Exacto</label>
                  <Input type="number" className="w-20 text-center" value={rules.pts_marcador_exacto} onChange={e => setRules({...rules, pts_marcador_exacto: Number(e.target.value)})} />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-600">Acertar Ganador</label>
                  <Input type="number" className="w-20 text-center" value={rules.pts_ganador} onChange={e => setRules({...rules, pts_ganador: Number(e.target.value)})} />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-600">Acertar Empate</label>
                  <Input type="number" className="w-20 text-center" value={rules.pts_empate} onChange={e => setRules({...rules, pts_empate: Number(e.target.value)})} />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-600">Por Gol Anotado</label>
                  <Input type="number" className="w-20 text-center" value={rules.pts_gol} onChange={e => setRules({...rules, pts_gol: Number(e.target.value)})} />
                </div>
                <Button className="w-full bg-violet-900 hover:bg-violet-800 text-white mt-4" onClick={handleSaveRules}>Guardar Reglas</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="w-5 h-5 text-violet-900" />
                <h3 className="font-bold text-gray-900">Historial</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Colombia vs Brasil</p>
                    <p className="font-bold text-gray-900">Pronóstico: 2 - 1</p>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">Pendiente</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Argentina vs Francia</p>
                    <p className="font-bold text-gray-900">Pronóstico: 1 - 1</p>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">+5 pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
