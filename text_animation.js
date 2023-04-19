const CANVAS = document.getElementById("text_pattern");
const WORDLIST = [
    "C Programming",
    "Ethical Hacking",
    "Python",
    "Networking",
    "Web developer",
    "HTML",
    "CSS",
    "Erlang",
    "Object-oriented programming",
    "JavaScript",
    "Java",
    "Bash",
    "Linux",
    "C++ Programming",
    "GUI Design",
    "NodeJS",
    "Functional Programming",
    "Linear Algebra",
    "Geometry",
    "Artificial Intelligence",
    "Machine Learning",
    "Mobile Development"
];
const PARENT = document.getElementById("contents_right");

let clickPointOffsetX = 0;
let can = CANVAS.getContext("2d");
let floating_words = [];
let mousedown = false;

function adjustSize()
{
    can.height = window.innerHeight;
    can.width = window.innerWidth;
}
// Set initial specs
adjustSize();


// When page altered, resize canvas
window.addEventListener("resize", adjustSize);
document.body.addEventListener("resize", adjustSize);




class Word {

    constructor(word)
    {
        this.word = word;

        this.velocity = 0;
        this.distance = 0;
        this.opacity = 0;
        this.size = 0;
    
        this.setSpecifications();

        this.x = Math.random() * CANVAS.width;
        this.y = Math.random() * ( CANVAS.height - this.size) + this.size;
    }

    setSpecifications()
    {
        this.velocity = (this.velocity == 0) ? Math.random() * 3 - Math.random() * 3 : this.velocity;
        this.velocity = (Math.abs( this.velocity ) < 1) ? this.velocity * 3 : this.velocity;
        this.velocity = (Math.abs( this.velocity ) < 1) ? this.velocity * 3: this.velocity;
        this.distance = Math.random() * 10;
        this.opacity = Math.abs(1 - (this.distance/10));   
        this.size = 35*this.opacity;
    }

    move()
    {
        this.velocity;
        this.x+=this.velocity;
        if (this.x + (this.size*this.word.length) < 0 )
        {
            this.x = CANVAS.width;
            this.setSpecifications();
            this.y = Math.random() * ( CANVAS.height - this.size) + this.size;
        } 

        if (this.x > CANVAS.width )
        {
            this.x = - (this.word.length * this.size);
            this.setSpecifications();
            this.y = Math.random() * ( CANVAS.height - this.size) + this.size;
        } 

    }
}

function adjustCanvas()
{
    CANVAS.height = window.innerHeight;
    CANVAS.width = window.innerWidth;
}

adjustCanvas();

// Init the words
WORDLIST.forEach((word) => {
    floating_words.push(new Word(word));
});

function resetMouse() { mousedown = false; }

window.addEventListener("mouseout", resetMouse);
window.addEventListener("mouseup", resetMouse);

function floatingTextAnimation()
{
    can.clearRect(0,0,CANVAS.width, CANVAS.height);

    can.fillStyle="#fdfcfc";
    can.fillRect(0,0,CANVAS.width, CANVAS.height);

    floating_words.forEach((word) => {
        can.font = "" + word.size + "px elnath";
        can.fillStyle = "rgba(211, 211, 211, "+ word.opacity +")";
        
        can.fillText(word.word, word.x, word.y);
        word.move();
    });
    
    console.log("Animating...");
    requestAnimationFrame(floatingTextAnimation);
}

window.addEventListener("resize", adjustCanvas);

floatingTextAnimation();
