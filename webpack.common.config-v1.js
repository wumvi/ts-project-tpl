const path = require('path');
const webpack = require('webpack');

const fs = require('fs');
let tsconfigRaw = fs.readFileSync('tsconfig-autogen.json');
let tsconfigJson = JSON.parse(tsconfigRaw);
const alias = {};
for (const key of Object.keys(tsconfigJson.compilerOptions.paths)) {
    const name = key.replace(/\/\*$/, '');
    alias[name] = path.resolve(
        tsconfigJson.compilerOptions.paths[key][0].replace(/\*$/, ''));
}

module.exports = (mode) => {
    return {
        mode: mode,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['cache-loader', 'babel-loader'],
                },
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {allowTsInNodeModules: true},
                    },
                    // exclude: /node_modules/,
                },
                {
                    test: /[^.]+-html\.svg$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'svg-react-loader',
                        options: {
                            tag: 'svg',
                            name: 'MyIcon',
                        },
                    },
                },
                {
                    test: /[^.]+-css\.(png|jpg|svg|jpeg)$/,
                    type: 'asset/inline',
                },
            ],
        },
        resolve: {
            alias: alias,
            symlinks: false,
            extensions: ['.ts', '.tsx', '.js', '.json', '.svg'],
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(mode === 'development'),
            }),
        ],
    };
};