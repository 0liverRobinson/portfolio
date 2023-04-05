const CANVAS = document.getElementById("text-animation");
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
    "Linux"
];
const WORDLIST_JP = [
    "C プログラマー",
    "倫理的ハッキング",
    "Python プログラマー",
    "ネットワーキング",
    "ウェブ開発者",
    "HTML",
    "CSS",
    "Erlang プログラマー",
    "オブジェクト指向プログラミング",
    "JavaScript プログラマー",
    "Java プログラマー",
    "Bash プログラマー",
    "リナックス"
];
const PARENT = document.getElementById("home");
const LOGO = document.getElementById("pfp");
const PROJECTS = document.getElementById("projects");
const SLIDE_REEL = document.getElementById("project-section");
let clickPointOffsetX = 0;
let ctx = CANVAS.getContext("2d");
let floating_words = [];
let mousedown = false;

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
    CANVAS.height = PARENT.clientHeight;
    CANVAS.width = PARENT.clientWidth;
}

adjustCanvas();

// Init the words
WORDLIST.forEach((word) => {
    floating_words.push(new Word(word));
});

function resetMouse() { mousedown = false; }

PROJECTS.addEventListener("mousedown", (event) => {
    mousedown = true;
    clickPointOffsetX = event.offsetX - SLIDE_REEL.offsetLeft;
    console.log(clickPointOffsetX);
});
PROJECTS.addEventListener("mousemove", (event) => {
    if (mousedown) {
        event.preventDefault();        
        SLIDE_REEL.style.left = (event.offsetX - clickPointOffsetX) + "px";
        console.log( event.offsetX - clickPointOffsetX + "px");
    }
})

window.addEventListener("mouseout", resetMouse);
window.addEventListener("mouseup", resetMouse);

function floatingTextAnimation()
{
    // Left to right, righjt to left, new y position every time with random velocities.
    // Smaller text size, more dark/translucent (gives distance effect)
    
    ctx.clearRect(0,0,CANVAS.width, CANVAS.height);

    floating_words.forEach((word) => {
        ctx.font = "" + word.size + "px elnath";
        ctx.fillStyle = "rgba(211, 211, 211, "+ word.opacity +")";
        
        ctx.fillText(word.word, word.x, word.y);
        word.move();
    });
    
    console.log("Animating...");
    requestAnimationFrame(floatingTextAnimation);
}

window.addEventListener("resize", adjustCanvas);

floatingTextAnimation();