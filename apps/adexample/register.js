define('adexample/register', [
    'text!adexample/config.json',
    'text!adexample/adcode.json',
    'io.ox/core/extensions'
], function (data, code, ext) {
    'use strict';

    ext.point('io.ox/ads/leaderboard').extend({
        id: 'adexample',
        draw: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                window.googletag.pubads().refresh([window.slot_landscape]);
            } else {
                setTimeout(function () {
                    window.injectLandscape(true);
                }, 3000);
            }
        },
        reload: function () {
            window.googletag.pubads().refresh([window.slot_landscape]);
        }
    });

    ext.point('io.ox/ads/skyscraper').extend({
        id: 'adexample',
        draw: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                window.googletag.pubads().refresh([window.slot_skyscraper]);
            } else {
                setTimeout(function () {
                    window.injectSkyscraper(true);
                }, 3000);
            }
        },
        reload: function () {
            window.googletag.pubads().refresh([window.slot_skyscraper]);
        }
    });

    var json = JSON.parse(data);

    return {
        inject: JSON.parse(code).inject,
        config: json
    };
});
