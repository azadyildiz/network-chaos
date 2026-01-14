#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const targetDir = process.cwd();
const configPath = path.join(targetDir, 'chaos.config.json');

const defaultConfig = {
  enabled: true,
  domains: ["localhost", "127.0.0.1"],
  delay: 1500,
  errorRate: 0.1,
  includes: [],
  excludes: [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".css", ".woff", ".woff2", ".ttf", "node_modules", "favicon.ico"],
  errorMessage: "Network Chaos: Simulated Error"
};

console.log('\n😈 \x1b[1m\x1b[35mNetwork Chaos\x1b[0m');

if (fs.existsSync(configPath)) {
  console.log('⚠️  chaos.config.json already exists. Skipping...');
  process.exit(0);
}

try {
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log('✨ \x1b[32mSuccessfully created chaos.config.json!\x1b[0m');
  console.log('👉 Next: Import \'network-chaos\' in your app.\n');
} catch (err) {
  console.error('❌ Error creating file:', err.message);
  process.exit(1);
}