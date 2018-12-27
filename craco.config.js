const reactHotReloadPlugin = require('craco-plugin-react-hot-reload');

// Don't open the browser during development
// process.env.BROWSER = "none";

// plugins
module.exports = {
  plugins: [
    { plugin: reactHotReloadPlugin}
  ]
};
