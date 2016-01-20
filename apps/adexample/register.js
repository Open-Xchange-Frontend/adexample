define('adexample/register', [
    'text!adexample/config.json',
    'text!adexample/adcode.json'
], function (data, code) {
    'use strict';

    var json = JSON.parse(data);

    return {
        inject: JSON.parse(code).inject,
        config: json
    };
});
