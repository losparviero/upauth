// code.js

import base from "./utils.js";
import params from "./env.js";
import open from "open";
import capture from "./server.js";

export default async function getCode() {
  const endpoint = base + "/login/authorization/dialog";

  const auth = new URLSearchParams({
    response_type: "code",
    client_id: params.client_id,
    redirect_uri: params.redirect_uri,
  });

  const getAuth = `${endpoint}?${auth.toString()}`;

  console.log("Redirecting to Upstox. Please complete authentication.");
  open(getAuth);

  const token = await capture();
  return token;
}

/*
      
  // Pushbullet Capture [Deprecated]

    setTimeout(async () => {
      try {
        const present = Math.floor(Date.now() / 1000);
        const fetchTime = present - 1 * 60;

        const push = `https://api.pushbullet.com/v2/pushes?active=true&modified_after=${fetchTime}`;

        const res = await fetch(push, {
          method: "GET",
          headers: {
            "Access-Token": pushToken,
          },
        });

        const data = await res.json();

        resolve(data.pushes[0].body);
      } catch (error) {
        reject(error);
      }
    }, 15000);
  });

  */
