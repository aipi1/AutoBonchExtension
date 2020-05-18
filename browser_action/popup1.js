document.addEventListener("DOMContentLoaded", function() {
	chrome.browserAction.setIcon({path: {"32": "../icons/icon32ON.png"}});
    document.getElementById("button4").addEventListener("click", stop);
});

function stop(){
    chrome.browserAction.setPopup({popup: "browser_action/popup.html"});
    window.location.href="popup.html";
    chrome.runtime.sendMessage({stop: true});
}



