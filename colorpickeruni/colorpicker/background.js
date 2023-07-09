console.log('this is backgroundjs');
let color;
const urls = [
    "chrome://extensions/",
    "https://www.canva.com/design/DAFfCRR-uXo/MnKCtb7ImWM1bDppv23Y6Q/edit"
  ];

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    var currentUrl= tabs[0].url;
    console.log(currentUrl);
    urls.map(items=>{
         if(currentUrl===items|| currentUrl===undefined){
        //   chrome.runtime.sendMessage.addListener(function(){
        //     message:"mess";
        //   })

        //    document.getElementsByClassName("urlchange").innerText="OOps! &#x1F61E; you can't pick color from this page";
        }
    })
  });


  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color:"red" });
});
