import webpack from 'webpack';
import { BuildDevServer } from './buildDevServer';
import { buildLoader } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolver } from './buildResolver';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions):webpack.Configuration {


  const isDev = options.mode === 'development'

  return {
    
    mode: options.mode ,
    entry: options.paths.entry,
    //наши входные данные (__dirname это тек папка)

    output: {
      path: options.paths.output,
      filename: '[name].[contenthash].js', //name название папки  contenthash это хэш папки чтобы при каждом бандле она называлась по другому
      //наши выходные данные 
      clean: true
      //при каждой сборке папка build будет очищаться
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoader(options)
      //лоудеры для файлов
    },
    resolve: buildResolver(options),
    // указываем расширения которые необходимо обработать

    devtool: !!isDev && 'inline-source-map',
    // карта исходного кода 
    devServer: !!isDev && BuildDevServer(options)
    //настройки для веб-сервера 
  }
}