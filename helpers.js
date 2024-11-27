const fs = require('fs-extra');
const path = require('path');

const analyzeDir = (dirPath, excludeFiles) => {
  const items = fs.readdirSync(dirPath).filter((item) => !excludeFiles.includes(item));
  return items.map((item) => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);
    const isDir = stats.isDirectory();
    let functionsAndClasses = null;

    if (!isDir && /\.(js|php|py|java)$/.test(item)) {
      functionsAndClasses = extractFunctionsAndClasses(fullPath);
    }

    return {
      name: item,
      isDirectory: isDir,
      size: stats.size,
      modified: stats.mtime.toLocaleString(),
      functionsAndClasses: functionsAndClasses,
    };
  });
};

const detectTechStack = () => {
  const files = fs.readdirSync('./');
  const techStack = [];
  if (files.includes('package.json')) techStack.push('Node.js');
  if (files.includes('composer.json')) techStack.push('PHP');
  if (files.includes('requirements.txt')) techStack.push('Python');
  if (files.includes('Gemfile')) techStack.push('Ruby');
  if (files.includes('pom.xml')) techStack.push('Java');
  return [...new Set(techStack)];
};

const detectDependencies = () => {
  const dependencies = [];

  if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    if (packageJson.dependencies) {
      Object.entries(packageJson.dependencies).forEach(([lib, version]) => {
        dependencies.push({ type: 'Node.js', lib, version });
      });
    }
  }

  if (fs.existsSync('composer.json')) {
    const composerJson = JSON.parse(fs.readFileSync('composer.json', 'utf-8'));
    if (composerJson.require) {
      Object.entries(composerJson.require).forEach(([lib, version]) => {
        dependencies.push({ type: 'PHP', lib, version });
      });
    }
  }

  if (fs.existsSync('requirements.txt')) {
    const requirements = fs.readFileSync('requirements.txt', 'utf-8').split('\n');
    requirements.forEach((line) => {
      const [lib, version] = line.split('==');
      if (lib) {
        dependencies.push({ type: 'Python', lib: lib.trim(), version: version ? version.trim() : 'Unknown' });
      }
    });
  }

  return dependencies;
};

const extractFunctionsAndClasses = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf-8');
  const functionRegex = /function\s+(\w+)/g;
  const classRegex = /class\s+(\w+)/g;
  const functions = [];
  const classes = [];
  let match;
  while ((match = functionRegex.exec(code))) functions.push(match[1]);
  while ((match = classRegex.exec(code))) classes.push(match[1]);
  return { functions, classes };
};

module.exports = {
  analyzeDir,
  detectTechStack,
  detectDependencies,
  extractFunctionsAndClasses,
};