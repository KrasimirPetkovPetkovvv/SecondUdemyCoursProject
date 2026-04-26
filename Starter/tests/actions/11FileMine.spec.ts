import { test, expect } from "@playwright/test";
import path from "path";

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
});
