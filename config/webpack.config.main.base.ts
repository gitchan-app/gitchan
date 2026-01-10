import path from 'node:path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import type webpack from 'webpack';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.config.common';
import webpackPaths from './webpack.paths';

const configuration: webpack.Configuration = {
  devtool: 'inline-source-map',

  mode: 'development',

  target: 'electron-main',

  entry: {
    main: path.join(webpackPaths.srcMainPath, 'index.ts'),
    'mascot-preload': path.join(webpackPaths.srcMainPath, 'mascot-preload.ts'),
  },

  output: {
    path: webpackPaths.buildPath,
    filename: '[name].js',
  },

  plugins: [
    // Copy GitChan mascot HTML file
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(webpackPaths.srcMainPath, 'mascot.html'),
          to: 'mascot.html',
        },
      ],
    }),
  ],
};

export default merge(baseConfig, configuration);
