import { spawn } from "child_process";
import os from "os";
const commands = {
  "client:make": { command: "yarn", cwd: "client" },
  "client:dev": { command: "yarn", args: ["dev"], cwd: "client" },
  "client:start": { command: "yarn", args: ["start"], cwd: "client" },
  "client:build": { command: "yarn", args: ["build"], cwd: "client" },
  "database:build": { command: "python", args: ["index_1.py"], cwd: "database" }
};
const command = process.argv[2];
if (commands[command]) {
  const { command: cmd, args = [], cwd } = commands[command];
  const child = spawn(cmd, args, { cwd, shell: os.platform() === "win32" ? "cmd.exe" : "/bin/bash" });
  child.stdout.on("data", (data) => console.log(data.toString()));
  child.stderr.on("data", (data) => console.error(data.toString()));
} else console.error("Unknown command");