document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("button4").addEventListener("click", stop);
});

function stop(){
    chrome.browserAction.setPopup({popup: "browser_action/popup.html"});
    window.location.href="popup.html";
    chrome.runtime.sendMessage({stop: true});
}



