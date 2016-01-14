define('adexample/register', [
    'settings!adexample'
], function (settings) {
    'use strict';

    return {
        config: settings.get()
    };
});

