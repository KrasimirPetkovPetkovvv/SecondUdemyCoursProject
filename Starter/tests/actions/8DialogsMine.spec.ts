import { test, expect } from "@playwright/test";

test("Saving storege - data is cleared - accept dialog", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await page.goto("FeedBackForm.html");

  const name: string = "Krasimir";

  const nameFiled = await page.getByRole("textbox", { name: "Name" });
  nameFiled.fill(name);
  await page.getByRole("button", { name: "Save Progress" }).click();

  await page.reload();

  await page.getByRole("button", { name: "Clear Progress" }).click();
  await page.reload();
  await expect(nameFiled).toBeEmpty();
});
test("Saving storege - data is not cleared - reject dialog", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    if (dialog.message().includes("clear the form")) {
        await dialog.dismiss();
        return;
        }
        await dialog.accept();
});

  await page.goto("FeedBackForm.html");

  const name: string = "Krasimir";

  const nameFiled = await page.getByRole("textbox", { name: "Name" });
  nameFiled.fill(name);
  await page.getByRole("button", { name: "Save Progress" }).click();

  await page.reload();
  //reject the dialog
  await page.getByRole("button", { name: "Clear Progress" }).click();
  await page.reload();
  await expect(nameFiled).toHaveValue(name);
});