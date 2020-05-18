document.addEventListener("DOMContentLoaded", function() {
    chrome.browserAction.setIcon({path: {"32": "../icons/icon32.png"}});
    document.getElementById("button1").addEventListener("click", login);
    document.getElementById("button2").addEventListener("click", start);
    document.getElementById("button3").addEventListener("click", back);
});

function login(){
    document.getElementById("howto").style.display = "none";
    if (document.getElementById("e").value && document.getElementById("p").value){
        document.getElementById("tryagain").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("choose").style.display = "flex";
        document.getElementById("howto1").style.display = "block";
        document.getElementById("tryagain1").style.display = "none";
        chrome.runtime.sendMessage({e: document.getElementById("e").value, p: document.getElementById("p").value});
    }else{
        document.getElementById("tryagain").style.display = "block";
    }
}

function start(){
    let p1 = document.getElementById("p1").checked;
    let p2 = document.getElementById("p2").checked;
    let p3 = document.getElementById("p3").checked;
    let p4 = document.getElementById("p4").checked;
    let p5 = document.getElementById("p5").checked;
    let p6 = document.getElementById("p6").checked;
    if (p1 || p2 || p3 || p4 || p5 || p6){
        chrome.alarms.clearAll();
        chrome.runtime.sendMessage({p1: p1, p2: p2, p3: p3, p4: p4, p5: p5, p6: p6});
        chrome.browserAction.setPopup({popup: "browser_action/popup1.html"});
        window.location.href="popup1.html";
    }else{
        document.getElementById("howto1").style.display = "none";
        document.getElementById("tryagain1").style.display = "block";
    }
}

function back(){
    document.getElementById("login").style.marginTop = "20px";
    document.getElementById("choose").style.display = "none";
    document.getElementById("login").style.display = "flex";
}


