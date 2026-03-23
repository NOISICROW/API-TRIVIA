# Propuesta del Proyecto: Sistema de Quiz

## 1. Propuesta de API (Endpoints REST)
El sistema cuenta con una API propia construida en Node.js/Express para manejar las peticiones del cliente:
* `POST /api/login`: Autentica al usuario verificando credenciales en la base de datos.
* `GET /api/usuarios`: Devuelve la lista de usuarios para construir la tabla de clasificación (Ranking).
* `POST /api/puntaje`: Actualiza el puntaje del usuario (solo si el nuevo puntaje supera su récord anterior).
* `GET /api/preguntas`: Obtiene el banco de preguntas disponible.
* `POST /api/preguntas`: Añade una nueva pregunta a la base de datos.
* `DELETE /api/preguntas/:id`: Elimina una pregunta específica.

## 2. Modelo de Base de Datos (NoSQL Documental)
Se implementó una base de datos local y persistente basada en un archivo JSON (`database.json`). Es un enfoque NoSQL que permite guardar objetos anidados fácilmente. Consta de dos colecciones principales:

* **Colección `usuarios`**: Almacena `id`, `username`, `password` y el `puntaje` máximo alcanzado.
* **Colección `preguntas`**: Almacena un `id` único (timestamp), el texto de la `pregunta`, un arreglo (array) con las `opciones` de respuesta, y el índice numérico de la respuesta `correcta`.

## 3. Pantallas del Sistema (Stitch / Flujo UI)
*(Nota: Ver las imágenes adjuntas en esta misma carpeta)*

1. **Pantalla de Login (`1-login.png`)**: Interfaz inicial. Protege el acceso al sistema. Maneja errores si las credenciales son incorrectas.
2. **Pantalla de Gestión / Dashboard (`2-dashboard.png`)**: Panel principal. Muestra el usuario activo, la tabla de clasificación (ranking en tiempo real ordenada por puntos), el banco de preguntas para borrarlas y el formulario para inyectar nuevas preguntas mediante la API.
3. **Pantalla de Juego (`3-juego.png`)**: Oculta el panel de gestión y muestra el cuestionario interactivo. Al enviar las respuestas, calcula el puntaje y llama a la API para actualizar el récord del usuario si aplica.