
    var fire = new Image();
    fire.src = "./flame-animation (1).svg";

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect(), 
        scaleX = canvas.width / rect.width,    
        scaleY = canvas.height / rect.height;  

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY    
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

    ctx.drawImage(fire);
};
