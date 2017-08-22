const webpack = require("webpack")
const path = require("path")

const config = {
  entry: {
    dedupe: "./client/scripts/index.js"
  },
  output: {
    path: path.resolve(path.resolve(__dirname, "static")),
    filename: "js/[name].js",
    publicPath: "/static/",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "client")
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
          plugins: [
            ["transform-react-jsx", { "pragma":"h" }]
          ]
        }
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   options: {
      //     failOnError: true
      //   }
      // },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: "style-loader"
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: "css-loader"
      },
      {
        test: /\.styl$/, exclude: /node_modules/, loader: "postcss-loader",
        options: {
          plugins: () => [
            require("cssnano")({
              zindex: false, urls: false, unused: false, idents: false, reduceIdents: false
            }),
            require("autoprefixer")
          ]
        }
      },
      { test: /\.styl$/, exclude: /node_modules/, loader: "stylus-loader" },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    })
  ]
}

module.exports = config
