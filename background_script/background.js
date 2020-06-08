let e;
let p;
let tabID;
let tabID1;
let refreshCount = 0;
const newURL = "https://lk.sut.ru/cabinet/";
chrome.alarms.clearAll();
chrome.browserAction.setIcon({path: {"32": "../icons/icon32.png"}});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.stop){
		chrome.browserAction.setIcon({path: {"32": "../icons/icon32.png"}});
		refreshCount = 0;
    	chrome.alarms.clearAll();
    	tabID = null;
    	tabID1 = null;
	}

	if(request.e && request.p){
		e = request.e;
		p = request.p;      
    }

    if(request.closeThis){ 
    	chrome.tabs.remove(sender.tab.id);//close tab after you checked in
    }

    if(request.login){
		chrome.tabs.remove(sender.tab.id);
	  	chrome.tabs.create({ url: newURL }, function(tab){
	  		tabID1 = tab.id;
	  	});
    }
  
	if(request.p1){
		chrome.browserAction.setIcon({path: {"32": "../icons/icon32ON.png"}});
		const h = 16;
		const m = 51;
		let today = new Date();
		const timeNow = today.getTime();
		today.setHours(h);
		today.setMinutes(m);
		let time = today.getTime();
		if (timeNow > time){
			let tommorow = new Date(today);
			tommorow.setDate(today.getDate() + 1);
			time = tommorow.getTime();
		}
		chrome.alarms.create("p1_alarm", {when: time, periodInMinutes: (60*24)});
	}
	if(request.p2){
		chrome.browserAction.setIcon({path: {"32": "../icons/icon32ON.png"}});
		const h = 16;
		const m = 52;
		let today = new Date();
		const timeNow = today.getTime();
		today.setHours(h);
		today.setMinutes(m);
		let time = today.getTime();
		if (timeNow > time){
			let tommorow = new Date(today);
			tommorow.setDate(today.getDate() + 1);
			time = tommorow.getTime();
		}
		chrome.alarms.create("p2_alarm", {when: time, periodInMinutes: (60*24)});
	}
	if(request.p3){
		chrome.browserAction.setIcon({path: {"32": "../icons/icon32ON.png"}});
		const h = 13;
		const m = 0;
		let today = new Date();
		const timeNow = today.getTime();
		today.setHours(h);
		today.setMinutes(m);
		let time = today.getTime();
		if (timeNow > time){
			let tommorow = new Date(today);
			tommorow.setDate(today.getDate() + 1);
			time = tommorow.getTime();
		}
		chrome.alarms.create("p3_alarm", {when: time, periodInMinutes: (60*24)});		
	}
	if(request.p4){
		chrome.browserAction.setIcon({path: {"32": "../icons/icon32ON.png"}});
		const h = 14;
		const m = 45;
		let today = new Date();
		const timeNow = today.getTime();
		today.setHours(h);
		today.setMinutes(m);
		let time = today.getTime();
		if (timeNow > time){
			let tommorow = new Date(today);
			tommorow.setDate(today.getDate() + 1);
			time = tommorow.getTime();
		}
		chrome.alarms.create("p4_alarm", {when: time, periodInMinutes: (60*24)});		
	}
	if(request.p5){
		chrome.browserAction.setIcon({path: {"32": "../icons/icon32ON.png"}});
		const h = 16;
		const m = 30;
		let today = new Date();
		const timeNow = today.getTime();
		today.setHours(h);
		today.setMinutes(m);
		let time = today.getTime();
		if (timeNow > time){
			let tommorow = new Date(today);
			tommorow.setDate(today.getDate() + 1);
			time = tommorow.getTime();
		}
		chrome.alarms.create("p5_alarm", {when: time, periodInMinutes: (60*24)});		
	}
	if(request.p6){
		chrome.browserAction.setIcon({path: {"32": "../icons/icon32ON.png"}});
		const h = 18;
		const m = 5;
		let today = new Date();
		const timeNow = today.getTime();
		today.setHours(h);
		today.setMinutes(m);
		let time = today.getTime();
		if (timeNow > time){
			let tommorow = new Date(today);
			tommorow.setDate(today.getDate() + 1);
			time = tommorow.getTime();
		}
		chrome.alarms.create("p6_alarm", {when: time, periodInMinutes: (60*24)});		
	}
});

chrome.alarms.onAlarm.addListener(function(alarm){
	if(alarm.name == "p1_alarm" || alarm.name == "p2_alarm" || alarm.name == "p3_alarm" || 
	   alarm.name == "p4_alarm" || alarm.name == "p5_alarm" || alarm.name == "p6_alarm"){
		  	chrome.tabs.create({ url: newURL }, function(tab){
		  		tabID = tab.id;
		  	});
  	}else if(alarm.name == "waitNClick"){
  		if(refreshCount < 90){
  			refreshCount++;
  			chrome.tabs.executeScript(tabID1, {file: "content_scripts/script1.js"});
  		}else{
  			chrome.tabs.remove(tabID1);
  		}
  	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(tab.id === tabID && changeInfo.status === 'complete'){
	    chrome.tabs.sendMessage(tab.id, {"e": e, "p": p});
	}
	if(tab.id === tabID1 && changeInfo.status === 'complete'){
	    chrome.alarms.create("waitNClick", {when: Date.now(), periodInMinutes: 1});	
	}
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	if(tabId === tabID1){
    	refreshCount = 0;
    	chrome.alarms.clear("waitNClick");
    	tabID = null;
    	tabID1 = null;
	}
});
