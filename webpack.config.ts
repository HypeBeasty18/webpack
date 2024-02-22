
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


type Mode = 'production' | 'development'

interface EnvVariables {
  mode: Mode
  port: number
}



export default (env: EnvVariables) => {

  const isDev = env.mode === 'development'
  const isProd = env.mode === 'production'
  // переменные для определения mode

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    //наши входные данные (__dirname это тек папка)

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js', //name название папки  contenthash это хэш папки чтобы при каждом бандле она называлась по другому
      //наши выходные данные 
      clean: true
      //при каждой сборке папка build будет очищаться
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
      //для импорта в бандл содержимое файла в public index.html
      new webpack.ProgressPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/, //регулярка которая говорит что обрабатывается ts tsx
          use: 'ts-loader', //название лоудера
          exclude: /node_modules/, // папка которую мы не обрабатываем
        },
      ],
      //лоудеры для файлов
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    // указываем расширения которые необходимо обработать

    devtool: !!isDev && 'inline-source-map',
    // карта исходного кода 
    devServer: !!isDev && {
      port: env.port ?? 3000,
      open: true
    }
    //настройки для веб-сервера 
  }


  return config


}