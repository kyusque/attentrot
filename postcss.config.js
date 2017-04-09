const plugins = [
    require('autoprefixer'),
]

if (process.env.NODE_ENV === 'production') {
    plugins.push(require('csswring'))
}

module.exports = {
    plugins: plugins
}
