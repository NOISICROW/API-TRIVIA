const { test, expect } = require('@playwright/test');
const path = require('path');

test('Prueba de Login y Panel de Administrador', async ({ page }) => {
  // 1. Abrir tu archivo index.html localmente
  const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
  await page.goto(filePath);

  // 2. Verificar que estamos en la pantalla de Login
  await expect(page.locator('h1')).toContainText('Sistema de Quiz');

  // 3. Simular que el usuario escribe sus datos
  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin123');
  
  // 4. Hacer clic en el botón Entrar
  await page.click('button:has-text("Entrar")');

  // 5. Comprobar que entramos al Dashboard y dice "ADMIN"
  await expect(page.locator('#userDisplay')).toContainText('admin', { ignoreCase: true });

  // 6. Verificar que el botón de la API verde aparezca
  await expect(page.locator('button:has-text("Extraer")')).toBeVisible();
  
  // Pequeña pausa de 2 segundos para que el video no termine tan de golpe
  await page.waitForTimeout(2000); 
});