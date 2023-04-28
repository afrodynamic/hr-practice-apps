import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { resolve } from 'path';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { Configuration, DefinePlugin, WebpackPluginInstance } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

interface WebpackConfig extends Configuration {
  devServer?: DevServerConfiguration & {
    webSocketServer?: string;
  };
  plugins?: WebpackPluginInstance[];
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: WebpackConfig = {
  mode: isDevelopment ? 'development' : 'production',
  entry: resolve(__dirname, 'client', 'src', 'index.tsx'),
  output: {
    path: resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
              }),
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin(), new ForkTsCheckerWebpackPlugin()] : []),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  devServer: {
    hot: true,
    webSocketServer: 'ws',
    proxy: {
      '**': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};

export default config;
