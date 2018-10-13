const path = require("path");
const { ReactLoadablePlugin } = require("../../");

// const webpack = require("webpack");
module.exports = {
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  entry: path.resolve(__dirname, "src/index.js"),
  plugins: [
    new ReactLoadablePlugin({ filename: "react-loadable-manifest.json" })
  ]
};
