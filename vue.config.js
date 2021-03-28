module.exports = {
  devServer: {
    host: 'localhost',
    proxy: {
      '/mk': {
        target: 'http://api.vikingship.xyz',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/mk': ''
        }
      }
    }
  }
}
