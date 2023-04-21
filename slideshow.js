const slides = document.getElementById("project_slide");
const sidebar = document.getElementById("contents_left");
let mouseDown = false, isOffScreen = false;
let mouseX, mouseY;
let mouseOffsetX = 0;
let margin;
let touchScreen = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
let touchX;


function getMouseCoordinates(event) {
    
    
    if(!touchScreen) {

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

    }  else {
        margin = sidebar.offsetLeft + sidebar.offsetWidth;
        mouseX = event.touches[0].pageX;
        if (mouseDown)
        {
            event.preventDefault();
            slides.style.left = (mouseX - mouseOffsetX) - margin + "px";
        }
    }
}
function reset()
{
    mouseDown = false;
}
function setAnchorPoint(event) {

    if(!touchScreen) {
        event = event || window.event;
        mouseOffsetX = event.clientX - slides.offsetLeft;
        mouseDown = true;
    } else {
        // Get finger X,Y
        event.preventDefault();
        mouseDown = true;
        mouseOffsetX = event.touches[0].pageX - slides.offsetLeft;
    }
}

// Event listeners for mobile users
slides.addEventListener("touchstart", setAnchorPoint);
slides.addEventListener("touchmove", getMouseCoordinates);
slides.addEventListener("touchend", reset);