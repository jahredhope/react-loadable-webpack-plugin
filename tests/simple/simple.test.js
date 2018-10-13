const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config.js");

jest.setTimeout(10000);

describe("simple", () => {
  it("compiles", done => {
    const compiler = webpack(config);
    compiler.run(async err => {
      expect(err).toBe(null);
      const manifestFileExists = fs.existsSync(
        path.join(__dirname, "dist/react-loadable-manifest.json")
      );
      expect(manifestFileExists).toBe(true);
      done();
    });
  });
});
