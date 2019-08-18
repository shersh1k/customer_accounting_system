const paths = require('react-scripts/config/paths');
const path = require('path');

paths.appBuild = path.resolve(paths.appPath, '../build/public');

module.exports = paths;