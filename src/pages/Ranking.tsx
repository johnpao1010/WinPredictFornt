import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Trophy, BarChart2 } from 'lucide-react';
import { RankingChart } from '../components/RankingChart';

export const Ranking = () => {
  const rankingData = [
    { pos: 1, name: 'Carlos M.', pts: 34, aciertos: 10 },
    { pos: 2, name: 'Ana P.', pts: 28, aciertos: 8 },
    { pos: 3, name: 'Jonathan R.', pts: 18, aciertos: 6, isCurrentUser: true },
    { pos: 4, name: 'Luis G.', pts: 15, aciertos: 4 },
    { pos: 5, name: 'Maria V.', pts: 12, aciertos: 3 },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      <div className="bg-violet-950 text-white pt-12 pb-6 px-6 rounded-b-[32px] shadow-sm">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" /> Ranking
        </h1>
        <p className="text-violet-200 text-sm mt-1">Polla Mundial</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        <Card className="border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gray-50/50 px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-violet-900" />
            <h3 className="font-bold text-gray-900 text-sm">Top 5 - Puntuación</h3>
          </div>
          <CardContent className="p-2">
            <RankingChart data={rankingData} />
          </CardContent>
        </Card>

        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2">Tabla de Posiciones</h3>
        
        {rankingData.map((user, index) => (
          <Card key={index} className={`border-gray-100 shadow-sm ${user.pos === 3 ? 'border-violet-300 bg-violet-50' : ''}`}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                user.pos === 1 ? 'bg-amber-400 text-amber-900' :
                user.pos === 2 ? 'bg-gray-300 text-gray-800' :
                user.pos === 3 ? 'bg-amber-700 text-amber-100' :
                'bg-gray-100 text-gray-500'
              }`}>
                {user.pos}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold ${user.pos === 3 ? 'text-violet-900' : 'text-gray-900'}`}>
                  {user.name} {user.pos === 3 && '(Tú)'}
                </h3>
                <p className="text-xs text-gray-500">{user.aciertos} aciertos exactos</p>
              </div>
              <div className="text-right">
                <div className="font-black text-lg text-violet-950">{user.pts}</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold">Pts</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
