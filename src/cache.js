// env.js

import { readFile, writeFile } from "fs/promises";

export default async function cache(file, value) {
  try {
    let existingContents = await readFile(file, "utf8");

    let envData = {};
    existingContents.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      envData[key.trim()] = value.trim();
    });

    if (envData.hasOwnProperty("ACCESS_TOKEN")) {
      delete envData["ACCESS_TOKEN"];
    }

    envData["ACCESS_TOKEN"] = JSON.stringify({
      token: value,
      ttl: new Date().setHours(3, 30, 0, 0) + 24 * 60 * 60 * 1000,
    });

    let newContents = "";
    for (const key in envData) {
      newContents += `${key} = ${envData[key]}\n`;
    }

    await writeFile(file, newContents);
  } catch (error) {
    throw new Error(`Error caching token: \n${error}`);
  }
}

// Cache [Deprecated]

/*

async function cache(name, value) {
  return new Promise((resolve, reject) => {
    if (process.platform === "win32") {
      exec(`setx ${name} "${value}"`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    } else {
      reject(new Error("Unable to cache access token."));
    }
  });
}

*/
