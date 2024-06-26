# Upauth

Authentication management solution for Upstox's Uplink API.

You only have to implement it in your code, it takes care of caching and reusing the access token.

The token is persisted throughout in the .env till it expires.

### Usage

```js
import performAuth from "upauth";
const accessToken = await performAuth();
```

### Install

```
npm i uxauth
```

<details>
<summary>
Make sure your .env has the following variables and your redirect_uri is set to the one below on Upstox.
</summary>
<br>

CLIENT_ID = "your client_id"

CLIENT_SECRET = "your client_secret"

REDIRECT_URI = http://localhost:3000/redirect

Refer to Upstox documentation for the same.

</details>

### License

AGPL-3.0 ©️ Zubin
