const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/stream', async (req, res) => {
  res.setHeader('Content-Type', 'application/x-ndjson');
  res.setHeader('Transfer-Encoding', 'chunked');

  const messages = [
    { type: "message", content: "Hello from LogicLabsAI MCP!" },
    { type: "action", content: "Working on your request..." },
    { type: "done", content: "All tasks completed successfully." }
  ];

  for (const msg of messages) {
    res.write(JSON.stringify(msg) + "\n");
    await new Promise(r => setTimeout(r, 1000)); // Simulate delay
  }

  res.end();
});

app.listen(PORT, () => {
  console.log(`✅ Streamable MCP server listening on port ${PORT}`);
});
