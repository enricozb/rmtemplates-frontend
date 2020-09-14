const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'https://remarkable-templates.herokuapp.com',
      target: "http://0.0.0.0:8000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
