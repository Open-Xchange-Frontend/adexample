define('adexample/register', [
    'text!adexample/config.json',
    'text!adexample/adcode.json',
    'io.ox/core/extensions'
], function (data, code, ext) {
    'use strict';
    
	var cooldown_leaderboard = 0;
	var cooldown_skyscraper = 0;
	var cooldown_portal = 0;
	var cooldown_mail = 0;
	var cooldown_mail_sent = 0;
	var selection_init_leaderboard = false;
	var selection_init_skyscraper = false;
	var folder_seletion_leaderboard = false;
	var folder_seletion_skyscraper = false;
	
	function check_cooldown(check) {
		var t = new Date().getTime();
		if (check < t) {
			return true;
		} 
		return false;
	}
	
	function doit_skyscraper() {
		if (check_cooldown(cooldown_skyscraper)) {
			window.googletag.pubads().refresh([window.slot_skyscraper]);
			var cooldown = 0; 
			if (json['io.ox/ads/skyscraper'].cooldown !== undefined && json['io.ox/ads/skyscraper'].cooldown > 0) {
				cooldown = json['io.ox/ads/skyscraper'].cooldown;
			}
			cooldown_skyscraper = new Date().getTime() + cooldown;
		}
    }
	
	function doit_leaderboard() {
		if (check_cooldown(cooldown_leaderboard)) {
			window.googletag.pubads().refresh([window.slot_landscape]);
			var cooldown = 0;
			if (json['io.ox/ads/leaderboard'].cooldown !== undefined && json['io.ox/ads/leaderboard'].cooldown > 0) {
				cooldown = json['io.ox/ads/leaderboard'].cooldown;
			}
			cooldown_leaderboard = new Date().getTime() + cooldown;
		}
    }
	
	function doit_portal() {
		if (check_cooldown(cooldown_portal)) {
			window.googletag.pubads().refresh([window.slot_portal]);
			var cooldown = 0; 
			if (json['io.ox/ads/portalBillboard'].cooldown !== undefined && json['io.ox/ads/portalBillboard'].cooldown > 0) {
				cooldown = json['io.ox/ads/portalBillboard'].cooldown;
			}
			cooldown_portal = new Date().getTime() + cooldown;
		}
    }

	function doit_mail() {
		if (check_cooldown(cooldown_mail)) {
			window.googletag.pubads().refresh([window.slot_mail]);
			var cooldown = 0; 
			if (json['io.ox/ads/mailDetail'].cooldown !== undefined && json['io.ox/ads/mailDetail'].cooldown > 0) {
				cooldown = json['io.ox/ads/mailDetail'].cooldown;
			}
			cooldown_mail = new Date().getTime() + cooldown;
		}
    }
	
	function doit_mail_sent() {
		if (check_cooldown(cooldown_mail_sent)) {
			window.googletag.pubads().refresh([window.slot_mail_sent]);
			var cooldown = 0; 
			if (json['io.ox/ads/mailSentOverlay'].cooldown !== undefined && json['io.ox/ads/mailSentOverlay'].cooldown > 0) {
				cooldown = json['io.ox/ads/mailSentOverlay'].cooldown;
			}
			cooldown_mail_sent = new Date().getTime() + cooldown;
		}
    }
	
    ext.point('io.ox/ads/leaderboard').extend({
        id: 'adexample',
        draw: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_leaderboard();
				if (ox.ui.App.getCurrentApp().listView !== undefined) {
					if (selection_init_leaderboard === false) {
                        ox.ui.App.getCurrentApp().listView.on('selection:change', doit_leaderboard);
						selection_init_leaderboard = true;
					}
                }
				if (folder_seletion_leaderboard === false) {
				    ox.ui.App.getCurrentApp().on('folder:change', doit_leaderboard);
					folder_seletion_leaderboard = true;
				}
            } else {
                setTimeout(function () {
                    doit_leaderboard();
                }, 5000);
            }
        },
        reload: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_leaderboard();
            } else {
                setTimeout(function () {
                    doit_leaderboard();
                }, 5000);
            }
        }
    });

    ext.point('io.ox/ads/skyscraper').extend({
        id: 'adexample',
        draw: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_skyscraper();
                if (ox.ui.App.getCurrentApp().listView !== undefined) {
				    if (selection_init_skyscraper === false) {
                        ox.ui.App.getCurrentApp().listView.on('selection:change', doit_skyscraper);
						selection_init_skyscraper = true;
					}
                }
				if (folder_seletion_skyscraper === false) {
				    ox.ui.App.getCurrentApp().on('folder:change', doit_skyscraper);
					folder_seletion_skyscraper = true;
				}
            } else {
                setTimeout(function () {
                    doit_skyscraper();
                }, 8000);
            }
        },
        reload: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_skyscraper();
            } else {
                setTimeout(function () {
                    doit_skyscraper();
                }, 8000);
            }
        }
    });

    ext.point('io.ox/ads/portalBillboard').extend({
        id: 'adexample',
        draw: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_portal();
            } else {
                setTimeout(function () {
                    doit_portal();
                }, 8000);
            }
        },
        reload: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_portal();
            } else {
                setTimeout(function () {
                    doit_portal();
                }, 8000);
            }
        }
    });	
	
    ext.point('io.ox/ads/mailDetail').extend({
        id: 'adexample',
        draw: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_mail();
            } else {
                setTimeout(function () {
                    mail();
                }, 8000);
            }
        },
        reload: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_mail();
            } else {
                setTimeout(function () {
                    doit_mail();
                }, 8000);
            }
        }
    });	
	
    ext.point('io.ox/ads/mailSentOverlay').extend({
        id: 'adexample',
        draw: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                doit_mail_sent();
            } else {
                setTimeout(function () {
                    mail();
                }, 8000);
            }
        },
        reload: function () {
            if (window.googletag && window.googletag.pubadsReady) {
                mail();
            } else {
                setTimeout(function () {
                    doit_mail_sent();
                }, 8000);
            }
        }
    });	
	
    var json = JSON.parse(data);

    return {
        inject: JSON.parse(code).inject,
        config: json
    };
});
