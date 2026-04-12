import { test, expect } from "@playwright/test";

test("Get by Role practice - heading", async ({ page }) => {
  await page.goto("");

  const servicesHeading = await page.getByRole("heading", {
    name: "Our Services ",
    exact: true,
  });
  await expect(servicesHeading).toBeVisible();
});
test("Get by Role practice - list item ", async ({ page }) => {
  await page.goto("");

  const servicesListItems = await page.getByRole("list");
  await expect(servicesListItems).toBeVisible();

  const servicesItems = await servicesListItems.getByRole("listitem").all();

  for (const item of servicesItems) {
    const text = await item.textContent();
    expect(text).toBeTruthy();
    console.log(text);
  }
});
test("Get by Role practice - button COOKIES", async ({ page }) => {
  await page.goto("");

  const cookiesButton = await page.getByRole("button", { name: "Accept" });
  const cookiesButton2 = await page.getByRole("button", { name: "Decline" });

  await cookiesButton.click();
  await expect(cookiesButton).not.toBeVisible();
  await expect(cookiesButton2).not.toBeVisible();
});
test("Get by role practice - link button", async ({ page }) => {
  await page.goto("");

  await page.getByRole("button", { name: "Accept" }).click();
  await page.getByRole("link", { name: "Go To Feedback Form" }).click();

  const url = page.url();
  expect(url).toContain("FeedBack");
});
