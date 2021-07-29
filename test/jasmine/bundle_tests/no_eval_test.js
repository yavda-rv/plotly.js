var Plotly = require('@lib/index-strict');

var createGraphDiv = require('../assets/create_graph_div');
var destroyGraphDiv = require('../assets/destroy_graph_div');


describe('CSP test strict bundle (disallows the use of eval and similar methods for creating code from strings)', function() {
    var gd;

    beforeEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        gd = createGraphDiv();
    });

    afterEach(function() {
        Plotly.purge(gd);
        destroyGraphDiv();
    });

    it('allows cartesian', function(done) {
        Plotly.newPlot(gd, require('@mocks/12.json'))
        .then(done, done.fail);
    });

    it('allows gl2d', function(done) {
        Plotly.newPlot(gd, require('@mocks/gl2d_12.json'))
        .then(done, done.fail);
    });

    it('allows gl3d', function(done) {
        Plotly.newPlot(gd, require('@mocks/gl3d_bunny.json'))
        .then(done, done.fail);
    });
});
