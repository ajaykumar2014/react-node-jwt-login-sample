const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "./src/")
    ],
    extensions: [".js", ".jsx", ".css", ".jpg", ".png"]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "./src")],
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "build"), // change this
    publicPath: "/",
    filename: "bundle.js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html"
    })
  ],
  devServer: {
    contentBase: "./build",
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 8080
  },
  externals: {
    config: JSON.stringify({
      apiUrl: "http://localhost:3000"
    })
  }
};
