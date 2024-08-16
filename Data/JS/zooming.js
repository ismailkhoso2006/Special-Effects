var scale = 1;

$(document).ready(function(){
    $("#map-container").on("mousewheel DOMMouseScroll", function (e) {
    e.preventDefault();
    var delta = e.delta || e.originalEvent.wheelDelta;
    var zoomOut;
    if (delta === undefined) {
      //we are on firefox
      delta = e.originalEvent.detail;
      zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      zoomOut = !zoomOut;
    } else {
      zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    }
    var touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
    var touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
    var translateX, translateY;
    if(zoomOut){
      // we are zooming out
      scale = scale - 0.05;
      
      var offsetWidth = $("#zoom")[0].offsetWidth;
      var offsetHeight = $("#zoom")[0].offsetHeight;

      $("#zoom")
        .css("transform-origin", touchX + 'px ' + touchY + 'px')
        .css("transform", 'scale(' + scale + ')');
      
    }else{
      // we are zooming in
      scale = scale + 0.05;
      
      var offsetWidth = $("#zoom")[0].offsetWidth;
      var offsetHeight = $("#zoom")[0].offsetHeight;

      $("#zoom")
        .css("transform-origin", touchX + 'px ' + touchY + 'px')
        .css("transform", 'scale(' + scale + ')');
    }
    
  });


});