module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/variables.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete('svg');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader',
        },
      ],
    },
  },
};
