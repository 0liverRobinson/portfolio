const slides = document.getElementById("project_slide");
const sidebar = document.getElementById("contents_left");
let mouseDown = false, isOffScreen = false;
let mouseX, mouseY;
let mouseOffsetX = 0;
let margin;
function getMouseCoordinates(event) {
    margin = sidebar.offsetLeft + sidebar.offsetWidth;
    // Get mouse position
    event = event || window.event;
    mouseX = event.clientX;
    mouseY = event.clientY;
    // Move slides
    if (mouseDown)
    {
        event.preventDefault();        
        slides.style.left = (mouseX - mouseOffsetX) - margin + "px";
    }
}


function reset()
{
    mouseDown = false;
}
function setAnchorPoint(event) {
    event = event || window.event;
    mouseOffsetX = event.clientX - slides.offsetLeft;
    mouseDown = true;
}
