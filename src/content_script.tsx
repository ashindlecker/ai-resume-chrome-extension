/*
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});
*/

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if(!msg.type || msg.type !== 'check_job_details')
    return;
  const isJobPage = window.location.pathname === '/viewjob';
  console.log(isJobPage)
  if(!isJobPage)
    return;

  console.log('Job page');
  const $title = document.querySelector('#viewJobSSRRoot h2');
  const $description = document.querySelector('#viewJobSSRRoot #jobDescriptionText');
  if(!$title || !$description)
  {
    return;
  }
  $title.setAttribute('style', 'background-color:#cce6ff; padding:5px;');
  $description.setAttribute('style', 'background-color:#b4d8fb; padding: 5px;');

  chrome.storage.local.set({job_details: {description:$description?.textContent, title: $title?.textContent}});

  response(true)
})
