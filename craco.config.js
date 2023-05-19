const webpack = require('webpack');

module.exports = {
  style: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      }
    },
  },
  webpack: {
    plugins: {
        add: [
            new webpack.ProvidePlugin({
                process: 'process/browser.js',
                Buffer: ["buffer", "Buffer"],
            })
        ]
    }
  },
  babel: {
    plugins: [],
  },
}

if (process.env.NODE_ENV === "development") {
  module.exports.babel.plugins.push("react-refresh/babel");
}
