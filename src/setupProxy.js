const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://192.168.10.15:8088/",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "/"
      }
    })
  );
};
