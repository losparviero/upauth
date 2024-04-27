// token.js

import getCode from "./code.js";
import base from "./utils.js";
import params from "./env.js";

export default async function getToken() {
  params.code = await getCode();

  if (!params.code) {
    throw new Error("Authorization code not found.");
  }

  const body = new URLSearchParams(params);
  const res = await fetch(base + "/login/authorization/token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`Error fetching Upstox auth token: ${res.statusText}`);
  }

  const data = await res.json();
  return data.access_token;
}
