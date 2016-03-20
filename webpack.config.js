module.exports = {
    entry: {
        'paging': './lib/index.js'
    },
    output: {
        path: './',
        filename: "[name].js",
        libraryTarget: 'umd',
        library: 'Paging'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};
