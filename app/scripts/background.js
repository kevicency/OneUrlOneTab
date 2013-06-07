'use strict';

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
    var query = {
        url: tabId.url
    };

    if (query.url.indexOf('http://localhost') === 0) {
        chrome.tabs.query(query, function (tabs) {
            var head = _.head(tabs);
            var tail = _.tail(tabs);

            chrome.tabs.remove(_.pluck(tail, 'id'));
            chrome.tabs.update(head.id, {selected: true});
            chrome.tabs.reload(head.id, {bypassCache: true});
        });
    }
});

