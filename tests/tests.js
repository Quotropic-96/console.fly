const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bgImg1 = new Image();
bgImg1.src = '../assets/Bg/1.png';

function _parallaxAnimation(img) {
    let dx = 0;
    setInterval(() => {
        if (dx === 1000) {
            dx = 0;
        }
        console.log(dx);
        ctx.drawImage(img, 0 - dx, 0, 1000, 600);
        ctx.drawImage(img, 1000 - dx, 0, 1000, 600);
        dx++;
    },10);
};

_parallaxAnimation(bgImg1);
