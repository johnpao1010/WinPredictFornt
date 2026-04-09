import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, ChevronRight, Lock, Crown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import { MercadoPagoPayment } from '../components/MercadoPagoPayment';

export const Home = () => {
  const { user, setDemoMode, updateUser } = useAuth();
  const isPro = user?.is_pro || false;
  const [activeTab, setActiveTab] = useState('inicio');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentSuccess = () => {
    // Actualizar el estado del usuario a PRO
    if (user) {
      updateUser({ is_pro: true });
      alert('¡Pago exitoso! Bienvenido a WinPredict PRO');
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Header Section */}
      <div className="bg-violet-950 text-white pt-12 pb-6 px-6 rounded-b-[32px] shadow-sm relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-1">
              Win<Star className="w-5 h-5 text-amber-400 fill-amber-400" />Predict
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-violet-200 text-sm">Hola, {user?.nombre}</p>
              {isPro ? (
                <span className="bg-amber-400/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-400/30">
                  <Star className="w-3 h-3 fill-amber-400" /> PRO
                </span>
              ) : (
                <p className="text-violet-200 text-sm">- Mundial 2026</p>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 bg-violet-800 rounded-full flex items-center justify-center font-bold text-lg border-2 border-violet-700">
              {user?.nombre?.substring(0, 2).toUpperCase() || 'JR'}
            </div>
            {isPro && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-violet-950"></div>
            )}
          </div>
        </div>

        {/* Header Tabs */}
        <div className="flex gap-6 text-sm font-medium border-b border-violet-800/50">
          {['Inicio', 'Partidos', 'Ranking'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                "pb-3 relative transition-colors",
                activeTab === tab.toLowerCase() ? "text-amber-400" : "text-violet-300 hover:text-white"
              )}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6 -mt-4 relative z-10">
        
        {/* Stats Card */}
        {isPro ? (
          <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-violet-950 rounded-full flex items-center justify-center font-bold text-white relative">
                  JR
                  <Crown className="w-4 h-4 text-amber-400 absolute -top-2" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">Jonathan Rojas</h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full w-fit mt-0.5">
                    <Star className="w-3 h-3 fill-amber-600" /> WinPredict PRO - Activo
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-amber-200/50">
                <div>
                  <div className="text-2xl font-bold text-amber-500">18</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Puntos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-500">3º</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Posición</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-500">6</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Aciertos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center py-4 shadow-sm border-gray-100">
              <div className="text-2xl font-bold text-gray-900">18</div>
              <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1">Puntos</div>
            </Card>
            <Card className="text-center py-4 shadow-sm border-gray-100">
              <div className="text-2xl font-bold text-gray-900">3º</div>
              <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1">Posición</div>
            </Card>
            <Card className="text-center py-4 shadow-sm border-gray-100">
              <div className="text-2xl font-bold text-gray-900">6</div>
              <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1">Aciertos</div>
            </Card>
          </div>
        )}

        {/* PRO Section */}
        {isPro ? (
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 px-5 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Sugerencias PRO de hoy</h3>
                <p className="text-xs text-gray-500">Basadas en datos históricos - IA</p>
              </div>
            </div>
            <CardContent className="p-0 divide-y divide-gray-50">
              {[
                { match: 'Colombia vs Brasil', score: '2 - 1', prob: '68%' },
                { match: 'Argentina vs Francia', score: '1 - 1', prob: '54%' },
                { match: 'España vs Alemania', score: '2 - 0', prob: '71%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-400">{item.match}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-violet-950">{item.score}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: item.prob }}></div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 w-7 text-right">{item.prob}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-violet-950 text-white border-0 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-800 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="inline-block bg-amber-400 text-violet-950 text-[10px] font-bold px-2 py-1 rounded mb-3 uppercase tracking-wider">
                PRO - $2 USD
              </div>
              <h3 className="text-xl font-bold mb-2 leading-tight">Gana con inteligencia artificial</h3>
              <p className="text-violet-200 text-sm mb-4 leading-relaxed">
                Un solo pago en dólares. Válido durante toda la polla. Sin renovaciones.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-violet-100">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                  <span>Marcadores sugeridos por IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                  <span>Auto-completado si no registras a tiempo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                  <span>Probabilidades en tiempo real</span>
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-amber-400">$2 USD</div>
                  <div className="text-[10px] text-violet-300 uppercase tracking-wider">pago único - toda la polla</div>
                </div>
                <Button variant="pro" onClick={() => setShowPaymentModal(true)}>
                  Activar PRO
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Próximo Partido */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Próximo Partido</h2>
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs text-gray-500 font-medium">Grupo A - Hoy 15:00</span>
                <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2 py-1 rounded-md">Cierra en 1h 45m</span>
              </div>
              
              <div className="flex justify-between items-center mb-6 px-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mb-2 mx-auto border border-gray-200"></div>
                  <span className="text-sm font-medium text-gray-600">Colombia</span>
                </div>
                <span className="text-xs font-bold text-gray-300">VS</span>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mb-2 mx-auto border border-gray-200"></div>
                  <span className="text-sm font-medium text-gray-600">Brasil</span>
                </div>
              </div>

              {isPro ? (
                <div className="bg-violet-50 rounded-xl p-3 flex items-center justify-between mb-4 border border-violet-100">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                    <span className="text-sm font-medium text-violet-950">
                      PRO sugiere: Colombia 2 - 1 Brasil - 68%
                    </span>
                  </div>
                  <Button size="sm" className="bg-violet-900 hover:bg-violet-800 text-white rounded-lg h-8 px-4 text-xs">
                    Usar
                  </Button>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between mb-4 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-500">
                      PRO sugiere un marcador — bloqueado
                    </span>
                  </div>
                  <button onClick={() => setDemoMode(true)} className="text-violet-700 text-xs font-bold flex items-center hover:underline">
                    Activar <ChevronRight className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              )}

              <Button variant="outline" className="w-full text-gray-400 border-gray-200 hover:bg-gray-50 hover:text-gray-500" disabled>
                Registrar pronóstico
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Mis Grupos */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Mis Grupos</h2>
          <div className="space-y-3">
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-200">Polla Mundial</h3>
                  <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded uppercase tracking-wider">Activo</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <span>12 participantes - Premio:</span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500" /> COP 200.000
                  </span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-4">1.</span>
                    <span className="text-gray-600 font-medium w-20 truncate">Carlos M.</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-900 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-gray-300 text-xs font-medium w-8 text-right">34 pts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-4">2.</span>
                    <span className="text-gray-600 font-medium w-20 truncate">Ana P.</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-900 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-gray-300 text-xs font-medium w-8 text-right">28 pts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-4">3.</span>
                    <span className="text-violet-900 font-bold w-20 truncate">Tú <span className="text-[10px] bg-violet-100 text-violet-700 px-1 rounded ml-1 font-bold">tú</span></span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-400 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-gray-300 text-xs font-medium w-8 text-right">18 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm opacity-60">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-200">Familia Mundial</h3>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">Pendiente</span>
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  8 participantes - Sin premio
                </div>
                <Button variant="outline" className="w-full text-gray-400 border-gray-200 h-9 text-xs" disabled>
                  Invitar amigos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>

      {/* Modal de Pago Mercado Pago */}
      <MercadoPagoPayment
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={2}
        description="WinPredict PRO - Acceso vitalicio"
      />
    </div>
  );
};
