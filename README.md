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
