module.exports = {
  entry: "./client/app.js",
  output: {
    path: "public",
    filename: "dist.js"
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.(png|woff|eot|ttf|jpg|gif|svg|woff2)$/,
        loader: "file"
      }
    ]
  }
}
