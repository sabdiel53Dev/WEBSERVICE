const server = Bun.serve({
  port: 3000,
  fetch(request: Request): Response {
    return new Response("Welcome to Bun!");
  },
});

console.log(`Listening on ${server.url}`);