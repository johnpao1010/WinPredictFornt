import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { matchesService } from '../services/api';

export const Matches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await matchesService.list();
        console.log('API Response:', response.data);
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      <div className="bg-violet-950 text-white pt-12 pb-6 px-6 rounded-b-[32px] shadow-sm">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarDays className="w-6 h-6" /> Partidos
        </h1>
        <p className="text-violet-200 text-sm mt-1">Programa y pronostica</p>
      </div>
      <div className="px-6 py-6 space-y-4">
        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Cargando partidos...</div>
          </div>
        )}
        
        {!loading && matches.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">No hay partidos disponibles</div>
          </div>
        )}
        
        {!loading && matches.length > 0 && matches.map(match => {
          console.log('Match structure:', match);
          return (
          <Card key={match.id} className="border-gray-100 shadow-sm cursor-pointer hover:border-violet-200 transition-colors" onClick={() => navigate(`/partidos/${match.id}`)}>
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500 font-medium">{match.group} - {match.date}</span>
              </div>
              <div className="flex justify-between items-center px-2">
                <div className="text-center w-1/3">
                  <div className="w-10 h-10 mb-2 mx-auto flex items-center justify-center text-2xl">
                    {match.bandera_local || '🏳️'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{match.equipo_local || 'Equipo local'}</span>
                </div>
                <span className="text-xs font-bold text-gray-300 w-1/3 text-center">VS</span>
                <div className="text-center w-1/3">
                  <div className="w-10 h-10 mb-2 mx-auto flex items-center justify-center text-2xl">
                    {match.bandera_visitante || '🏳️'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{match.equipo_visitante || 'Equipo visitante'}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs font-medium text-violet-600">Sin pronóstico</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>
    </div>
  );
};
