const bytesToGB = (bytes) => (bytes / (1024 ** 3)).toFixed(3).replace(/\.000$/, '');
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));
// data about overall ram usage
const  sendDataToPopup = async() => {
  let memoryData = await new Promise((resolve) => {
      chrome.system.memory.getInfo((data) => {
        resolve({remains: bytesToGB(data.availableCapacity), total: bytesToGB(data.capacity)})
      });
  });
  
  chrome.runtime.sendMessage({data: memoryData, subject: 'total_usage'}, function(response) {
  });
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(loaded && request.subject === 'current_tab'){
      console.log('revievned in background', request)
    }
    sendResponse({ack: "Data received"});
    
  });
setInterval(sendDataToPopup, 1000)
