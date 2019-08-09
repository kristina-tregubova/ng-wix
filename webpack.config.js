import GhPagesWebpackPlugin from 'gh-pages-webpack-plugin';

export default [{
    entry: './styles/app.scss',
    output: {
      // This is necessary for webpack to compile
      // But we never use style-bundle.js
      filename: 'style-bundle.js',
    },
    plugins: [
        new GhPagesWebpackPlugin({
            path: './public',
        })
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'bundle.css',
              },
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ]
        }
      ]
    },
  }];