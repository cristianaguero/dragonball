const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '/img/jump.png';
const spriteWidth = 132;
const spriteHeith = 152;

let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFremes = 8;

function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let position = Math.floor(gameFrame/staggerFremes) % 9 ; // para que recorra la cantidad de cuadros en el sprite
    frameX = spriteWidth * position;

    context.drawImage(playerImage, frameX, spriteHeith * frameY, spriteWidth, spriteHeith, 0, 0, spriteWidth, spriteHeith);

    // if(gameFrame % staggerFremes == 0) {
    //     if(frameX < 10) {
    //         frameX++
    //     } else {
    //         frameX = 0;
    //     }
    // }
   

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();

// spriteAnimations = [
//     'idle' = {
//         src: './img/idle.png'
//         width: 149,
//         height: 180,
//         frames: 6
//     },
//     'run' = {
//         src: './img/run.png'
//         width: 149,
//         height: 200,
//         frames: 8
//     },
//     'jump' = {
//         src: './img/jump.png'
//         width: 132,
//         height: 152,
//         frames: 9 
//     }
// ]