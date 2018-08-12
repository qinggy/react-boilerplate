const webpack = require('webpack');
const path = require('path');
const {
  port,
  version,
} = require('../package.json');
const WebpackDevServer = require('webpack-dev-server');
const getPath = p => path.resolve(__dirname, p);

const config = {
  mode: 'development',
  devtool: "eval-source-map",
  entry: {
    bundle: [
      /**
       * symbol-polyfill is required to be before react-hot-loader since React 15.4
       * since React and React-dom use separate symbol polyfill.
       * A shared symbol polyfill need to be provided first, otherwise will cause issue in ES6-
       * environment, such as IE 11.
       * See: [http://stackoverflow.com/questions/40897966/objects-are-not-valid-as-a-react-child-in-internet-explorer-11-for-react-15-4-1]
       */
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/dev-server',
      getPath('../src/main.js'),
    ]
  },
  output: {
    publicPath: './',
    path: `${__dirname}/../dist/`,
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'process.env.version': JSON.stringify(version),
    }),
  ],
};

const devServer = {
  historyApiFallback: true,
  hot: true,
  inline: true,
  contentBase: './dist',
  stats: {
    assets: false,
    chunkModules: false,
    children: false,
    colors: true,
    chunks: false,
    errors: true,
    errorDetails: true,
  },
  port: +port,
  noInfo: false,
};

const server = new WebpackDevServer(webpack(config), devServer)
  .listen(port, 'localhost', (err) => {
    if (err) {
      console.log('Webpack Dev Server encounters error: ', err);
    }

    console.log([
      'Compilling...',
      `Bundle will be servered on http://localhost:${port}`,
    ].join('\n'));

    console.log('\nBrowser will open automatically after compilation, please wait...\n');
  });

module.exports = server;