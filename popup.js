chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
});

// chrome.runtime.onMessage.addListener(function(message) {
//     console.log("Recieved message: " + message);
//     $("p").text("hej");
// });

chrome.runtime.onMessage.addListener(function(msg) {
    alert("Ditt betygssnitt: " + msg);
});


// // Inject the payload.js script into the current tab after the popout has loaded
// window.addEventListener('load', function (evt) {
// 	chrome.runtime.getBackgroundPage().chrome.tabs.executeScript(null, {
// 		file: 'scraper.js'
// 	});;
//     /*$(document).ready(function() {
//         console.log($("ladok-avslutad-kurs strong:contains('Betyg')")); // .each()
//     })*/
// });

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});

window.onload = function() {
    if (window.jQuery) {
        $(document).ready(function(){

        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});