// printTree.js
const fs = require('fs');
const path = require('path');

function walk(dir, indent = '') {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    console.log(indent + '├── ' + file);
    if (stat.isDirectory()) {
      walk(fullPath, indent + '│   ');
    }
  });
}

walk('.');
