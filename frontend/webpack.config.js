const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            test: /\.html(\?.*)?$/i,
                uglifyOptions:{
                    output:{
                        comments: false,
                    },
                },
        }),
      ],
    },
  };