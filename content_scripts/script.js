let e;
let p;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.e && request.p) {
    e = request.e;
    p = request.p;
    login(document);
  }
});

function login(doc){
  if (doc.getElementById("users") && doc.getElementById("parole")){
    doc.getElementById("users").value = e;
    doc.getElementById("parole").value = p;
    login_button = doc.getElementById("logButton");
    login_button.click();
  }
  chrome.runtime.sendMessage({login: true});//sendMessage
}