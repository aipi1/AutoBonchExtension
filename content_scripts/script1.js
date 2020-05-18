press();

function press(){
  if (document.getElementById("menu_li_807"))
  {
    schedule_button = document.getElementById("menu_li_807");
    schedule_button.click();
  }

  let observer = new MutationObserver(function(mutationList) {
    aTags = document.getElementsByTagName("a");
    const searchText = "Начать занятие";
    let found;
    for (let i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent == searchText) {
            found = aTags[i];
            break;
        }
    }
    if (found){                
        check_button = found;
        check_button.click();
        chrome.runtime.sendMessage({closeThis: true});//close tab
        observer.disconnect();
    }
    else{
      observer.disconnect();
    }
  });
  observer.observe(document, {childList: true, subtree: true});
}