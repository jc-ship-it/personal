#!/usr/bin/env node
/**
 * 监听代码改动，自动 pull → add → commit → push
 * 用法: npm run auto-push
 */
const { spawn } = require("child_process");
const path = require("path");
const chokidar = require("chokidar");

const WATCH_GLOB = [
  "app/**/*",
  "components/**/*",
  "lib/**/*",
  "sanity/**/*",
  "content/**/*",
  "public/**/*",
  "scripts/**/*",
  "*.config.*",
];
const DEBOUNCE_MS = 3000;

let timeout = null;

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: "inherit", shell: true });
    proc.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`Exit ${code}`))));
  });
}

async function sync() {
  console.log("\n[auto-push] 检测到改动，开始同步...");
  try {
    await run("git", ["pull", "--rebase", "origin", "main"]);
    await run("git", ["add", "-A"]);
    const status = await new Promise((resolve) => {
      const proc = spawn("git", ["status", "--porcelain"], { stdio: "pipe" });
      let out = "";
      proc.stdout?.on("data", (d) => (out += d));
      proc.on("close", () => resolve(out.trim()));
    });
    if (!status) {
      console.log("[auto-push] 无新改动，跳过提交");
      return;
    }
    const msg = `auto: sync ${new Date().toISOString().slice(0, 19).replace("T", " ")}`;
    await run("git", ["commit", "-m", msg]);
    await run("git", ["push", "origin", "main"]);
    console.log("[auto-push] 已推送到 GitHub\n");
  } catch (err) {
    console.error("[auto-push] 失败:", err.message);
  }
}

function debouncedSync() {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(sync, DEBOUNCE_MS);
}

const watcher = chokidar.watch(WATCH_GLOB, {
  ignored: ["**/node_modules/**", "**/.next/**", "**/.git/**"],
  ignoreInitial: true,
});

watcher.on("change", (p) => {
  console.log(`[auto-push] 检测到: ${path.relative(process.cwd(), p)}`);
  debouncedSync();
});

watcher.on("add", (p) => {
  console.log(`[auto-push] 新增: ${path.relative(process.cwd(), p)}`);
  debouncedSync();
});

watcher.on("unlink", (p) => {
  console.log(`[auto-push] 删除: ${path.relative(process.cwd(), p)}`);
  debouncedSync();
});

console.log("[auto-push] 监听中，有改动将自动 pull → commit → push（防抖 3 秒）\n");
