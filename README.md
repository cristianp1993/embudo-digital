# Embudo Digital - Experimento Interactivo

Aplicación web para simular un embudo digital en tiempo real con múltiples usuarios simultáneos.

## Configuración de Firebase (Requerido para sincronización multi-usuario)

Para que 30 personas puedan entrar simultáneamente desde diferentes dispositivos y ver las métricas en tiempo real, necesitas configurar Firebase:

1. Ve a [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Crea un nuevo proyecto (o usa uno existente)
3. En el proyecto, ve a "Realtime Database" en el menú izquierdo
4. Crea una base de datos
5. En "Reglas", establece las reglas en modo de prueba:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
6. Ve a "Configuración del proyecto" (icono de engranaje) → "General"
7. Desplázate hasta "Tus apps" y haz clic en el icono de web (</>)
8. Registra la app (puedes llamarla "embudo-digital")
9. Copia las credenciales que te dan (API Key, Auth Domain, Database URL, Project ID, Storage Bucket, Messaging Sender ID, App ID)
10. Pega estas credenciales en el archivo `.env.local` reemplazando los valores de ejemplo

## Instalación

```bash
pnpm install
```

## Ejecutar en desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en http://localhost:3000

## Construir para producción

```bash
pnpm build
pnpm start
```

## Cómo funciona

- Cada usuario que entra incrementa el contador de "Iniciaron"
- Los usuarios avanzan por TOFU → MOFU → BOFU
- Si eligen "Ninguna" en cualquier etapa, se registran como abandono
- Si llegan al final, se registran como conversión
- Todas las métricas se sincronizan en tiempo real entre todos los usuarios mediante Firebase

## Notas importantes

- Las métricas se sincronizan en tiempo real entre todos los dispositivos
- Al recargar la página, el usuario individual reinicia su experiencia pero las métricas globales se mantienen
- Para reiniciar todas las métricas, necesitas borrar los datos en Firebase Console
