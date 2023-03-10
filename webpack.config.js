const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    port: 1234,
    compress: true,
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', 'css'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
      assets: path.resolve(__dirname, 'src/assets'),
      core: path.resolve(__dirname, 'src/core'),
      components: path.resolve(__dirname, 'src/components'),
      pages: path.resolve(__dirname, 'src/pages'),
      utils: path.resolve(__dirname, 'src/utils'),
      controllers: path.resolve(__dirname, 'src/controllers'),
      api: path.resolve(__dirname, 'src/api'),
      HOC: path.resolve(__dirname, 'src/HOC'),
      configs: path.resolve(__dirname, 'src/configs'),
      styles: path.resolve(__dirname, 'src/styles'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      router: path.resolve(__dirname, 'src/router'),
      store: path.resolve(__dirname, 'src/store'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }],
    }),
  ],
};
