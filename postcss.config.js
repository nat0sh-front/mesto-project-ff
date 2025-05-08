const autoprexfixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        autoprexfixer,
        cssnano({
            preset: 'default',
        }),
    ]
}