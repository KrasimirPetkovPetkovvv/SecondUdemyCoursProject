import { expect, test } from "@playwright/test";

test("Complex button click - First Example Test", async ({ page }) => {
  await page.goto("ComplexButton.html");

  const complextButton = page.locator("button");

  const isVisible = await complextButton.isVisible();
  expect.soft(isVisible).toBe(true);

  const isEnabled = await complextButton.isEnabled();
  expect.soft(isEnabled).toBe(true);

  await complextButton.click();
});
test("Complex button click - First Example Test , with good results", async ({
  page,
}) => {
  await page.goto("ComplexButton.html");

  const complextButton = page.locator("button");
  await complextButton.click();

  const isVisible = await complextButton.isVisible();
  expect.soft(isVisible).toBe(true);

  const isEnabled = await complextButton.isEnabled();
  expect.soft(isEnabled).toBe(true);
});
test("Complex button click - First Example Test , with good approach", async ({
  page,
}) => {
  await page.goto("ComplexButton.html");

  const complextButton = page.locator("button");

  await expect(complextButton).toBeVisible();
  await expect(complextButton).toBeEnabled();

    await complextButton.click();

    await expect(page.locator('#myLabel')).toBeVisible();
  
});