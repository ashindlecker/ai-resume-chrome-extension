chrome.storage.local.clear()

function sendCheckJobEvent(tabId: number) {
  chrome.tabs.sendMessage(tabId, { type: 'check_job_details' }, (success) => {
    if (!success)
      return
    chrome.action.setBadgeBackgroundColor({ color: '#76ebaf' })
    chrome.action.setBadgeText({ text: '!' })
  })
}


chrome.tabs.onActivated.addListener((activeInfo) => {
  //sendCheckJobEvent(activeInfo.tabId)
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.active)
    return;
  console.log(changeInfo)
  sendCheckJobEvent(tabId)

})