import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import CopyPlugin from 'copy-webpack-plugin'

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {

  const isDev = options.mode === 'development'
  const isProd = options.mode === 'production'

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: options.paths.html, favicon: path.resolve(options.paths.public, 'favicon.ico') }),
    new DefinePlugin({
      __PLATFORM: JSON.stringify(options.platform)
    }),

  ]

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin())
    plugins.push(new ForkTsCheckerWebpackPlugin())
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    })),
    plugins.push(new CopyPlugin({
      patterns: [
          { from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales') },
      ],
  }),)

  }

  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}