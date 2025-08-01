const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

// ✅ Enforce Bearer token
const AUTH_TOKEN = "test-token-123";

app.post("/stream", (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }

  // Simulate NDJSON streaming
  res.setHeader("Content-Type", "application/x-ndjson");

  const send = (obj) => res.write(JSON.stringify(obj) + "\n");

  send({ type: "message", content: "Hello from LogicLabsAI MCP!" });

  setTimeout(() => {
    send({ type: "action", content: "Working on your request..." });

    setTimeout(() => {
      send({ type: "done", content: "All tasks completed successfully." });
      res.end();
    }, 2000);

  }, 1000);
});

app.listen(PORT, () => {
  console.log(`✅ Streamable MCP server listening on port ${PORT}`);
});