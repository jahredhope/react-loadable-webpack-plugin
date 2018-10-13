const fs = require("fs");
const MemoryFs = require("memory-fs");
const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config.js");

jest.setTimeout(10000);

describe("in-memory", () => {
  it("should include an async chunk", done => {
    const compiler = webpack(config);
    const memoryFileSystem = new MemoryFs();
    compiler.outputFileSystem = memoryFileSystem;
    compiler.run(async err => {
      expect(err).toBe(null);
      const manifestFileLocation = path.join(
        __dirname,
        "dist/react-loadable-manifest.json"
      );
      const manifestFile = JSON.parse(
        memoryFileSystem.readFileSync(manifestFileLocation, "utf8")
      );
      expect(manifestFile["./async"]).toEqual(expect.any(Array));
      const diskManifestFileExists = fs.existsSync(manifestFileLocation);
      expect(diskManifestFileExists).toBeFalsy();
      done();
    });
  });
});
