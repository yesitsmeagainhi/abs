#!/usr/bin/env node
/*  Scans  components/blocks  and writes  public/blocks.json
    Run automatically (see “predev / prebuild” further down).            */

const fs   = require("fs");
const path = require("path");

const BLOCK_DIR = path.join(process.cwd(), "components", "blocks");
const OUT_FILE  = path.join(process.cwd(), "public", "blocks.json");

/* ---------- collect every *.tsx / *.jsx / *.ts / *.js block ---------- */
const blocks = fs.readdirSync(BLOCK_DIR)
  .filter(f => /\.(t|j)sx?$/.test(f))              // keep only code files
  .filter(f => !/^index\./i.test(f))               // ignore barrel files
  .map(f   => ({ name: path.parse(f).name }))      //  { "name": "Hero" }
  .sort((a, b) => a.name.localeCompare(b.name));

/* ---------- write pretty-printed JSON ---------- */
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(blocks, null, 2));

console.log(`🧩  ${blocks.length} blocks → ${path.relative(process.cwd(), OUT_FILE)}`);
