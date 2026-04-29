import { test, expect } from "@playwright/test";
import {join} from "path";

test("Upload a file ", async ({ page }) => {
  await page.goto("Files.html");

  const fileName1 = "file1.txt";
  const fileName2 = "file2.txt";

  const fileInput = page.locator("#fileInput");

  await fileInput.setInputFiles([
    {
      name: fileName1,
      mimeType: "text/plain",
      buffer: Buffer.from("This is the content of file 1"),
    },
    {
      name: fileName2,
      mimeType: "text/plain",
      buffer: Buffer.from("This is the content of file 2"),
    },
  ]);

  await expect(page.locator('#fileListContainer')).toContainText(fileName1);
    await expect(page.locator('#fileListContainer')).toContainText(fileName2);
});

test("Download a file", async ({ page }) => {
    await page.goto("Files.html");

    const downloadPromise = page.waitForEvent("download");

    await page.getByRole('button',{name: "Download document"}).click();

    const download = await downloadPromise;

    const path = join(__dirname, '..','..','test-results','files', download.suggestedFilename());

    await download.saveAs(path);


});
