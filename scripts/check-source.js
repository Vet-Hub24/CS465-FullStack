const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const roots = ['app.js', 'bin', 'app_api', 'app_server', 'scripts'];
const files = [];

function visit(target) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) visit(path.join(target, entry));
  } else if (target.endsWith('.js') && !target.endsWith('check-source.js')) {
    files.push(target);
  }
}

for (const root of roots) {
  if (fs.existsSync(root)) visit(root);
}

let failed = false;
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) failed = true;
}

if (failed) process.exit(1);
console.log(`Syntax check passed for ${files.length} JavaScript files.`);
