// Next.js 10.1.2's compiled postcss-scss does `require('postcss/lib/parser')`.
// postcss@8.1.7's package.json "exports" only whitelists the "." entry point
// (plus a legacy trailing-slash wildcard Node stopped honoring), so that deep
// require throws ERR_PACKAGE_PATH_NOT_EXPORTED on modern Node. This patches
// the installed copy in place instead of bumping its version, so the
// separate postcss@7 copies nested under cssnano-simple/cssnano-preset-simple
// (which need the old `postcss.plugin()` API removed in postcss 8) are left
// completely untouched.
const fs = require("fs");
const path = require("path");

const pkgPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "postcss",
  "package.json"
);

if (!fs.existsSync(pkgPath)) {
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

if (pkg.exports && !pkg.exports["./lib/*"]) {
  delete pkg.exports["./"];
  pkg.exports["./lib/*"] = "./lib/*.js";
  pkg.exports["./package.json"] = "./package.json";
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}
