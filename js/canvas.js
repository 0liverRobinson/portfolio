const canvas = document.getElementById("canvas");
const max_radius = 20;
const max_point_shift = 5;
const max_movement_radius = 5;
let ctx = canvas.getContext("2d");
let canvas_height, canvas_width;
let points_array = [], points_total = 50;
let scale = 100, scale_x, scale_y;
let mouse_x, mouse_y;
let relative_centre_x, relative_centre_y;

class Point
{
    constructor(x, y, radius)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.origin_x = x;
        this.origin_y = y;
        this.theta = Math.random() * 5 - Math.random() * 5;
    }   

}

for (let i = 0; i < points_total; i++)
    points_array.push(new Point(i*(scale/points_total), Math.random()*scale, max_radius/2 + Math.random() * (max_radius/2)));

window.onload = window.onresize = () =>
{
    canvas_height = canvas.height = window.innerHeight;
    canvas_width = canvas.width = window.innerWidth;
    
    scale_y = canvas_height / scale;
    scale_x = canvas_width / scale;
    
    relative_centre_x = (canvas_width / 2) / scale;
    relative_centre_y = (canvas_height /2) / scale;
    
    mouse_x = mouse_x ?? relative_centre_x;
    mouse_y = mouse_y ?? relative_centre_y;
};

function fillBackground()
{
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas_width, canvas_height);
}

function getMousePosition(event)
{
    event = event || window.event;
    mouse_x = event.clientX / scale;
    mouse_y = event.clientY / scale;
}

function drawPoints()
{
    points_array.forEach((point) => {
        
        ctx.fillStyle = "rgba(227,51,96,"+ point.radius / max_radius +")";
        
        // Move points slightly in the direction of the mouse capped at +- max_point_shift
        point.x = Math.min(Math.max(point.origin_x + (mouse_x - relative_centre_x),  point.origin_x -max_point_shift),  point.origin_x + max_point_shift);
        point.y = Math.min(Math.max(point.origin_y +(mouse_y - relative_centre_y),  point.origin_y + -max_point_shift),  point.origin_y +max_point_shift);
        
        // Move points in circles
        point.x += (max_movement_radius * Math.cos(point.theta+=0.001));
        point.y += (max_movement_radius * Math.sin(point.theta+=0.001));

        ctx.fillRect(point.x * scale_x, point.y * scale_y, point.radius, point.radius);
        
    });
}

function paintCanvas()
{
    fillBackground();

    drawPoints();

    requestAnimationFrame(paintCanvas);
}
requestAnimationFrame(paintCanvas);