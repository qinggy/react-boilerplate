const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getPath = p => path.resolve(__dirname, p);

const isDev = process.env.NODE_ENV === 'dev';

module.exports = {
  entry: {
    reactBoilerplate: [
      getPath('../src/App.js'),
    ],
  },
  output: {
    path: `${__dirname}/../reactBoilerplate/`,
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    libraryTarget: 'var'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            minimize: true,
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                require('postcss-cssnext'),
              ];
            }
          }
        }]
      }),
      include: [
        getPath('../src'),
        /node_modules/
      ]
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react', 'stage-3'],
        plugins: [
          ['transform-runtime', {
            helpers: true,
            polyfill: true,
            regenerator: true,
            moduleName: 'babel-runtime',
          }],
          [getPath('./plugins/babel-plugin-remove.js'), {
            props: ['examples']
          }]
        ]
      },
      include: [
        getPath('../src'),
      ],
      exclude: [
        /node_modules/,
      ]
    }, {
      test: /\.png$/,
      exclude: /node_modules|assets/,
      use: [{
        loader: 'url-loader',
        options: {
          mimetype: 'image/png',
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          query: {
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          }
        }
      }]
    }, {
      test: /\.(gif|svg)\??.*$/,
      include: [
        getPath('../src/assets/images'),
      ],
      use: [{
        loader: 'file-loader',
        options: {
          name: './resources/images/[name]_common.[ext]',
          publicPath: ' ',
        },
      }],
    }, {
      test: /\.(woff|eot|ttf|svg)\??.*$/,
      include: [
        getPath('../src/assets/fonts'),
      ],
      use: [{
        loader: 'file-loader',
        options: {
          name: './resources/fonts/[name]_common.[ext]',
          publicPath: ' ',
        },
      }],
    }],
  },
  resolve: {
    alias: {
      src: getPath('../src')
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      append: '\n//# sourceMappingURL=http://localhost:8000/[url]',
    }),
    new ExtractTextPlugin({
      filename: 'reactBoilerplate.css',
      allChunks: true,
    }),
  ].filter(_ => _)
};