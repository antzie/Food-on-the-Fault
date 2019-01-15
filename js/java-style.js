// JavaScript for CSS Styling 
// Version: 13-01-2019

// Move side list left by same amount as its width.
    function toggleHangouts() {
      var listDiv = document.getElementById("side-list");
      var width = document.getElementById('side-list').offsetWidth;
      if (listDiv.style.marginLeft === "0px" || listDiv.style.marginLeft == '') {
        listDiv.style.marginLeft = -width + "px";
      } else {
        listDiv.style.marginLeft = "0px";
      }
    }
