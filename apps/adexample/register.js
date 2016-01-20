define('adexample/register', [
    'text!adexample/config.json',
    'settings!adexample'
], function (data, settings) {
    'use strict';

    var json = JSON.parse(data);

    return {
        inject: settings.get('inject'),
        config: json
    };
});
