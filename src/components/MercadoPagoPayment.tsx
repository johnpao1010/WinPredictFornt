import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, QrCode } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface MercadoPagoPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  description: string;
}

export const MercadoPagoPayment: React.FC<MercadoPagoPaymentProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  description
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'ticket'>('card');

  useEffect(() => {
    if (isOpen) {
      createPayment();
    }
  }, [isOpen]);

  const createPayment = async () => {
    setLoading(true);
    try {
      const userToken = localStorage.getItem('token');
      const response = await fetch('https://winpredict-backend.onrender.com/api/pro/checkout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Verificar si la respuesta es JSON válido
      const responseText = await response.text();
      console.log('Response raw:', responseText);
      
      // Validar que la respuesta no esté vacía
      if (!responseText.trim()) {
        throw new Error('El servidor devolvió una respuesta vacía. El endpoint /api/pro/checkout puede tener un problema.');
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Respuesta de Mercado Pago (JSON):', data);
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        console.error('Response text that failed to parse:', responseText);
        throw new Error(`Respuesta no válida del servidor: ${response.status}`);
      }
      
      // Extraer checkout_url y preference_id según la respuesta del backend
      const { checkout_url, preference_id } = data;
      
      console.log('Checkout URL:', checkout_url);
      console.log('Preference ID:', preference_id);
      
      setPaymentUrl(checkout_url);

    } catch (error) {
      console.error('Error creating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRedirect = () => {
    if (paymentUrl) {
      // Redirigir a Mercado Pago como sugiere el backend
      window.location.href = paymentUrl;
    }
  };

  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Pagar con Mercado Pago</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Resumen del pago */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">{description}</div>
            <div className="text-2xl font-bold text-gray-900">${amount.toFixed(2)} USD</div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Procesando pago...</p>
            </div>
          ) : (
            <>
              {/* Métodos de pago */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-violet-600 bg-violet-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Tarjeta de crédito/débito</div>
                    <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'pix'
                      ? 'border-violet-600 bg-violet-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">PIX</div>
                    <div className="text-sm text-gray-500">Pago instantáneo con QR</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('ticket')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'ticket'
                      ? 'border-violet-600 bg-violet-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Efectivo</div>
                    <div className="text-sm text-gray-500">Paga en locales autorizados</div>
                  </div>
                </button>
              </div>

              
              {/* Botón de pago */}
              <button
                onClick={handlePaymentRedirect}
                className="w-full bg-violet-600 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!paymentUrl && !loading}
              >
                {paymentMethod === 'pix' ? 'Copiar código PIX' : 'Continuar al pago'}
              </button>
              
              {/* Información de seguridad */}
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>Pago seguro procesado por Mercado Pago</p>
                <p className="mt-1">Tus datos están protegidos con encriptación SSL</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
