const path = require('path');
const webpack = require('webpack');

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin('common'),
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}


module.exports = {
    entry: {
        new: './tmp/page/new',
        login: './tmp/page/login',
        record: './tmp/page/record',
        calendar: './tmp/page/calendar',
    },
    output: {
        path: path.join(__dirname, 'static'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', {modules: false}], 'stage-3'],
                        plugins: ['transform-runtime'],
                    }
                }
            }
        ]
    },

    plugins: plugins,
}
