# 🔑 Configuración de OpenAI API para Mega Audit

## ⚠️ Error: "Failed to fetch" en Mega Audit

Si ves este error, significa que la **API key de OpenAI no está configurada** o no es válida.

---

## 📋 Pasos para Configurar

### 1️⃣ Obtener API Key de OpenAI

1. Ve a [platform.openai.com](https://platform.openai.com)
2. Inicia sesión (o crea una cuenta)
3. Ve a **API Keys** en el menú lateral
4. Click en **"Create new secret key"**
5. Dale un nombre: `WAV-BTL-Mega-Audit`
6. **Copia la key** (empieza con `sk-...`)
   - ⚠️ Solo la verás una vez, guárdala en un lugar seguro

---

### 2️⃣ Configurar en Supabase

1. Ve a tu proyecto en [supabase.com](https://supabase.com)
2. Navega a: **Settings** → **Edge Functions** → **Secrets**
3. Click en **"Add new secret"**
4. Configura:
   ```
   Name: OPENAI_API_KEY
   Value: sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. Click en **Save**

---

### 3️⃣ Verificar Configuración

Ejecuta este comando en la consola del navegador (F12):

```javascript
fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/audit-all-events`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${publicAnonKey}`
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Respuesta esperada:**
- ✅ Si funciona: `{ success: true, total: X, processed: X }`
- ❌ Si falla: Verás el error específico en la consola

---

## 🐛 Troubleshooting

### Error: "Failed to fetch"

**Causa:** No se puede conectar con el servidor

**Soluciones:**
1. Verifica tu conexión a internet
2. Verifica que el servidor de Supabase esté activo
3. Revisa si hay un firewall bloqueando la conexión

---

### Error: "OPENAI_API_KEY no está configurada"

**Causa:** La variable de entorno no existe en Supabase

**Solución:**
1. Sigue los pasos en **"2️⃣ Configurar en Supabase"**
2. Asegúrate de que el nombre sea exactamente: `OPENAI_API_KEY`
3. Espera 1-2 minutos para que se propague el cambio

---

### Error: "OpenAI API Error: 401"

**Causa:** API key inválida o expirada

**Soluciones:**
1. Verifica que la key comience con `sk-`
2. Verifica que la key esté activa en OpenAI Dashboard
3. Intenta generar una nueva key y actualízala en Supabase

---

### Error: "OpenAI API Error: 429"

**Causa:** Rate limit excedido (demasiados requests)

**Solución:**
1. Espera 1-2 minutos
2. Si persiste, verifica tu plan de OpenAI (puede que hayas excedido tu cuota)
3. Considera usar un modelo más barato (`gpt-3.5-turbo` en lugar de `gpt-4o`)

---

### Error: "OpenAI API Error: 500"

**Causa:** Error interno de OpenAI

**Solución:**
1. OpenAI está experimentando problemas temporales
2. Verifica [status.openai.com](https://status.openai.com)
3. Intenta nuevamente en unos minutos

---

## 💰 Costos Estimados

El Mega Audit usa **GPT-4o** para mejor calidad. Costos aproximados:

| Eventos | Tokens Aprox. | Costo (USD) |
|---------|---------------|-------------|
| 1 evento | ~3,000 tokens | $0.03 |
| 10 eventos | ~30,000 tokens | $0.30 |
| 50 eventos | ~150,000 tokens | $1.50 |
| 100 eventos | ~300,000 tokens | $3.00 |

**Nota:** Estos son estimados. El costo real depende del tamaño de cada evento.

---

## 🔄 Cambiar a GPT-3.5 (Más Barato)

Si quieres reducir costos, edita `/supabase/functions/server/auditAll.ts`:

```typescript
// Línea 54
model: "gpt-3.5-turbo",  // Antes: "gpt-4o"
```

**Ahorro:** ~90% menos costo  
**Trade-off:** Calidad ligeramente inferior en inferencia de datos

---

## ✅ Checklist de Configuración

Antes de ejecutar Mega Audit, verifica:

- [ ] Tengo una cuenta de OpenAI activa
- [ ] Tengo una API key válida (empieza con `sk-`)
- [ ] La API key está configurada en Supabase como `OPENAI_API_KEY`
- [ ] Tengo créditos disponibles en mi cuenta de OpenAI
- [ ] He probado la conexión con el script de verificación

---

## 📚 Recursos

- [OpenAI Platform](https://platform.openai.com)
- [OpenAI API Pricing](https://openai.com/pricing)
- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [OpenAI Status Page](https://status.openai.com)

---

*Última actualización: Diciembre 1, 2024*  
*WAV BTL Development Team*
