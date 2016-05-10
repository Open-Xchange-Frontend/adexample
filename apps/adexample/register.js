define('adexample/register', [
    'text!adexample/config.json',
    'text!adexample/adcode.json',
    'io.ox/core/extensions'
], function (data, code, ext) {
    'use strict';

    var selection_init_leaderboard = false;
    var selection_init_skyscraper = false;
    var folder_seletion_leaderboard = false;
    var folder_seletion_skyscraper = false;

    /**
     * Check and update the cooldown data.
     *
     * @param area - {String} the extension point name of the ad area
     * @param options - {Object} use { force: true } to enforce an update
     * @returns {boolean} - true if cooldown was updated -> a refresh should happen
     *
     * TODO: may be, find a better name and add it to core API
     */
    var checkCooldown = (function (config) {
        var cooldown = {};
        return function checkCooldown(area, options) {
            options = _.extend({
                force: false
            }, options);
            if (options.force || !cooldown[area] || cooldown[area] < _.now()) {
                cooldown[area] = (Number(config[area].cooldown) || 0) + _.now();
                return true;
            }
            return false;
        };
    })(json);

    ext.point('io.ox/ads/leaderboard').extend({
        id: 'adexample',
        draw: function () {
            ext.point('io.ox/ads/leaderboard').invoke('reload');
            if (ox.ui.App.getCurrentApp().listView !== undefined) {
                if (selection_init_leaderboard === false) {
                    ox.ui.App.getCurrentApp().listView.on('selection:change', function () {
                        ext.point('io.ox/ads/leaderboard').invoke('reload');
                    });
                    selection_init_leaderboard = true;
                }
            }
            if (folder_seletion_leaderboard === false) {
                ox.ui.App.getCurrentApp().on('folder:change', function () {
                    ext.point('io.ox/ads/leaderboard').invoke('reload');
                });
                folder_seletion_leaderboard = true;
            }
        },
        reload: function () {
            if (checkCooldown('io.ox/ads/leaderboard')) {
                window.googletag.pubads().refresh([window.slot_landscape]);
            }
        }
    });

    ext.point('io.ox/ads/skyscraper').extend({
        id: 'adexample',
        draw: function () {
            ext.point('io.ox/ads/skyscraper').invoke('reload');
            if (ox.ui.App.getCurrentApp().listView && selection_init_skyscraper === false) {
                ox.ui.App.getCurrentApp().listView.on('selection:change', function () {
                    ext.point('io.ox/ads/skyscraper').invoke('reload');
                });
                selection_init_skyscraper = true;
            }
            if (folder_seletion_skyscraper === false) {
                ox.ui.App.getCurrentApp().on('folder:change', function () {
                    ext.point('io.ox/ads/skyscraper').invoke('reload');
                });
                folder_seletion_skyscraper = true;
            }
        },
        reload: function () {
            if (checkCooldown('io.ox/ads/skyscraper')) {
                window.googletag.pubads().refresh([window.slot_skyscraper]);
            }
        }
    });

    ext.point('io.ox/ads/portalBillboard').extend({
        id: 'adexample',
        index: 'first',
        draw: function (baton) {
            if (_.device('smartphone')) {
                baton.preventDefault();
            } else {
                // refresh a little later, because window is not shown, yet
                ox.once('portal:items:render', function () {
                    ext.point('io.ox/ads/portalBillboard').invoke('reload');
                });
            }
        },
        reload: function () {
            if (checkCooldown('io.ox/ads/portalBillboard')) {
                window.googletag.pubads().refresh([window.slot_portal]);
            }
        }
    });

    ext.point('io.ox/ads/mailDetail').extend({
        id: 'adexample',
        draw: function () {
            ext.point('io.ox/ads/mailDetail').invoke('reload');
        },
        reload: function () {
            if (checkCooldown('io.ox/ads/mailDetail')) {
                window.googletag.pubads().refresh([window.slot_mail]);
            }
        }
    });

    ext.point('io.ox/ads/mailSentOverlay').extend({
        id: 'adexample',
        draw: function () {
            ext.point('io.ox/ads/mailSentOverlay').invoke('reload');
        },
        reload: function () {
            if (checkCooldown('io.ox/ads/mailSentOverlay')) {
                window.googletag.pubads().refresh([window.slot_mail_sent]);
            }
        }
    });

    var json = JSON.parse(data);

    return {
        inject: JSON.parse(code).inject,
        config: json
    };
});
