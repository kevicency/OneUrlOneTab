'use strict';

var checkForDuplicates = function(url) {
    var query = {
        url: url
    };

    if (query.url && query.url.indexOf('http://localhost') === 0) {
        chrome.tabs.query(query, function (tabs) {
            var head = _.head(tabs);
            var tail = _.tail(tabs);

            chrome.tabs.remove(_.pluck(tail, 'id'));
            chrome.tabs.update(head.id, {selected: true});
            chrome.tabs.reload(head.id, {bypassCache: true});
        });
    }
};

chrome.tabs.onCreated.addListener(function(tab) {
    checkForDuplicates(tab.url);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    checkForDuplicates(changeInfo.url);
});

