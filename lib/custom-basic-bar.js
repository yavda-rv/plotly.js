'use strict';

var Plotly = require('./core');

Plotly.register([
    // traces
    require('./bar'),
    // transforms
    require('./groupby'),
]);

module.exports = Plotly;
