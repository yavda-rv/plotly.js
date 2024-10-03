var fu = require("powerbi-visuals-utils-formattingutils");

var formatters = {}

function getFormatter(formatType, precision) {
    let f = formatters[formatType];
    if (!f) {
        formatters[formatType] = {};
        f = formatters[formatType];
    }
    if (!f[precision]) {
        if (formatType === 'k')
            f[precision] = fu.valueFormatter.create({ format: ",#0.00", value: 1001, precision });
        else if(formatType === 'm')
            f[precision] = fu.valueFormatter.create({ format: ",#0.00", value: 1e6, precision });
        else if(formatType === 'm')
            f[precision] = fu.valueFormatter.create({ format: ",#0.00", value: 1e9, precision });
        else if(formatType === 'm')
            f[precision] = fu.valueFormatter.create({ format: ",#0.00", value: 1e12, precision });
    }
    return formatters[formatType][precision];
}

exports.formatValue = function(value, formatType, format, precision) {
    if (formatType === 'k' || formatType === 'm' || formatType === 'b' || formatType === 't') {
        return getFormatter(formatType, precision).format(value);
    } else if (formatType === 'custom') {
        return fu.formattingService.formattingService.formatValue(value, format);
    }
    return value;
}