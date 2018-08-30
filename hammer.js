

var smashed1 = new Image();
var smashed2 = new Image();
var smashed3 = new Image();
var smashed4 = new Image();
smashed1.src = "./images/smashed.png";
smashed2.src = "./images/smashed_1.png";
smashed3.src = "./images/smashed_2.png";
smashed4.src = "./images/smashed_3.png";
let smashes = [smashed1, smashed2, smashed3, smashed4];

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    }
}

function randomSmash() {
    smash = Math.floor(Math.random() * 4);
    console.log(smash);
    return smashes[smash];
}

document.addEventListener('click', e => {
    if (e.target.tagName === 'CANVAS') {
        let mouse = getMousePos(e.target, e);
        draw(e.target, mouse.x, mouse.y);
        e.target.counter++;
        console.log(e.target.counter);
        if (e.target.counter === 5) {
            animate(e.target);
            animate(e.target.sibling);
        }
    } else {
        overlayCanvas(e);
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
});

const overlayCanvas = (e) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'super-smash-canvas';
    canvas.sibling = e.target;

    canvas.width = e.target.offsetWidth;
    canvas.height = e.target.offsetHeight;
    canvas.counter = 0;

    canvas.style.position = 'absolute';
    canvas.style.border = 'solid 1px red';
    canvas.style.top = `${e.target.offsetTop}px`;
    canvas.style.left = `${e.target.offsetLeft}px`;

    canvas.style.padding = '0';
    canvas.style.margin = '0';

    canvas.zIndex = '5000';
    e.target.parentNode.insertBefore(canvas, e.target.nextSibling)

    draw(canvas, e);
};

const draw = (canvas, x, y) => {
    const ctx = canvas.getContext('2d');

    //draw initial smash
    let smashX = x - (smashed1.width / 2);
    let smashY = y - (smashed1.height / 2);
    smash = randomSmash();
    ctx.drawImage(smash, smashX, smashY);

    //set coords for future smashes
    let leftX = smashX - smashed2.width;
    let leftY = smashY;
    let rightX = smashX + smashed2.width;
    let rightY = smashY;
    let topX = smashX;
    let topY = smashY - smashed2.height;
    let bottomX = smashX;
    let bottomY = smashY + smashed2.height;

}

const animate = (element) => {
    Object.assign(element.style, {
        transition: 'all 1s',
        fontSize: '0',
        opacity: '0'
    });
    setTimeout(() => {
        Object.assign(element.style, { width: '0', height: '0' });
        setTimeout(() => { element.style.display = 'none'; }, 1000);
    }, 1000);
}

