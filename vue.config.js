module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/variables.scss";',
      },
    },
  },
  configureWebpack: (config) => {
    const resultConfig = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            use: [
              'vue-svg-loader',
            ],
          },
        ],
      },
    };
    return resultConfig;
  },
};
