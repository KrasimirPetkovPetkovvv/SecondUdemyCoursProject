import { test, expect, Page } from "@playwright/test";

const someName = "John";
const someEmail = "krasimirpetkov@gmail.com";
const someComment = "This is a comment";
const someHighlight = "Dance session";

test("Form is submitted with required fields", async ({ page }) => {
  let formSubmitted = false;

  page.on("dialog", (dialog) => {
    dialog.accept();
    formSubmitted = true;
  });

  await page.goto("FeedBackForm.html");
  await completeFields(page);
  // const nameLabel = page.getByLabel("Name");
  // await nameLabel.fill("John");

  // const emailLabel = page.getByLabel("Email");
  // await emailLabel.fill("krasimirpetkov@gmail.com");

  // const commentLabel = page.getByLabel("Comment");
  // await commentLabel.fill("This is a comment");

  // const checkBox = page.getByRole("checkbox", { name: "I agree" });
  // await checkBox.check();
  await clickButton(page,'Submit');
  // const submitButton = page.getByRole("button", { name: "Submit" });
  // await submitButton.click();

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
  await completeFields(page);
  // const nameLabel = page.getByLabel("Name");
  // await nameLabel.fill("John");

  // const emailLabel = page.getByLabel("Email");
  // await emailLabel.fill("krasimirpetkov@gmail.com");

  // const commentLabel = page.getByLabel("Comment");
  // await commentLabel.fill("This is a comment");

  // const checkBox = page.getByRole("checkbox", { name: "I agree" });
  // await checkBox.check();

    await clickButton(page,'Submit');
  // const submitButton = page.getByRole("button", { name: "Submit" });
  // await submitButton.click();

  await expect(formSubmitted).toBeTruthy();
  await checkIfItemsEmpty(page);
  // await expect(nameLabel).toBeEmpty();
  // await expect(emailLabel).toBeEmpty();
  // await expect(commentLabel).toBeEmpty();
  // await expect(checkBox).not.toBeChecked();
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

  await clickButton(page,'Submit');
  // const submitButton = page.getByRole("button", { name: "Submit" });
  // await submitButton.click();

  expect(formSubmitted).toBeFalsy();
});
test("Form is not submitted if user select NO on the dialog", async ({
  page,
}) => {
  await page.on("dialog", (dialog) => {
    dialog.dismiss();
  });

  await page.goto("FeedBackForm.html");

  await completeFields(page);
  // const nameLabel = page.getByLabel("Name");
  // await nameLabel.fill("John");

  // const emailLabel = page.getByLabel("Email");
  // await emailLabel.fill("krasimirpetkov@gmail.com");

  // const commentLabel = page.getByLabel("Comment");
  // await commentLabel.fill("This is a comment");

  // const checkBox = page.getByRole("checkbox", { name: "I agree" });
  // await checkBox.check();

    await clickButton(page,'Submit');
  // const submitButton = page.getByRole("button", { name: "Submit" });
  // await submitButton.click();

  // since the user dissmissed the dialog , the form should not be submited
  await checkIfItemsNotEmpty(page);
  // await expect(nameLabel).not.toBeEmpty();
  // await expect(nameLabel).toHaveValue("John");
  // await expect(emailLabel).not.toBeEmpty();
  // await expect(emailLabel).toHaveValue("krasimirpetkov@gmail.com");
  // await expect(commentLabel).not.toBeEmpty();
  // await expect(commentLabel).toHaveValue("This is a comment");
  // await expect(checkBox).toBeChecked();
});
test("Form is completed - clear button clears inputs", async ({ page }) => {
  const dialogPromise = page.waitForEvent("dialog");

  await page.on("dialog", (dialog) => {
    dialog.accept();
  });

  await page.goto("FeedBackForm.html");
  await completeFields(page);
  // const nameLabel = page.getByLabel("Name");
  // await nameLabel.fill("John");

  // const emailLabel = page.getByLabel("Email");
  // await emailLabel.fill("krasimirpetkov@gmail.com");

  // const commentLabel = page.getByLabel("Comment");
  // await commentLabel.fill("This is a comment");

  // const checkBox = page.getByRole("checkbox", { name: "I agree" });
  // await checkBox.check();

  await clickButton(page,'Clear progress');
  // const clearButton = page.getByRole("button", { name: "Clear progress" });
  // await clearButton.click();

  await checkIfItemsEmpty(page);
  await expect((await dialogPromise).message()).toContain("clear the form");
  // await expect(nameLabel).toBeEmpty();
  // await expect(emailLabel).toBeEmpty();
  // await expect(commentLabel).toBeEmpty();
  // await expect(checkBox).not.toBeChecked();
});
test("Form is completed - clear button clears memory", async ({ page }) => {
  await page.on("dialog", (dialog) => {
    dialog.accept();
  });
  await page.goto("FeedBackForm.html");

  await completeFields(page);
  // const nameLabel = page.getByLabel("Name");
  // await nameLabel.fill("John");

  // const emailLabel = page.getByLabel("Email");
  // await emailLabel.fill("krasimirpetkov@gmail.com");

  // const commentLabel = page.getByLabel("Comment");
  // await commentLabel.fill("This is a comment");

  // const highlightsLabel = page.getByLabel("Highlights");
  // await highlightsLabel.fill("Dance session");

  // const checkBox = page.getByRole("checkbox", { name: "I agree" });
  // await checkBox.check();

  await clickButton(page, "Submit");
  // const submitButton = page.getByRole("button", { name: "Submit" });
  // await submitButton.click();

  await page.reload();

  await clickButton(page, "Clear progress");
  // const clearButton = page.getByRole("button", { name: "Clear progress" });
  // await clearButton.click();

  await checkIfItemsEmpty(page);
  // await expect(nameLabel).toBeEmpty();
  // await expect(emailLabel).toBeEmpty();
  // await expect(commentLabel).toBeEmpty();
  // await expect(highlightsLabel).toBeEmpty();
  // await expect(checkBox).not.toBeChecked();
});
test("Form is completed - clear button does not clear inputs if dialog is rejected  ", async ({
  page,
}) => {
  await page.on("dialog", (dialog) => {
    dialog.dismiss();
  });
  await page.goto("FeedBackForm.html");

  await completeFields(page);
  // const nameLabel = page.getByLabel("Name");
  // await nameLabel.fill("John");

  // const emailLabel = page.getByLabel("Email");
  // await emailLabel.fill("krasimirpetkov@gmail.com");

  // const commentLabel = page.getByLabel("Comment");
  // await commentLabel.fill("This is a comment");

  // const highlightsLabel = page.getByLabel("Highlights");
  // await highlightsLabel.fill("Dance session");

  // const checkBox = page.getByRole("checkbox", { name: "I agree" });
  // await checkBox.check();

  await clickButton(page, "Clear progress");

  

  await checkIfItemsNotEmpty(page);
  
});
test("Form is completed - save data button saves data", async ({ page }) => {
  await page.on("dialog", (dialog) => {
    dialog.accept();
  });
  await page.goto("FeedBackForm.html");
  await completeFields(page);
  await clickButton(page, "Save Progress");

  await page.reload();

  await checkIfItemsNotEmpty(page);

  //   const nameLabel = page.getByLabel("Name");
  //   await nameLabel.fill("John");

  //   const emailLabel = page.getByLabel("Email");
  //   await emailLabel.fill("krasimirpetkov@gmail.com");

  //   const commentLabel = page.getByLabel("Comment");
  //   await commentLabel.fill("This is a comment");

  //   const highlightsLabel = page.getByLabel("Highlights");
  //   await highlightsLabel.fill("Dance session");

  //   const checkBox = page.getByRole("checkbox", { name: "I agree" });
  //   await checkBox.check();

//   const saveButton = page.getByRole("button", { name: "Save Progress" });
//   await saveButton.click();

//   await expect(nameLabel).toHaveValue("John");
//   await expect(emailLabel).toHaveValue("krasimirpetkov@gmail.com");
//   await expect(commentLabel).toHaveValue("This is a comment");
//   await expect(highlightsLabel).toHaveValue("Dance session");
//   await expect(checkBox).toBeChecked();
});

async function completeFields(page: Page) {
  const nameLabel = page.getByLabel("Name");
  await nameLabel.fill(someName);

  const emailLabel = page.getByLabel("Email");
  await emailLabel.fill(someEmail);

  const commentLabel = page.getByLabel("Comment");
  await commentLabel.fill(someComment);

  const highlightsLabel = page.getByLabel("Highlights");
  await highlightsLabel.fill(someHighlight);

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();
}
async function clickButton(page:Page,buttonName:'Submit'|'Save Progress'|'Clear progress'){
    await page.getByRole('button',{name: buttonName}).click();
}
async function checkIfItemsNotEmpty(page:Page){
    const nameLabel = page.getByLabel("Name");
    const emailLabel = page.getByLabel("Email");
    const commentLabel = page.getByLabel("Comment");
    const highlightsLabel = page.getByLabel("Highlights");
    const checkBox = page.getByRole("checkbox", { name: "I agree" });

  await expect(nameLabel).not.toBeEmpty();
  await expect(nameLabel).toHaveValue(someName);
  await expect(emailLabel).not.toBeEmpty();
  await expect(emailLabel).toHaveValue(someEmail);
  await expect(commentLabel).not.toBeEmpty();
  await expect(commentLabel).toHaveValue(someComment);
  await expect(highlightsLabel).not.toBeEmpty();
  await expect(highlightsLabel).toHaveValue(someHighlight);
  await expect(checkBox).toBeChecked();
}

async function checkIfItemsEmpty(page: Page) {

    const nameLabel = page.getByLabel('name')

    const emailLabel = page.getByLabel('email')

    const commentLabel = page.getByLabel('comment')

    const highlightsLabel = page.getByLabel('highlights')

    const checkBox = page.getByRole('checkbox', { name: 'I agree' })

    await expect(nameLabel).toBeEmpty()
    await expect(emailLabel).toBeEmpty()
    await expect(commentLabel).toBeEmpty()
    await expect(highlightsLabel).toBeEmpty()
    await expect(checkBox).not.toBeChecked()

}
