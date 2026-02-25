#!/usr/bin/env node
/**
 * Kills any process using port 3000 before starting the dev server.
 * Prevents "EADDRINUSE" when a stale Next.js process is still running.
 */
const { execSync } = require("child_process");
const PORT = 3000;

try {
  const pids = execSync(`lsof -ti:${PORT}`, { encoding: "utf8" }).trim();
  if (pids) {
    execSync(`kill -9 ${pids}`, { stdio: "inherit" });
    console.log(`Cleared port ${PORT}`);
  }
} catch {
  // Port is free, nothing to kill
}
