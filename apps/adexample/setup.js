define('adexample/setup', ['less!adexample/style'], function () {
    'use strict';

    var googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];

    googletag.cmd.push(function () {
        googletag.pubads().enableAsyncRendering();
        googletag.pubads().disableInitialLoad();

        window.slot_landscape = googletag.defineSlot('/16237186/appsuiteads', [[320, 50], [728, 90], [468, 60]], 'div-gpt-ad-1461237922774-3')
            .addService(googletag.pubads());
        var mapping_landscape = googletag.sizeMapping()
            .addSize([1024, 768], [728, 90])
            .addSize([0, 0], [320, 50])
            .build();
        window.slot_landscape.defineSizeMapping(mapping_landscape);

        window.slot_skyscraper = googletag.defineSlot('/16237186/verticalads', [
                [160, 600],
                [300, 250],
                [240, 400],
                [120, 600],
                [250, 250],
                [300, 1000]
            ], 'div-gpt-ad-1461237922774-5')
            .addService(googletag.pubads());

        window.slot_portal = googletag.defineSlot('/16237186/BillboardAd_800x250', [800, 250], 'div-gpt-ad-1461237922774-0')
            .addService(googletag.pubads());
        var mapping_portal = googletag.sizeMapping()
            .addSize([1024, 768], [800, 250])
            .addSize([0, 0], [320, 50])
            .build();
        window.slot_portal.defineSizeMapping(mapping_portal);

        window.slot_mail = googletag.defineSlot('/16237186/Email_Leaderboard_728x90', [728, 90], 'div-gpt-ad-1461237922774-2')
            .addService(googletag.pubads());
        var mapping_mail = googletag.sizeMapping()
            .addSize([1024, 768], [728, 90])
            .addSize([0, 0], [320, 50])
            .build();
        window.slot_mail.defineSizeMapping(mapping_mail);

        window.slot_mail_sent = googletag.defineSlot('/16237186/Mail_send_ad_640x480', [640, 480], 'div-gpt-ad-1461237922774-4')
            .addService(googletag.pubads());

        window.slot_drive = googletag.defineSlot('/16237186/OX_MR', [300, 250], 'div-gpt-ad-1461237922774-1')
            .addService(googletag.pubads());

        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
    });
});
