const glob = require("glob");
const WebpackBuilder = require('dev/webpack/builder');

module.exports = (new WebpackBuilder(__dirname))
    .addEntry('test', glob.sync('./src/**/*.test.ts'))
    .setOutput('bundle.js', '/out')
    .addTypeScript()
    .buildForDevelopment('Nabu');
