
    var fire = new Image();
    fire.src = "./flame-animation (1).svg";

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

document.addEventListener('click', e => {
    if (e.target.tagName === 'CANVAS') {
        let mouse = getMousePos(e.target, e);
        draw(e.target, mouse.x, mouse.y);
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

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();

    // ctx.drawImage(fire);
};
