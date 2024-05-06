/*!
 * Upauth
 * Authentication management solution for Upstox API.
 * Copyright (c) 2024 to present. All rights reserved.
 *
 * @author Zubin
 * @username (GitHub) losparviero
 * @license AGPL-3.0
 */

import getToken from "./token.js";
import cache from "./cache.js";

export default async function performAuth() {
  try {
    if (process.env.ACCESS_TOKEN) {
      const cachedToken = JSON.parse(process.env.ACCESS_TOKEN);
      if (cachedToken.ttl > Date.now()) {
        return cachedToken.token;
      }
    }
    return await generate();
  } catch (error) {
    console.error(`Failed to complete authentication:\n${error}`);
    process.exit(1);
  }
}

async function generate() {
  const newToken = await getToken();
  if (!newToken) throw new Error("Failed to fetch new token.");
  await cache("./.env", newToken);
  return newToken;
}
