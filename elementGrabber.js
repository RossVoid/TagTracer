//content script

//Globals
var clickedEl = null;
var nestedLevel1 = "#42f445"; var nestedLevel2 = "#c1f441"; var nestedLevel3 = "#f4d641"; var nestedLevel4 = "#f48541"; var nestedLevel5 = "#f44141";
var nestedThreshold1 = 3; var nestedThreshold2 = 6; var nestedThreshold3 = 9; var nestedThreshold4 = 12; var nestedThreshold5 = 15;

function xpathCollector(contextSelected){
    console.log(contextSelected +" context menu item was selected & Function xpathCollector was invoked The current XPATH in the global clicked element is " + clickedEl);
    var xPathResult = document.evaluate( clickedEl, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
    if (contextSelected == "deleteSelected") {
        $(xPathResult).remove();
        console.log("I have removed the Targeted Node ("+ xPathResult.nodeName +") for you at XPath ("+ clickedEl + ")");
    } else if (contextSelected == "nestSelected") { 
        if (xPathResult != null && xPathResult.tagName != "BODY") {
        var counter = 0;
        var forTheLoop = xPathResult;
        while (forTheLoop.parentElement != null && forTheLoop.tagName != "BODY") {
            forTheLoop = forTheLoop.parentElement;
            counter++;
        }
    }
    if (xPathResult.tagName == "BODY"){
        alert("Hey not to be rude but you selected the Body element/tag.");
    }
    console.log("The "+ xPathResult.tagName +" tag you right clicked is " + counter + " tags nested to the " + forTheLoop.tagName  + " tag!")
   if (counter > 1) { 
        forTheLoop = xPathResult;
        var color;
        while (counter > 1) {
            if (counter >  nestedThreshold1) {
                color =  nestedLevel1;
                if (counter > nestedThreshold2) {
                    color =  nestedLevel2;
                    if (counter > nestedThreshold3) {
                        color =  nestedLevel3;
                        if (counter > nestedThreshold4) {
                            color =  nestedLevel4;
                            if (counter > nestedThreshold5) {
                                color = nestedLevel5;
                            }}}}}
            console.log("Applying boarder-color " + color + " to the element " + forTheLoop.tagName);
            counter = counter - 1;
            $(forTheLoop).css ("border", "2px solid " + color);
            forTheLoop = forTheLoop.parentElement;
        }
    } 
    } else {
        alert("Wow you have incountered a bug with the background scripts messages. Please email mross71690@gmail.com and please provide a screenshot.");
    }
}

function getPathTo(element) {  //Grabs XPath from event target
    if (element.id!=='')
        return "//*[@id='"+element.id+"']";
    
    if (element===document.body)
        return element.tagName.toLowerCase();

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        
        if (sibling===element) return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
        
        if (sibling.nodeType===1 && sibling.tagName === element.tagName) {
            ix++;
        }
    }
}

document.addEventListener("mousedown", function(event){ //Event Listener for mousedown clicks
    if(event.button == 2) {  // if right click
        console.log("right clicked");
        clickedEl = getPathTo(event.target);  //clickedEl is XPath of (click)event target
        console.log("The XPATH for where you right clicked is " + clickedEl);
        
    }
}, true);


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { //Listen for Backend
    if (message.deleteMessage == "deleteSelected") { //Backend Says Context menu was clicked
        xpathCollector("deleteSelected"); //Fire of DOM minipulation Script
    }
    if (message.nestMessage == "nestSelected") { //Backend Says Context menu was clicked
        xpathCollector("nestSelected"); //Fire of DOM minipulation Script
    }
});

