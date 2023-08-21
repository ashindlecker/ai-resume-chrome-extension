import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  const [jobDetails, setJobDetails] = useState<any>()

  useEffect(() => {
    chrome.action.setBadgeText({ text: '' })
    
    chrome.storage.local.get(["job_details"]).then((result) => {
      setJobDetails(result.job_details)
    })
  }, [])

  const handleLinkClick = useCallback((event: any) => {
    const target:Element = event.target;
    chrome.tabs.create({url: target.getAttribute('href')!})
  }, [])


  return (
    <div style={{minWidth: '500px'}}>
      <div className="container flex flex-col  p-2 gap-2">
        {!jobDetails && (
          <span className="text-sm text-center">No job found on tab. View a job on <a href="https://indeed.com" onClick={handleLinkClick}>Indeed</a></span>
        )}
        {jobDetails && (
          <>
            <span className="text-sm text-center">Job Title: {jobDetails.title}</span>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Generate Resume
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
