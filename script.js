const canvas = document.getElementById("cube_pattern");
const parent = document.getElementById("main");
const main_contents = document.getElementById('contents_container');
const arrow = document.getElementById("arrow");

var ctx = canvas.getContext("2d");
var width, height;
var cubes = [];
var scaleX, scaleY;
var animateToggle = true;

class Vertex {
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y; 
        this.z = z;   
    }
    moveBy(dx,dy)
    {
        this.x+=dx;
        this.y+=dy;
    }
}

class Cube {
    constructor(x1,y1,z1)
    {

        // Init specs
        this.originX = x1;
        this.originY = y1;
        this.originZ = z1;
        this.len = (canvas.width > canvas.height) ? canvas.width/5 : canvas.width/3;
        this.side = canvas.width/100 * (Math.random() * 10) + this.len;
        this.thetaX = Math.random() / 100;
        this.thetaY = Math.random() / 100;
        this.thetaZ = Math.random() / 100;
        this.velocity_theta = -Math.random() * 100;
        this.vertexes = [];

        // Init verticies
        for (let x = -0.1; x <= 0.1; x+=0.2)
            for (let y = -0.1; y <= 0.1; y+=0.2)
                for (let z = -0.1; z <= 0.1; z+=0.2)
                    this.vertexes.push(new Vertex(this.originX + (x*this.side), this.originY+(y*this.side), this.originZ+(z*this.side)));         
    }   

    draw()
    {
        this.vertexes.forEach((vertex) => {
            ctx.strokeStyle = "black";
            this.vertexes.forEach((v) => {
                ctx.beginPath();
                ctx.moveTo(vertex.x + this.originX*(canvas.width/10), (vertex.y + (canvas.height/20)) + this.originY * canvas.height/10);
                ctx.lineTo(v.x + this.originX*(canvas.width/10), (v.y + (canvas.height/20)) + this.originY* canvas.height/10);
                ctx.stroke();
            });
        });
    }

    move() {
        // Rotate all the vertexes on all axis
        this.vertexes.forEach((vertex) => {
            this.rotateX(vertex);
            this.rotateY(vertex);
            this.rotateZ(vertex);
        });
    }

    animate() 
    {
        this.draw();
        this.move();
    }

    rotateX(vertex)
    {
        
        let y = ( (vertex.y - this.originY) * Math.cos(this.thetaX) - (vertex.z - this.originZ) * Math.sin(this.thetaX));
        let z = ((vertex.y - this.originY) * Math.sin(this.thetaX) + (vertex.z - this.originZ) * Math.cos(this.thetaX));
        vertex.y = (y + this.originY);
        vertex.z = (z + this.originZ);
    }

    rotateY(vertex)
    {
        let x = (vertex.z - this.originZ) * Math.sin(this.thetaY) + (vertex.x - this.originX) * Math.cos(this.thetaY);
        let z = (vertex.z - this.originZ) * Math.cos(this.thetaY) - (vertex.x - this.originX) * Math.sin(this.thetaY)
        vertex.x = (x + this.originX);
        vertex.z = (z + this.originZ);
    }

    rotateZ(vertex)
    {
        let x = (vertex.x - this.originX) * Math.cos(this.thetaZ) - (vertex.y - this.originY) * Math.sin(this.thetaZ);
        let y =  (vertex.x - this.originX) * Math.sin(this.thetaZ) +  (vertex.y - this.originY) * Math.cos(this.thetaZ);
        vertex.x = (x + this.originX);
        vertex.y = (y + this.originY);
    }
}

function adjustCanvas()
{
    canvas.height = parent.clientHeight;
    canvas.width = parent.clientWidth;
}

function scollTop() {
    window.scrollTo(0, 0);
}

// Set canvas specs
adjustCanvas();

// Init cubes
for (let i = 0; i < 15; i++)
    cubes.push(new Cube(i, Math.random() * 10, Math.sin(i*Math.PI)));

// When page altered, resize canvas
window.addEventListener("resize", adjustCanvas);
document.body.addEventListener("resize", adjustCanvas);

// Disable mobile scrolling
document.body.addEventListener('touchstart', function(event){ 
    event.preventDefault(); 
    event.stopPropagation();
});
document.body.addEventListener('touchmove', function(event){ 
    event.preventDefault(); 
    event.stopPropagation();
});

// Make sure we don't start at anywhere inconvenient:
window.onbeforeunload = scollTop;


// Play cube animation
function playAnimation()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cubes.forEach((cube) => cube.animate());
    requestAnimationFrame(playAnimation);
}
playAnimation();


function arrowAnimate()
{
    let isMobile = window.innerHeight > window.innerWidth;
    if (window.scrollY >= window.innerHeight) {
        // First half of screen
        parent.scrollIntoView();

        arrow.style.transform="rotate(180deg)";

        // Move arrow to centre screen (YES, CENTRE - NOT 'CENTER')
        arrow.style.left = "50%";
        arrow.style.transform = "translate(-50%, 0%)";

    } else 
    {
        // Second half of screen
        main_contents.scrollIntoView();

        // Pause top animation
        

        arrow.style.transform="rotate(0deg)";

        // Spin back up 
        if (!isMobile) {
            arrow.style.left = "90%";
        }
    }

}
