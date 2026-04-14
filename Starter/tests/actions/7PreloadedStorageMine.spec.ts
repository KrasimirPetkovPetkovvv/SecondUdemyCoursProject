import { expect, test } from "@playwright/test";

test.use({
  storageState: {
    cookies: [],
    origins: [
      {
        origin: "http://localhost:5005",
        localStorage: [
          {
            name: "name",
            value: "Krasimir",
          },
        ],
      },
    ],
  },
});

test("Preloaded Storage handling - First Example Test", async ({ page }) => {
  await page.goto("Feedbackform.html");
  const name: string = "Krasimir";

  const nameFiled = page.getByRole("textbox", { name: "Name" });

  await expect(nameFiled).toHaveValue(name);
});
test("Preloaded Storage configuration inside the test - Second Example Test", async ({
  page,
}) => {
  await page.goto("Feedbackform.html");

  await page.evaluate(() => {
    localStorage.setItem("email", "Krasimir@petkov.bg");
  });
  await page.reload();

  const emailField = page.getByRole("textbox", { name: "email" });

  await expect(emailField).toHaveValue("Krasimir@petkov.bg");
});
