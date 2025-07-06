import fs from 'fs';
import path from 'path';

function getFileTree(dirPath: string, indent: string = ''): void {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    console.log(`${indent}- ${item}`);

    if (stats.isDirectory()) {
      getFileTree(fullPath, indent + '  ');
    }
  }
}

// Call with root folder
getFileTree('./');  // or your project path
