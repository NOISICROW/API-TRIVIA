const { test, expect } = require('@playwright/test');
const path = require('path');

test('Prueba de Robot jugando la Trivia', async ({ page }) => {
  // 1. MAGIA: Le decimos al robot que cuando salga la alerta de "¡Felicidades! Hiciste X puntos", le dé a "Aceptar" solito.
  page.on('dialog', async dialog => {
    console.log(`El navegador mostró esta alerta: ${dialog.message()}`);
    await dialog.accept();
  });

  // 2. Abrir tu archivo local
  const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
  await page.goto(filePath);

  // 3. Iniciar sesión como administrador
  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin123');
  await page.click('button:has-text("Entrar al Sistema")');

  // Pequeña pausa para que en el video se aprecie el panel
  await page.waitForTimeout(1000);

  // 4. ¡A Jugar! Le damos clic al botón morado
  await page.click('button:has-text("Jugar Cuestionario")');
  await page.waitForTimeout(1000);

  // 5. Responder las preguntas (El robot buscará y seleccionará la Opción 1 de todas las preguntas)
  const opciones = await page.locator('input[type="radio"][value="0"]').all();
  for (const opcion of opciones) {
    await opcion.check({ force: true });
    await page.waitForTimeout(500); // Pausa de medio segundo entre cada respuesta para que se vea bonito en el video
  }

  // 6. Enviar respuestas para que lo califiquen
  await page.click('button:has-text("Enviar Respuestas")');

  // 7. Pausa final para que en el video se vea cómo regresó al panel y se actualizó el puntaje
  await page.waitForTimeout(3000); 
});