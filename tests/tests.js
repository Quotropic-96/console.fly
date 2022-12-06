const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bgImg0 = new Image();
bgImg0.src = '../assets/bg/bg_0.png';

const bgImg1 = new Image();
bgImg1.src = '../assets/bg/bg_1.png';

const bgImg2 = new Image();
bgImg2.src = '../assets/bg/bg_2.png';

const bgImg3 = new Image();
bgImg3.src = '../assets/bg/bg_3.png';

const img = new Image();
img.src = '../assets/player/fall_0.png';

const testImg = new Image();
testImg.src = 'testImg.png';

window.onload = function () {
    ctx.drawImage(testImg, 100, 100, 200, 200);
    ctx.drawImage(img,0, 0, 200, 200);
}

// function _parallaxAnimation(img) {
//     if (dx === 1000) {
//         dx = 0;
//     }
//     console.log(dx);
//     ctx.drawImage(img, 0 - dx, 0, 1000, 600);
//     ctx.drawImage(img, 1000 - dx, 0, 1000, 600);
//     dx++;
// };

// let dx = 0;
// setInterval(() => {
//     _parallaxAnimation(bgImg0);
//     _parallaxAnimation(bgImg1);
//     _parallaxAnimation(bgImg2);
//     _parallaxAnimation(bgImg3);
// },40)

