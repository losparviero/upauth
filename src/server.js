import http from "http";
import { parse } from "url";

export default async function capture() {
  let code;

  const server = http.createServer((req, res) => {
    const { pathname } = parse(req.url, true);
    if (pathname === "/redirect") {
      code = parse(req.url, true).query.code;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <html>
        <head>
            <title>Redirect</title>
            <script>
               window.close();
            </script>
        </head>
        <body>
            <p>Access code received! You can close this window.</p>
        </body>
        </html>
      `);
      server.close(() => {});
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  });

  server.on("error", (err) => {
    console.error("Server error:", err);
  });

  server.listen(3000);

  while (!code) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return code;
}
