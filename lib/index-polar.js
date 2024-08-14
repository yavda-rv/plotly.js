'use strict';

var Plotly = require('./core');

Plotly.register([
    // traces
    require('./scatterpolar'),
    require('./barpolar'),

    // transforms
    require('./aggregate'),
    require('./filter'),
    require('./groupby'),
    require('./sort'),

    // components
    require('./calendars'),
]);

module.exports = Plotly;
