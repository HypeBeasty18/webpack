import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";


export function buildLoader(options: BuildOptions): ModuleOptions['rules'] {

  const isDev = options.mode === 'development'
  
  const AssetLoader = {

    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  
  }

  const SvgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
        },
      },
    ],
  }

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      }
    }
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // лоадер чтобы загружал стили в определенное место 
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }

  const tsLoader = {


    test: /\.tsx?$/, //регулярка которая говорит что обрабатывается ts tsx
    // use: 'ts-loader', //название лоудера
    exclude: /node_modules/, // папка которую мы не обрабатываем
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
      }
    ],
  }




  return [
    AssetLoader,
    SvgLoader,
    scssLoader,
    tsLoader,
    
  ]
}