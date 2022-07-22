const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://blog-app-backend-theksg.herokuapp.com',
      changeOrigin: true,
    })
  );
};