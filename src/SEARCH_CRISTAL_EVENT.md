# 🔍 Búsqueda del Evento "Cerveza Cristal 2013"

## ⚡ MÉTODO RÁPIDO (Recomendado)

1. Abre la app en el navegador
2. Presiona **F12** para abrir la consola
3. Abre el archivo `/BUSCAR_CRISTAL.js` 
4. **Copia TODO el contenido**
5. **Pega en la consola** y presiona Enter
6. Espera los resultados (automático)

El script hace búsqueda exhaustiva en 3 pasos y muestra todos los detalles.

---

## Método 1: Búsqueda Manual (Alternativa)

Abre tu consola del navegador (F12) mientras estás en la app y ejecuta:

```javascript
// Buscar por "Cristal"
fetch('https://ohyxpzowxzbnluhuofut.supabase.co/functions/v1/make-server-c4bb2206/search-event?q=cristal', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oeXhwem93eHpibmx1aHVvZnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NjMwODEsImV4cCI6MjA0OTQzOTA4MX0.b5MNYP9Xs66BmJdNLsLZuR5k3gg1cW8QqASYhxoOkKA'
  }
})
.then(r => r.json())
.then(data => {
  console.log('🔍 Resultado de búsqueda:', data);
  if (!data.error) {
    console.log('✅ EVENTO ENCONTRADO:');
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log('❌ NO ENCONTRADO:', data.message);
    console.log('📋 Marcas disponibles:', data.available_brands);
  }
});
```

## Método 2: Ver todos los eventos

```javascript
fetch('https://ohyxpzowxzbnluhuofut.supabase.co/functions/v1/make-server-c4bb2206/events', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oeXhwem93eHpibmx1aHVvZnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NjMwODEsImV4cCI6MjA0OTQzOTA4MX0.b5MNYP9Xs66BmJdNLsLZuR5k3gg1cW8QqASYhxoOkKA'
  }
})
.then(r => r.json())
.then(events => {
  console.log(`📋 Total de eventos en Supabase: ${events.length}`);
  
  // Buscar manualmente "Cristal" o "2013"
  const cristal = events.filter(e => 
    e.brand?.toLowerCase().includes('cristal') || 
    e.title?.toLowerCase().includes('cristal') ||
    e.year === '2013' ||
    e.year === 2013
  );
  
  if (cristal.length > 0) {
    console.log(`✅ Encontrados ${cristal.length} eventos de Cristal/2013:`);
    cristal.forEach(e => {
      console.log(`\n🍺 ${e.brand} - ${e.title} (${e.year})`);
      console.log(JSON.stringify(e, null, 2));
    });
  } else {
    console.log('❌ No se encontró ningún evento de Cerveza Cristal o del 2013');
    console.log('\n📋 Primeros 10 eventos disponibles:');
    events.slice(0, 10).forEach(e => {
      console.log(`- ${e.brand} | ${e.title} | ${e.year || 'sin año'}`);
    });
  }
});
```

## Método 3: Buscar en AdminPanel

1. Ve a `/admin` en tu app
2. Login con las credenciales
3. Busca manualmente "Cristal" en la lista de eventos
4. Si existe, haz clic para ver todos los campos

---

## ¿Qué esperar?

### Si el evento EXISTE en Supabase:
```json
{
  "id": "...",
  "brand": "Cerveza Cristal",
  "title": "Activaciones en Chile 2013",
  "description": "...",
  "year": "2013",
  "country": "Chile",
  "city": "Santiago",
  ...
  (45+ campos completos)
}
```

### Si NO existe:
```json
{
  "error": "Not found",
  "message": "No event found matching 'cristal'",
  "total_events": 50,
  "available_brands": ["Banco de Chile", "Entel", "CCU", ...]
}
```

---

## Próximos pasos según el resultado

### ✅ Si existe:
Te mostraré todo el contenido formateado.

### ❌ Si NO existe:
Opciones:
1. Crear el evento desde cero con IA
2. Revisar si está en datos locales antiguos
3. Importar desde backup si existe

---

**Ejecuta el script del Método 2 en tu consola del navegador y pega aquí el resultado para continuar.**
