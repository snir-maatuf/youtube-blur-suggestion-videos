// Set "hide" as default when the extension is installed or enabled.
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ hide: true }, function () {
        console.log("Hide YT-Video is on");
    });
});


// When tab is updated, the code send the "current tab" to content.js
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) { // when the tab ended to load and tab is youtube web then execute
        chrome.tabs.sendMessage(tab.id, {command: "init"}, function(response) {
            if (response && response.result) {
                console.log(response.result);
            }
        });
    }
});

