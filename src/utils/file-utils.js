import fs from "fs";

export const readAndParseFile = (filePath) => {
  let jsonData;
  try {
    const data = fs.readFileSync(filePath, "utf8");
    jsonData = JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
  }
  return jsonData;
}