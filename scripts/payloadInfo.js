chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.data);
    setDOMInfo(request.data)
    sendResponse({ack: "Data received"});
    
  });

  const setDOMInfo = info => {
    document.getElementById('total_count').textContent = info.total + 'GB';
    document.getElementById('remains_count').textContent = info.remains + 'GB';
  };