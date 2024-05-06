import { readFile, writeFile } from "fs/promises";

export default async function cache(file, value) {
  try {
    let existingContents = await readFile(file, "utf8");
    let envData = {};
    existingContents.split("\n").forEach((line) => {
      if (line.includes("=")) {
        const [key, val] = line.split("=");
        envData[key.trim()] = val.trim();
      }
    });

    if (envData.hasOwnProperty("ACCESS_TOKEN")) {
      delete envData["ACCESS_TOKEN"];
    }

    envData["ACCESS_TOKEN"] = JSON.stringify({
      token: value,
      ttl: new Date().setHours(3, 30, 0, 0) + 24 * 60 * 60 * 1000,
    });

    let newContents = "";
    Object.entries(envData).forEach(([key, val], index, arr) => {
      newContents += `${key} = ${val}`;
      if (index !== arr.length - 1) {
        newContents += "\n";
      }
    });

    await writeFile(file, newContents);
  } catch (error) {
    throw new Error(`Error caching token: \n${error}`);
  }
}
