import { test, expect } from "@playwright/test";

test("Pick locator tool  ", async ({ page }) => {
  await page.goto("http://localhost:5005/");
  await expect(page.getByText("Wedding Planning")).toBeVisible();
  await expect(page.getByRole("list")).toContainText("Wedding Planning");
  await expect(page.getByRole("list")).toMatchAriaSnapshot(
    `- listitem: Wedding Planning`,
  );
  const acceptCookiesButton = await page.getByTestId("accept-cookies");
  await acceptCookiesButton.click();
  await expect(acceptCookiesButton).toBeHidden();
});
