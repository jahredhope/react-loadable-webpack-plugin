const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config.js");

jest.setTimeout(10000);

describe("async", () => {
  it("should include an async chunk", done => {
    const compiler = webpack(config);
    compiler.run(async err => {
      expect(err).toBe(null);
      const manifestFile = JSON.parse(
        await fs.readFile(
          path.join(__dirname, "dist/react-loadable-manifest.json"),
          "utf8"
        )
      );
      expect(manifestFile["./async"]).toEqual(expect.any(Array));
      done();
    });
  });
});
