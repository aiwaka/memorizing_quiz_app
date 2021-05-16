module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/memorizing_quiz_app/'
    : '/',
  outputDir: 'docs/',
  transpileDependencies: [
    'vuetify'
  ],
}
