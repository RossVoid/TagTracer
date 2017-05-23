chrome.contextMenus.create(
    { title: "Delete targeted Element", onclick: deleteMessage, contexts: ["all"] });

chrome.contextMenus.create(
    { title: "Check Nesting for targeted Element", onclick: nestMessage, contexts: ["all"] });

function deleteMessage(info, tab){
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

    //Add all you functional Logic here
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "deleteMessage": "deleteSelected"
        });
    });
}

function nestMessage(info, tab){
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

    //Add all you functional Logic here
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "nestMessage": "nestSelected"
        });
    });
}
