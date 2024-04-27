// env.js

if (
  !process.env.CLIENT_ID ||
  !process.env.REDIRECT_URI ||
  !process.env.CLIENT_SECRET
) {
  console.error(
    "Missing environment variables. Please set CLIENT_ID, CLIENT_SECRET, REDIRECT_URI. Refer to Upstox documentation."
  );
  process.exit(1);
}

const params = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  grant_type: "authorization_code",
};
// const pushToken = process.env.PUSH_TOKEN;

export default params;
