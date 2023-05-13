

const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 900;

const gravity = 1.5;



const backgroundLayer1 = new Image();
backgroundLayer1.src = '../img/layer1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '../img/layer2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '../img/layer3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '../img/layer4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = '../img/layer5.png';
const backgroundLayer6 = new Image();
backgroundLayer6.src = '../img/layer6.png';
const backgroundLayer7 = new Image();
backgroundLayer7.src = '../img/layer7.png';
const backgroundLayer8 = new Image();
backgroundLayer8.src = '../img/layer8.png';


class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 49;
        this.height = 100;
        this.image = document.getElementById('player-run');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 8;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.frameTimer;

    }

    draw() {
     
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, 149, 200, this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.velocity.y += gravity;
        } 

     
        if(this.frameTimer > this.frameInterval) {
            if(this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
       
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x: x,
            y: y
        }

        this.width = 500;
        this.height = 20;
    }

    draw() {
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}



let player = new Player();

let platforms = [];


let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}



let gameSpeed = 10
let x = 0
let a = 10
let a2 = 1920
let x2 = 1920;

let scrollOffset = 0;


let gameFrame = 0;


function init() {
    player = new Player();

    platforms = [
        new Platform({x: 200, y: 700}), 
        new Platform({x: 500, y: 600}), 
        new Platform({x: -1, y: 850}), 
        new Platform({x: 900, y: 850}),
        new Platform({x: 1600, y: 850}),
        new Platform({x: 2300, y: 850}),
        new Platform({x: 2900, y: 700}),
        new Platform({x: 3600, y: 850}),
        new Platform({x: 4100, y: 850}),
        new Platform({x: 4900, y: 850}),
        new Platform({x: 5500, y: 700}),
        new Platform({x: 6200, y: 600}),
        new Platform({x: 5700, y: 850}),
        new Platform({x: 6100, y: 850}),
        new Platform({x: 7000, y: 850}),
        new Platform({x: 7700, y: 850}),
    ];



    scrollOffset = 0;
}

let lastTime = 0;


function animate(timeStamp) {
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width, canvas.height);

    context.drawImage(backgroundLayer8, x, 0);
    context.drawImage(backgroundLayer8, x2, 0);
    context.drawImage(backgroundLayer7, 0, 0);
    context.drawImage(backgroundLayer7, 0, 0);
    context.drawImage(backgroundLayer6, x / 3.5, 0);
    context.drawImage(backgroundLayer6, x2 / 3.5, 0);
    context.drawImage(backgroundLayer5, x / 3, 0);
    context.drawImage(backgroundLayer5, x2 / 3, 0);
    context.drawImage(backgroundLayer4, x / 2.5, 0);
    context.drawImage(backgroundLayer4, x2 / 2.5, 0);
    context.drawImage(backgroundLayer3, x / 2, 0);
    context.drawImage(backgroundLayer3, x2 / 2, 0);
    context.drawImage(backgroundLayer2, x / 1.5, 0);
    context.drawImage(backgroundLayer2, x2 / 1.5, 0);
    context.drawImage(backgroundLayer1, x, 0);
    context.drawImage(backgroundLayer1, x2, 0);

   


    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp;

    player.update(deltaTime);


    platforms.forEach(platform => {
        platform.draw();
    })

    

    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 7;
    } else if (keys.left.pressed && player.position.x > 100) { 
        player.velocity.x = -7;
    } else {
        player.velocity.x = 0;

        if(keys.right.pressed) {
            scrollOffset += 7;
            platforms.forEach(platform => {
                platform.position.x -= 7;
            })
            if(x < -1920) {
                x = 1920 + x2 - gameSpeed;
            } else {
            x -= gameSpeed;
            }
            if(x2 < -1920) {
                x2 = 1920 + x - gameSpeed;
            } else {
            x2 -= gameSpeed;
            }
            //for going left

        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 7;
            })
            if(x < -1920) {
                x = 1920 + x2 - gameSpeed;
            } else {
            x += gameSpeed;
            }
            if(x2 < -1920) {
                x2 = 1920 + x - gameSpeed;
            } else {
            x2 += gameSpeed;
            }
        }
    }
//colition detection vertical
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        }
    })

   
    // // win condition

    if (scrollOffset > 7000) {
        init()
    }

    // // lose condition
    if(player.position.y > canvas.height){
        init();
    }
    
    }  
init()     
animate(0);



window.addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65: // letter A
            keys.left.pressed = true;
            break;
        case 83: // letter S

            break;
        case 68: // letter D
            keys.right.pressed = true;
            break;
        case 87: // letter W
            player.velocity.y -= 20;
            break;
    }
})

window.addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65: // letter A
            keys.left.pressed = false;
            break;
        case 83: // letter S

            break;
        case 68: // letter D
            keys.right.pressed = false;
            break;
    }
})

