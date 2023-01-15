const bytesToGB = (bytes) => (bytes / (1024 ** 3)).toFixed(3).replace(/\.000$/, '');

const  sendDataToPopup = async() => {
  let memoryData = await new Promise((resolve) => {
      chrome.system.memory.getInfo((data) => {
        resolve({remains: bytesToGB(data.availableCapacity), total: bytesToGB(data.capacity)})
      });
  });
  
  chrome.runtime.sendMessage({data: memoryData}, function(response) {
  console.log(response.ack);
});
}

setInterval(sendDataToPopup, 1000)

//chrome.runtime.onConnect.addListener(function(port) {
//  console.log('port??', port)
//  if (port.name === "popup") {
//    port.onMessage.addListener(function(msg) {
//      console.log('msg back from payloadInfo')
//    });
//  }
//});