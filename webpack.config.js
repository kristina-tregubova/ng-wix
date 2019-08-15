const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = [{
    devServer: {
        writeToDisk: true
      },
    entry: {
        "css": './src/app.scss', 
        "a": './src/app.js',
        "b": './src/app/auth/auth.js',
        "c": './src/app/player-profile/player-profile.js',
        "d": './src/app/players-search/players-search.js',
        "e": './src/app/profile-settings/profile-settings.js',
        "f": './src/app/tourno-creation/tourno-creation.js',
        "g": './src/app/tourno-profile/tourno-profile.js',
        "h": './src/app/tournos-search/tournos-search.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
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
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules']
                        }
                    },
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                presets: ['@babel/preset-env'],
                },
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: "file-loader?name=img/[name].[ext]",
            }
        ],
    },
  }];