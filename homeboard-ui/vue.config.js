module.exports = {
  chainWebpack: config => {
    config.module.rule('ts').use('ts-loader')
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
 },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/homeboard/'
    : '/'
}