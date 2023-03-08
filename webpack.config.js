const webpack = require('webpack');

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss")("./tailwind.config.js")],
    },
  },
  webpack: {
    plugins: {
        add: [
            new webpack.ProvidePlugin({
                process: 'process/browser.js',
            })
        ]
    }
  }
};
