
let gMouseDownX = 0;
let gMouseDownY = 0;
let gMouseDownOffsetX = 0;
let gMouseDownOffsetY = 0;

function addListeners() {
    document.getElementById('cursorImage').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    gMouseDownX = e.clientX;
    gMouseDownY = e.clientY;

    var div = document.getElementById('cursorImage');

    //The following block gets the X offset (the difference between where it starts and where it was clicked)
    let leftPart = "";
    if(!div.style.left)
        leftPart+="0px";    //In case this was not defined as 0px explicitly.
    else
        leftPart = div.style.left;
    let leftPos = leftPart.indexOf("px");
    let leftNumString = leftPart.slice(0, leftPos); // Get the X value of the object.
    gMouseDownOffsetX = gMouseDownX - parseInt(leftNumString,10);

    //The following block gets the Y offset (the difference between where it starts and where it was clicked)
    let topPart = "";
    if(!div.style.top)
        topPart+="0px";     //In case this was not defined as 0px explicitly.
    else
        topPart = div.style.top;
    let topPos = topPart.indexOf("px");
    let topNumString = topPart.slice(0, topPos);    // Get the Y value of the object.
    gMouseDownOffsetY = gMouseDownY - parseInt(topNumString,10);

    window.addEventListener('mousemove', divMove, true); 
}

function divMove(e){
    var div = document.getElementById('cursorImage');
    div.style.position = 'relative';
    let topAmount = e.clientY - gMouseDownOffsetY;
    div.style.top = topAmount + 'px';
    let leftAmount = e.clientX - gMouseDownOffsetX;
    div.style.left = leftAmount + 'px';
}

addListeners();


const zoomContainer = document.querySelector('#cursorImage');
let zoomLevel = 1;

let panStartX, panStartY;

zoomContainer.addEventListener('wheel', (e) => {
  e.preventDefault();
  const zoomFactor = 0.1;
  const deltaY = e.deltaY;
  const rect = zoomContainer.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  zoomLevel += deltaY > 0 ? zoomFactor : -zoomFactor;
  zoomLevel = Math.max(1, zoomLevel); // minimum zoom level
  zoomLevel = Math.min(10, zoomLevel); // maximum zoom level
  
  const currentScale = zoomContainer.getBoundingClientRect().width / zoomContainer.offsetWidth;
  const adjustedMouseX = mouseX / currentScale;
  const adjustedMouseY = mouseY / currentScale;
  
  zoomContainer.style.transformOrigin = `${adjustedMouseX}px ${adjustedMouseY}px`;
  zoomContainer.style.transform = `scale(${zoomLevel})`;
});

