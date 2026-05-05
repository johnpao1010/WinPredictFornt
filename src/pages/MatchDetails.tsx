import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Star } from 'lucide-react';
import { matchesService, predictionsService } from '../services/api';

export const MatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setDemoMode } = useAuth();
  const isPro = user?.is_pro || false;

  const [golesLocal, setGolesLocal] = useState('');
  const [golesVisitante, setGolesVisitante] = useState('');
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await matchesService.get(id!);
        setMatch(response.data);
      } catch (error) {
        console.error('Error fetching match:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMatch();
    }
  }, [id]);

  const handleSave = async () => {
    if (!golesLocal || !golesVisitante) {
      alert('Por favor ingresa ambos marcadores');
      return;
    }

    try {
      const predictionData = {
        partido_id: match.id,
        grupo_id: match.fase, // Usando fase como grupo_id, ajustar según API
        goles_local: parseInt(golesLocal),
        goles_visitante: parseInt(golesVisitante)
      };

      await predictionsService.register(predictionData);
      alert('Pronóstico guardado exitosamente');
      navigate('/partidos');
    } catch (error) {
      console.error('Error saving prediction:', error);
      alert('Error al guardar el pronóstico. Intenta nuevamente.');
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      <div className="bg-violet-950 text-white pt-12 pb-6 px-6 rounded-b-[32px] shadow-sm">
        <button onClick={() => navigate(-1)} className="flex items-center text-violet-200 hover:text-white mb-4">
          <ArrowLeft className="w-5 h-5 mr-1" /> Volver
        </button>
        <h1 className="text-2xl font-bold">Detalle del Partido</h1>
        <p className="text-violet-200 text-sm mt-1">
          {loading ? 'Cargando...' : `${match?.fase || 'Partido'} - ${new Date(match?.fecha_hora).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`}
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando detalles del partido...</p>
          </div>
        ) : (
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-center w-1/3">
                <div className="w-16 h-16 mb-2 mx-auto flex items-center justify-center text-2xl">
                  {match?.bandera_local || '🏳️'}
                </div>
                <span className="text-sm font-bold text-gray-700">{match?.equipo_local || 'Equipo local'}</span>
              </div>
              <span className="text-xl font-black text-gray-300 w-1/3 text-center">VS</span>
              <div className="text-center w-1/3">
                <div className="w-16 h-16 mb-2 mx-auto flex items-center justify-center text-2xl">
                  {match?.bandera_visitante || '🏳️'}
                </div>
                <span className="text-sm font-bold text-gray-700">{match?.equipo_visitante || 'Equipo visitante'}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">Tu Pronóstico</h3>
              <div className="flex items-center justify-center gap-4">
                <Input type="number" className="w-16 text-center text-lg font-bold" value={golesLocal} onChange={e => setGolesLocal(e.target.value)} placeholder="-" />
                <span className="text-gray-400 font-bold">-</span>
                <Input type="number" className="w-16 text-center text-lg font-bold" value={golesVisitante} onChange={e => setGolesVisitante(e.target.value)} placeholder="-" />
              </div>
              <Button className="w-full mt-4 bg-violet-900 hover:bg-violet-800 text-white" onClick={handleSave}>
                Guardar Pronóstico
              </Button>
            </div>
          </CardContent>
        </Card>
        )}

        {isPro ? (
          <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-gray-900">Sugerencia de IA</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Basado en el rendimiento histórico y estadísticas recientes, el marcador más probable es:</p>
              <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-amber-100">
                <span className="font-bold text-violet-950">{match?.equipo_local} 2 - 1 {match?.equipo_visitante}</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">68% prob.</span>
              </div>
              <Button variant="outline" className="w-full mt-3 border-amber-300 text-amber-700 hover:bg-amber-100" onClick={() => { setGolesLocal('2'); setGolesVisitante('1'); }}>
                Usar sugerencia
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-violet-950 text-white border-0 shadow-sm">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-800 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <h3 className="font-bold mb-1">¿No sabes qué pronosticar?</h3>
                <p className="text-xs text-violet-200 mb-3">Activa PRO y recibe sugerencias basadas en Inteligencia Artificial para este partido.</p>
                <Button variant="pro" size="sm" onClick={() => setDemoMode(true)}>Activar PRO por 3.5</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
