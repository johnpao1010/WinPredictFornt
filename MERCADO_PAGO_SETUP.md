# Configuración de Mercado Pago para WinPredict

## 1. Obtener Credenciales

1. Ve a [Mercado Pago Developers](https://www.mercadopago.com/developers/panel/credentials)
2. Inicia sesión con tu cuenta de Mercado Pago
3. Copia las siguientes credenciales:
   - **Public Key**: Para usar en el frontend
   - **Access Token**: Para usar en el backend

## 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_MERCADO_PAGO_PUBLIC_KEY=TEST_1234567890abcdef
VITE_MERCADO_PAGO_ACCESS_TOKEN=TEST_1234567890abcdef
```

## 3. Configurar Webhooks

En el dashboard de Mercado Pago, configura la URL del webhook:

```
https://tu-dominio.com/api/mercadopago/webhook
```

Eventos a suscribirse:
- `payment.created`
- `payment.updated`
- `payment.captured`

## 4. Backend - Endpoints necesarios

Tu backend debe implementar los siguientes endpoints:

### POST /api/mercadopago/create-payment
```javascript
const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token: process.env.VITE_MERCADO_PAGO_ACCESS_TOKEN
});

app.post('/api/mercadopago/create-payment', async (req, res) => {
  try {
    const { title, quantity, unit_price, currency } = req.body;
    
    const preference = {
      items: [{
        title,
        quantity,
        unit_price,
        currency_id: currency
      }],
      back_urls: {
        success: `${process.env.APP_URL}/payment/success`,
        failure: `${process.env.APP_URL}/payment/failure`,
        pending: `${process.env.APP_URL}/payment/pending`
      },
      auto_return: 'approved',
      notification_url: `${process.env.APP_URL}/api/mercadopago/webhook`
    };
    
    const result = await mercadopago.preferences.create(preference);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### GET /api/mercadopago/payment-status/:paymentId
```javascript
app.get('/api/mercadopago/payment-status/:paymentId', async (req, res) => {
  try {
    const payment = await mercadopago.payment.findById(req.params.paymentId);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### POST /api/mercadopago/webhook
```javascript
app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    const payment = req.body;
    
    if (payment.type === 'payment') {
      const paymentData = await mercadopago.payment.findById(payment.data.id);
      
      if (paymentData.status === 'approved') {
        // Activar PRO para el usuario
        await activateUserPro(paymentData.external_reference);
      }
    }
    
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## 5. Instalar SDK de Mercado Pago en el Backend

```bash
npm install mercadopago
```

## 6. Pruebas

1. Usa las credenciales de prueba para desarrollo
2. Mercado Pago proporciona tarjetas de prueba:
   - **Tarjeta aprobada**: 5031 7557 3453 0604
   - **Tarjeta rechazada**: 4173 5094 5256 4150
   - **Cualquier código de seguridad**: 123
   - **Cualquier fecha de vencimiento futura**

## 7. Producción

1. Cambia a credenciales de producción
2. Configura tu dominio en Mercado Pago
3. Verifica que los webhooks funcionen correctamente
4. Prueba con pagos reales (montos pequeños)

## 8. Consideraciones importantes

- Los webhooks deben responder con status 200 rápidamente
- Implementa reintentos para webhooks fallidos
- Valida siempre la firma del webhook
- Guarda todos los IDs de transacción
- Implementa manejo de errores robusto
