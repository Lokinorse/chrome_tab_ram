
const getCurrentTabUsage = () => {
  const currentTabUsage = performance.memory.usedJSHeapSize / (1024 * 1024) // mb
  chrome.runtime.sendMessage({data: currentTabUsage, subject: 'current_tab'}, function(response) {
  });
}

const scriptForPopup = () => {
  // берём табу и запускаем скрипт на ней, прям на вкладке
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0];
    console.log('tabs', tabs)
    chrome.scripting.executeScript({
      target: {tabId: currentTab.id, allFrames: true},
      function: getCurrentTabUsage
    });
  })
}

var loaded = false
 document.addEventListener("DOMContentLoaded", function () {
   loaded = true
 });
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //if(loaded && request.subject === 'current_tab'){
    //  scriptForPopup()
    //}
    //console.log('currentTabUsage', currentTabUsage)
    if(request.subject === 'total_usage'){
      setDOMInfo(request.data)
    }
    sendResponse({ack: "Data received"});
    
  });

  const setDOMInfo = info => {
    console.log('setDonInfo')
    document.getElementById('total_count').textContent = info.total + 'GB';
    document.getElementById('remains_count').textContent = info.remains + 'GB';
    //scriptForPopup()
  };
