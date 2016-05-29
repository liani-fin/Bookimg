// This runs in the background while bookimg extension is installed and enabled

// Communicate with the injected js
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {

      const MAIN_DIR = "Great Pics";

      // Add main directory if it doesn't already exist
      chrome.bookmarks.search(
          { title : MAIN_DIR, url : null }, 
          function (results) {
            //not including sub folders
            results = results.filter(function (item) {
               return item.parentId = '1';
            })

            if (results.length == 0){
              chrome.bookmarks.create(
                {parentId: "1", title: MAIN_DIR},
                function (addedNode){
                  bookPage(response, addedNode.id);
                });
            }
            else {
              bookPage(response, results[0].id);
            }
          }
      )

    });
  }); // of tabs
}); //of click

// The function creates the bookmark folder for the page
function bookPage(page, mainDirId) {

  // Add a directory for current page
  chrome.bookmarks.create(
    {parentId: mainDirId, title: page.pTitle},
    function(addedNode){

      // Bookmark each img
      var i;
      for (i = 0; i < page.imgList.length; i++) {
        chrome.bookmarks.create({parentId: addedNode.id, title: page.imgList[i].title, url: page.imgList[i].src});
      }
    });

}