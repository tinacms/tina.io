const withSvgr = require("next-svgr");

module.exports = withSvgr({
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" }
    };
  }
});
