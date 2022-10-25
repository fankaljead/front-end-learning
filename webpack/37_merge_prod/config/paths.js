const path = require("path");

const appDir = process.cwd();

console.log(appDir);

const resolveApp = (relativePath) => {
  return path.resolve(appDir, relativePath);
};

module.exports = { resolveApp };
