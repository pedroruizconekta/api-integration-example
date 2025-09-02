# Ejemplo de Integración de Pagos con Conekta

Este proyecto demuestra cómo integrarse con Conekta para procesar pagos utilizando la opción de Compra Ahora, Paga Después (BNPL) o en efectivo. El proyecto se divide en dos partes principales: el backend y el frontend.

## Estructura del Proyecto

### Backend

El backend es responsable de manejar las solicitudes API y procesar los pagos. Está estructurado de la siguiente manera:

- **`index.js`**: El punto de entrada principal para el servidor backend.
- **`package.json`**: Contiene las dependencias y scripts para el backend.
- **`routes/`**: Directorio que contiene las definiciones de rutas para manejar diferentes endpoints de la API.
- **`json-server.json`**: Archivo de configuración para el servidor JSON utilizado en el proyecto.

### Frontend

El frontend es responsable de la interfaz de usuario e interactuar con el backend. Está estructurado de la siguiente manera:

- **`src/`**: Contiene el código fuente para la aplicación frontend.
- **`public/`**: Contiene los activos estáticos y el archivo HTML principal para el frontend.
- **`package.json`**: Contiene las dependencias y scripts para el frontend.

## Instrucciones de Configuración

Para probar la integración, necesitas establecer la clave privada de Conekta en el archivo `.env` dentro de la carpeta backend. Sigue estos pasos:

1. Obtén tus claves API de Conekta visitando la [Documentación de Claves API de Conekta](https://developers.conekta.com/docs/api-keys-producci%C3%B3n).
2. Establece la clave privada en el archivo `.env` ubicado dentro de la carpeta "backend".

```plaintext
CONEKTA_PRIVATE_KEY=tu_clave_privada_aquí
```
