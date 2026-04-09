import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, QrCode } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { mercadoPagoService } from '../services/api';

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
  const [qrCode, setQrCode] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'ticket'>('card');

  useEffect(() => {
    if (isOpen) {
      createPayment();
    }
  }, [isOpen]);

  const createPayment = async () => {
    setLoading(true);
    try {
      const paymentData = {
        title: description,
        quantity: 1,
        unit_price: amount,
        currency: 'USD',
        payment_methods: {
          excluded_payment_types: [],
          installments: 1
        }
      };

      const response = await mercadoPagoService.createPayment(paymentData);
      const { init_point, sandbox_init_point, id } = response.data;
      
      setPaymentId(id);
      setPaymentUrl(sandbox_init_point || init_point);

      // Para PIX (Brasil) o QR
      if (response.data.point_of_interaction?.transaction_data?.qr_code) {
        setQrCode(response.data.point_of_interaction.transaction_data.qr_code);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRedirect = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
      // Iniciar polling para verificar el estado del pago
      checkPaymentStatus();
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentId) return;

    const interval = setInterval(async () => {
      try {
        const response = await mercadoPagoService.getPaymentStatus(paymentId);
        const status = response.data.status;

        if (status === 'approved') {
          clearInterval(interval);
          onSuccess();
          onClose();
        } else if (status === 'rejected' || status === 'cancelled') {
          clearInterval(interval);
          alert('El pago fue rechazado. Por favor intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    }, 3000); // Verificar cada 3 segundos

    // Limpiar el intervalo después de 5 minutos
    setTimeout(() => {
      clearInterval(interval);
    }, 300000);
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

              {/* QR Code para PIX */}
              {paymentMethod === 'pix' && qrCode && (
                <div className="mb-6 text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 inline-block">
                    <div className="text-xs text-gray-500 mb-2">Escanea este código QR</div>
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="font-mono text-xs break-all max-w-xs">{qrCode}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón de pago */}
              <button
                onClick={handlePaymentRedirect}
                className="w-full bg-violet-600 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!paymentUrl}
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
