
const zoomContainer = document.querySelector('.zoom-container');
let zoomLevel = 1;
let isPanning = false;
let panStartX, panStartY;

zoomContainer.addEventListener('wheel', (e) => {
  e.preventDefault();
  const zoomFactor = 0.1;
  const deltaY = e.deltaY;
  const rect = zoomContainer.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  zoomLevel += deltaY > 0 ? zoomFactor : -zoomFactor;
  zoomLevel = Math.max(0.1, zoomLevel); // minimum zoom level
  zoomLevel = Math.min(10, zoomLevel); // maximum zoom level
  
  const currentScale = zoomContainer.getBoundingClientRect().width / zoomContainer.offsetWidth;
  const adjustedMouseX = mouseX / currentScale;
  const adjustedMouseY = mouseY / currentScale;
  
  zoomContainer.style.transformOrigin = `${adjustedMouseX}px ${adjustedMouseY}px`;
  zoomContainer.style.transform = `scale(${zoomLevel})`;
});





document.addEventListener('mouseup', () => {
  isPanning = false;
});

zoomContainer.addEventListener('mouseleave', () => {
  isPanning = false;
});

