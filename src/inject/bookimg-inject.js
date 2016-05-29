
// This function communicates with the extensions background.js and returns information about big images to add to bookmarks 
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    var bigImages = []; // list of images

    // find all big images' name and url
    $('img')
      .each(function () {
        if (this.width > 150 && this.height > 150) {
          bigImages.push({
            title : this.title.trim() || this.alt.trim() || this.src,
            src : this.src
          })
        }
      })

    var response = {pTitle: $(document).find("title").text(), imgList: bigImages};
    sendResponse(response);
  });
