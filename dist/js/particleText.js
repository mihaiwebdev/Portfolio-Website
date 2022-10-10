const canvas = document.getElementById('canvas1');
const container = document.querySelector('.header-container')
const ctx = canvas.getContext('2d');
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;
let particleArray = [];
let multiplier = 13;
let adjustX = 10
let adjustY = 8
let speedToConnect = 150;


// set mouse coordonates
const mouse = {
    x: null,
    y: null,
    radius: 150
}

setTimeout(() => speedToConnect = 10, 1500)

if (canvas.width < 630) {
    adjustY = 4;
    adjustX = 2
    ctx.fillStyle = 'white';
    ctx.font = '18px monospace';
    ctx.fillText('hi,', 0, 18);
    mouse.x = -500
    mouse.y = 500
    window.addEventListener('touchmove', (e) => {
        mouse.x = e.changedTouches[0].clientX
        mouse.y = e.changedTouches[0].clientY - 88

    })
    window.addEventListener('touchend', (e) => {
        mouse.x = -500
        mouse.y = 500
    })

} else {
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x - (window.innerWidth - container.offsetWidth) / 2
        mouse.y = e.y - 88;

    })
    ctx.fillStyle = 'white';
    ctx.font = '18px monospace';
    ctx.fillText('Hello,', 0, 18);
}
const textCoordinates = ctx.getImageData(0, 0, 100, 100)

// create particles 
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 50) + 1;
    }

    draw() {
        ctx.fillStyle = '#8c5523';
        ctx.beginPath();
        // full circle path
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    load() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    update() {
        // calc dist between curr mouse pos and curr particles pos
        // mouse.x - mouse horiz pos; this.x - particle horiz pos
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        // dinstance between dx and dy 
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        // slow the particle down as it moves away from the mouse
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            // get particles back at original position
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                // get them back slower
                this.x -= dx / speedToConnect;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / speedToConnect
            }
        }
    }
}

// fill the particle arrays with randomize particle objects
function init() {
    particleArray = [];
    // cicle trough every pixels in that height 100 - 100 width area from line 24
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            // check if opacity is atleast 50% = 128; 100% = 255
            // check only the 4th el in the array, which is the alpha num
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }
        }
    }
}
init();

window.addEventListener('load', () => {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].load();
    }
})

// handle animation loop
function animate() {
    // call ctx clear rectangle to clear entire canvas between any frame of animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // for each obj inside the array call custom draw method from the line 31
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    // make recursion to call the function over and over again
    requestAnimationFrame(animate);
}
animate()

function connect() {
    let opacityValue = 1;
    // measure distance of each particle
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            opacityValue = 1 - (distance / 50);
            ctx.strokeStyle = `rgba(216, 98, 98,${opacityValue})`;
            // draw a line between the particles closed enough
            if (distance < 25) {
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// resize ev
window.addEventListener('resize', () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    init();
})
