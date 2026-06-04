import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:5175';

async function expectCanvasHasSignal(page) {
  const canvas = page.locator('.cosmic-scene canvas');
  await expect(canvas).toBeVisible();
  await page.waitForTimeout(900);

  const stats = await canvas.evaluate((element) => {
    const gl = element.getContext('webgl2') || element.getContext('webgl');
    if (!gl) {
      return { colorful: 0, bright: 0, samples: 0 };
    }

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const pixels = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    let colorful = 0;
    let bright = 0;
    let samples = 0;
    const step = 32;

    for (let index = 0; index < pixels.length; index += 4 * step) {
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const max = Math.max(red, green, blue);
      const min = Math.min(red, green, blue);
      samples += 1;

      if (max > 28) {
        bright += 1;
      }

      if (max - min > 12) {
        colorful += 1;
      }
    }

    return { colorful, bright, samples };
  });

  expect(stats.samples).toBeGreaterThan(1000);
  expect(stats.bright).toBeGreaterThan(80);
  expect(stats.colorful).toBeGreaterThan(40);
}

test('cosmic homepage renders a nonblank desktop scene', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseUrl);
  await expect(page.getByRole('heading', { name: /technology feels alive/i })).toBeVisible();
  await expectCanvasHasSignal(page);
  await page.screenshot({ path: 'test-results/cosmic-home-desktop.png', fullPage: true });
});

test('cosmic homepage renders a nonblank mobile scene', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl);
  await expect(page.getByRole('heading', { name: /technology feels alive/i })).toBeVisible();
  await expectCanvasHasSignal(page);
  await page.screenshot({ path: 'test-results/cosmic-home-mobile.png', fullPage: true });
});
