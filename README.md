# Sistema de Quiz 

Este proyecto es una aplicación web interactiva de preguntas y respuestas (Trivia) desarrollada como parte de la evaluación de la materia. Permite a los usuarios iniciar sesión, contestar cuestionarios, acumular puntos y competir en una tabla de clasificación. Además, cuenta con un panel de administrador para gestionar el banco de preguntas.

## Equipo de Desarrollo
* Santiago Gabriel Flores Ruiz
* Jonathan Narvaes Morales
* Jose Palomec

---

## Características Principales (Cumplimiento de Rúbrica)

El proyecto cumple con los siguientes requerimientos establecidos:

1. **Uso de API Externa:** Integración con Open Trivia Database (OpenTDB) para generar e importar un banco de preguntas y respuestas automáticamente sobre un área de interés.
2. **Base de Datos:** Almacenamiento persistente de las preguntas, respuestas, usuarios y puntajes.
3. **API RESTful (Backend):** * CRUD completo para gestionar las preguntas y respuestas.
   * CRUD para el registro de usuarios y actualización dinámica de puntajes.
4. **Seguridad y Acceso:** Página de login con validación de credenciales (Diferenciación entre roles de Administrador y Jugador).
5. **Pruebas Automatizadas:** Implementación de pruebas sobre la interfaz (video) utilizando Playwright.

---

## Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3 (Diseño responsivo sin dependencias externas), Vanilla JavaScript.
* **Backend:** Node.js con Express.
* **Integración:** Fetch API para consumo de OpenTDB y comunicación cliente-servidor.
* **Testing:** Playwright (Pruebas E2E de interfaz de usuario).

---

## Cómo ejecutar el proyecto localmente

### 1. Requisitos previos
* Tener Node.js instalado en el equipo.
* Clonar o descargar este repositorio compartido entre los 3 integrantes.

### 2. Instalación
Abre una terminal en la carpeta raíz del proyecto e instala las dependencias necesarias:
```bash
npm install
