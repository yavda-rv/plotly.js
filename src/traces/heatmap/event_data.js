'use strict';

module.exports = function eventData(out, pt) {
    out.customdata = pt._customdata;
    out.hovertext = pt._hovertext;
    out.text = pt._text;
    return out;
};
