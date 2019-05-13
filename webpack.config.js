module.exports = {
    entry: "./src/vue-charts.js",
    output: {
        path: __dirname+'/dist',
        filename: "vue-charts.js"
    },
    module: {
        loaders: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              // vue-loader options go here
            }
        }
        ]
    }
};
