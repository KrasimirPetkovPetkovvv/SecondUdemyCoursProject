import { test, expect } from "@playwright/test";

test("Form is submitted with required fields", async ({ page }) => {
  let formSubmitted = false;

  page.on("dialog", (dialog) => {
    dialog.accept();
    formSubmitted = true;
  });

  await page.goto("FeedBackForm.html");
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill("John");

  const emailLabel = page.getByLabel("Email");
  await emailLabel.fill("krasimirpetkov@gmail.com");

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill("This is a comment");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();

  expect(formSubmitted).toBeTruthy();
});
test("Form is submitted with required fields - form is cleared after subimt", async ({
  page,
}) => {
  let formSubmitted = false;

  page.on("dialog", (dialog) => {
    dialog.accept();
    formSubmitted = true;
  });

  await page.goto("FeedBackForm.html");
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill("John");

  const emailLabel = page.getByLabel("Email");
  await emailLabel.fill("krasimirpetkov@gmail.com");

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill("This is a comment");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();

  await expect(formSubmitted).toBeTruthy();
  await expect(nameLabel).toBeEmpty();
  await expect(emailLabel).toBeEmpty();
  await expect(commentLabel).toBeEmpty();
  await expect(checkBox).not.toBeChecked();
});
test("Form is NOT submitted without minimal fields", async ({ page }) => {
  let formSubmitted = false;

  page.on("dialog", (dialog) => {
    dialog.accept();
    formSubmitted = true;
  });

  await page.goto("FeedBackForm.html");
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill("John");

  // here we are not filling the email field which is required, so the form should not be submitted and the dialog should not appear
  //const emailLabel = page.getByLabel('Email');
  // await emailLabel.fill('krasimirpetkov@gmail.com');

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill("This is a comment");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();

  expect(formSubmitted).toBeFalsy();
});
test("Form is not submitted if user select NO on the dialog", async ({
  page,
}) => {
  await page.on("dialog", (dialog) => {
    dialog.dismiss();
  });

  await page.goto("FeedBackForm.html");
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill("John");

  const emailLabel = page.getByLabel("Email");
  await emailLabel.fill("krasimirpetkov@gmail.com");

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill("This is a comment");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();

  // since the user dissmissed the dialog , the form should not be submited
  await expect(nameLabel).not.toBeEmpty();
  await expect(nameLabel).toHaveValue("John");
  await expect(emailLabel).not.toBeEmpty();
  await expect(emailLabel).toHaveValue("krasimirpetkov@gmail.com");
  await expect(commentLabel).not.toBeEmpty();
  await expect(commentLabel).toHaveValue("This is a comment");
  await expect(checkBox).toBeChecked();
});
test("Form is completed - clear button clears inputs", async ({ page }) => {
  const dialogPromise = page.waitForEvent("dialog");

  await page.on("dialog", (dialog) => {
    dialog.accept();
  });

  await page.goto("FeedBackForm.html");
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill("John");

  const emailLabel = page.getByLabel("Email");
  await emailLabel.fill("krasimirpetkov@gmail.com");

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill("This is a comment");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  const clearButton = page.getByRole("button", { name: "Clear progress" });
  await clearButton.click();

  await expect((await dialogPromise).message()).toContain("clear the form");
  await expect(nameLabel).toBeEmpty();
  await expect(emailLabel).toBeEmpty();
  await expect(commentLabel).toBeEmpty();
  await expect(checkBox).not.toBeChecked();
});
test("Form is completed - clear button clears memory", async ({ page }) => {
  
    await page.on("dialog", (dialog) => {
        dialog.accept();
        });
    await page.goto("FeedBackForm.html");
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill("John");

  const emailLabel = page.getByLabel("Email");
  await emailLabel.fill("krasimirpetkov@gmail.com");

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill("This is a comment");

  const highlightsLabel = page.getByLabel("Highlights");
  await highlightsLabel.fill("Dance session");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();
  const dialogPromiseOnSubmitButton = page.waitForEvent("dialog");

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();

  

  await page.reload();

  const clearButton = page.getByRole("button", { name: "Clear progress" });
  await clearButton.click();




  await expect(nameLabel).toBeEmpty();
  await expect(emailLabel).toBeEmpty();
  await expect(commentLabel).toBeEmpty();
  await expect(highlightsLabel).toBeEmpty();
  await expect(checkBox).not.toBeChecked();
});
test("Form is completed - clear button does not clear inputs if dialog is rejected  ", async ({
  page,
}) => {

    await page.on("dialog", (dialog) => {
        dialog.dismiss();
        });
    await page.goto("FeedBackForm.html");
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill("John");

  const emailLabel = page.getByLabel("Email");
  await emailLabel.fill("krasimirpetkov@gmail.com");

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill("This is a comment");

  const highlightsLabel = page.getByLabel("Highlights");
  await highlightsLabel.fill("Dance session");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  const clearButton = page.getByRole("button", { name: "Clear progress" });
    await clearButton.click();

  await expect(nameLabel).not.toBeEmpty();
  await expect(emailLabel).not.toBeEmpty();
  await expect(commentLabel).not.toBeEmpty();
  await expect(highlightsLabel).not.toBeEmpty();
  await expect(checkBox).toBeChecked();

});
test("Form is completed - save data button saves data", async ({ page }) => {

    await page.on("dialog", (dialog) => {
        dialog.accept();
        });
    await page.goto("FeedBackForm.html");
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill("John");

  const emailLabel = page.getByLabel("Email");
  await emailLabel.fill("krasimirpetkov@gmail.com");

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill("This is a comment");

  const highlightsLabel = page.getByLabel("Highlights");
  await highlightsLabel.fill("Dance session");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  const saveButton = page.getByRole("button", { name: "Save Progress" });
    await saveButton.click();

    await expect(nameLabel).toHaveValue("John");
    await expect(emailLabel).toHaveValue("krasimirpetkov@gmail.com");
    await expect(commentLabel).toHaveValue("This is a comment");
    await expect(highlightsLabel).toHaveValue("Dance session");
    await expect(checkBox).toBeChecked();
});
