const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

if (process.env.NODE_ENV === 'test') {
  process.env.API_SERVER_HOST = process.env.API_SERVER_HOST_TEST;
  process.env.API_SERVER_PORT = process.env.API_SERVER_PORT_TEST;
} else {
  process.env.API_SERVER_HOST = process.env.API_SERVER_HOST_PROD;
  process.env.API_SERVER_PORT = process.env.API_SERVER_PORT_PROD;
}


module.exports = {  
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              "presets": ["env", "react"],
              "plugins": ["babel-plugin-transform-class-properties"]
            }
          },
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                 { search: '%%API_SERVER_HOST%%', replace: process.env.API_SERVER_HOST, flags: 'g' },
                 { search: '%%API_SERVER_PORT%%', replace: process.env.API_SERVER_PORT, flags: 'g' }
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      'src/index.html'
    ])
  ]
};
