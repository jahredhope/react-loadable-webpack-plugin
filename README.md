[![Build Status](https://travis-ci.org/jahredhope/react-loadable-webpack-plugin.svg?branch=master)](https://travis-ci.org/jahredhope/react-loadable-webpack-plugin)
[![npm](https://img.shields.io/npm/v/@jahredhope/react-loadable-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@jahredhope/react-loadable-webpack-plugin)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# @jahredhope/react-loadable-webpack-plugin

A [webpack](https://github.com/webpack/webpack) loader to create and read [react-loadable](https://github.com/jamiebuilds/react-loadable) compatible manifest files.

[react-loadable](https://github.com/jamiebuilds/react-loadable) contains it’s own packaged webpack loader. However some features are not yet available in the packaged version. Once available this package can be deprecated.

- Supports output to webpack assets
- Supports write to disk

PRs, feature requests and bug reports welcome.

# Install

```bash
$ npm install react-loadable @jahredhope/react-loadable-webpack-plugin
# OR
$ yarn add react-loadable @jahredhope/react-loadable-webpack-plugin
```

# Usage

**webpack.config.js**

```js
const {
  ReactLoadablePlugin
} = require("@jahredhope/react-loadable-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new ReactLoadablePlugin({
      filename: "react-loadable.json"
    })
  ]
};
```

**src/render.js**

```js
const { getBundles } = require("@jahredhope/react-loadable-webpack-plugin");

// ...
function render({ stats }) {
  const modules = [];
  const appHtml = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <App />
    </Loadable.Capture>
  );

  const bundles = getBundles(stats, modules);

  return `<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${scripts.map(src => `<link rel="preload" href=${src} as="script" />`)}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    ${src.map(
      script => `<script src="${src}" type="application/javascript"></script>`
    )}
    <!-- ... -->
  </body>
</html>`;
}
```
