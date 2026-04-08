import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { CalendarDays, ChevronRight } from 'lucide-react';

export const Matches = () => {
  const navigate = useNavigate();
  const matches = [
    { id: '1', local: 'Colombia', visitante: 'Brasil', date: 'Hoy 15:00', group: 'Grupo A', status: 'pending' },
    { id: '2', local: 'Argentina', visitante: 'Francia', date: 'Mañana 14:00', group: 'Grupo B', status: 'pending' },
    { id: '3', local: 'España', visitante: 'Alemania', date: '10 Abr 16:00', group: 'Grupo C', status: 'pending' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      <div className="bg-violet-950 text-white pt-12 pb-6 px-6 rounded-b-[32px] shadow-sm">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarDays className="w-6 h-6" /> Partidos
        </h1>
        <p className="text-violet-200 text-sm mt-1">Programa y pronostica</p>
      </div>
      <div className="px-6 py-6 space-y-4">
        {matches.map(match => (
          <Card key={match.id} className="border-gray-100 shadow-sm cursor-pointer hover:border-violet-200 transition-colors" onClick={() => navigate(`/partidos/${match.id}`)}>
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500 font-medium">{match.group} - {match.date}</span>
              </div>
              <div className="flex justify-between items-center px-2">
                <div className="text-center w-1/3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">{match.local.substring(0,3).toUpperCase()}</div>
                  <span className="text-sm font-medium text-gray-700">{match.local}</span>
                </div>
                <span className="text-xs font-bold text-gray-300 w-1/3 text-center">VS</span>
                <div className="text-center w-1/3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">{match.visitante.substring(0,3).toUpperCase()}</div>
                  <span className="text-sm font-medium text-gray-700">{match.visitante}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs font-medium text-violet-600">Sin pronóstico</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
