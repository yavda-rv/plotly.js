'use strict';

var colorAttrs = require('../../components/color/attributes');
var axesAttrs = require('../cartesian/layout_attributes');
var domainAttrs = require('../domain').attributes;
var extendFlat = require('../../lib').extendFlat;
var overrideAll = require('../../plot_api/edit_types').overrideAll;

var axisLineGridAttr = overrideAll({
    color: axesAttrs.color,
    showline: extendFlat({}, axesAttrs.showline, {dflt: true}),
    linecolor: axesAttrs.linecolor,
    linewidth: axesAttrs.linewidth,
    showgrid: extendFlat({}, axesAttrs.showgrid, {dflt: true}),
    gridcolor: axesAttrs.gridcolor,
    gridwidth: axesAttrs.gridwidth
}, 'plot', 'from-root');

var axisTickAttrs = overrideAll({
    tickmode: axesAttrs.tickmode,
    tickvals: axesAttrs.tickvals,
    ticktext: axesAttrs.ticktext,
    ticks: axesAttrs.ticks,
    ticklen: axesAttrs.ticklen,
    tickwidth: axesAttrs.tickwidth,
    tickcolor: axesAttrs.tickcolor,
    showticklabels: axesAttrs.showticklabels,
    showtickprefix: axesAttrs.showtickprefix,
    tickprefix: axesAttrs.tickprefix,
    showticksuffix: axesAttrs.showticksuffix,
    ticksuffix: axesAttrs.ticksuffix,
    showexponent: axesAttrs.showexponent,
    exponentformat: axesAttrs.exponentformat,
    minexponent: axesAttrs.minexponent,
    separatethousands: axesAttrs.separatethousands,
    tickfont: axesAttrs.tickfont,
    tickangle: axesAttrs.tickangle,
    tickformat: axesAttrs.tickformat,
    tickformatstops: axesAttrs.tickformatstops,
    layer: axesAttrs.layer
}, 'plot', 'from-root');

var realAxisAttrs = {
    visible: extendFlat({}, axesAttrs.visible, {dflt: true}),

    title: {
        // radial title is not gui-editable at the moment,
        // so it needs dflt: '', similar to carpet axes.
        text: extendFlat({}, axesAttrs.title.text, {editType: 'plot', dflt: ''}),
        font: extendFlat({}, axesAttrs.title.font, {editType: 'plot'}),

        // TODO
        // - might need a 'titleside' and even 'titledirection' down the road
        // - what about standoff ??

        editType: 'plot'
    },

    hoverformat: axesAttrs.hoverformat,

    uirevision: {
        valType: 'any',
        editType: 'none',
        description: [
            'Controls persistence of user-driven changes in axis `range`,',
            '`autorange`, `angle`, and `title` if in `editable: true` configuration.',
            'Defaults to `smith<N>.uirevision`.'
        ].join(' ')
    },

    editType: 'calc',
};

extendFlat(
    realAxisAttrs,

    // N.B. realaxis grid lines are circular,
    // but realaxis lines are straight from circle center to outer bound
    axisLineGridAttr,
    axisTickAttrs
);

var imaginaryAxisAttrs = {
    visible: extendFlat({}, axesAttrs.visible, {dflt: true}),

    direction: {
        valType: 'enumerated',
        values: ['counterclockwise', 'clockwise'],
        dflt: 'counterclockwise',
        editType: 'calc',
        description: [
            'Sets the direction corresponding to positive angles.'
        ].join(' ')
    },

    rotation: {
        valType: 'angle',
        editType: 'calc',
        description: [
            'Sets that start position (in degrees) of the angular axis',
            'By default, smith subplots with `direction` set to *counterclockwise*',
            'get a `rotation` of *0*',
            'which corresponds to due East (like what mathematicians prefer).',
            'In turn, smith with `direction` set to *clockwise* get a rotation of *90*',
            'which corresponds to due North (like on a compass),'
        ].join(' ')
    },

    hoverformat: axesAttrs.hoverformat,

    uirevision: {
        valType: 'any',
        editType: 'none',
        description: [
            'Controls persistence of user-driven changes in axis `rotation`.',
            'Defaults to `smith<N>.uirevision`.'
        ].join(' ')
    },

    editType: 'calc'
};

extendFlat(
    imaginaryAxisAttrs,

    // N.B. angular grid lines are straight lines from circle center to outer bound
    // the angular line is circular bounding the smith plot area.
    axisLineGridAttr,

    // N.B. ticksuffix defaults to '°' for angular axes with `thetaunit: 'degrees'`
    axisTickAttrs
);

module.exports = {
    // TODO for x/y/zoom system for paper-based zooming:
    // x: {},
    // y: {},
    // zoom: {},

    domain: domainAttrs({name: 'smith', editType: 'plot'}),

    bgcolor: {
        valType: 'color',
        editType: 'plot',
        dflt: colorAttrs.background,
        description: 'Set the background color of the subplot'
    },

    realaxis: realAxisAttrs,
    imaginaryaxis: imaginaryAxisAttrs,

    uirevision: {
        valType: 'any',
        editType: 'none',
        description: [
            'Controls persistence of user-driven changes in axis attributes,',
            'if not overridden in the individual axes.',
            'Defaults to `layout.uirevision`.'
        ].join(' ')
    },

    editType: 'calc'
};
