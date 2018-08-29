    const mainCanvas = document.getElementsByTagName("canvas")[0];
    const ctx = mainCanvas.getContext("2d");
    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;



    var mouseClicked = false, mouseReleased = true;
    var fire = new Image();
    fire.src = "./flame-animation.svg";


    document.addEventListener("click", onMouseClick, false);
    document.addEventListener("mousemove", onMouseMove, false);

    function onMouseClick(e) {
        mouseClicked = !mouseClicked;
        console.log(mouseClicked);
    }

function getMouse(e) {
    var element = ctx, offsetX = 0, offsetY = 0, mx, my;
    var html = document.body.parentNode;
    let htmlTop = html.offsetTop;
    let htmlLeft = html.offsetLeft;
    // Compute the total offset
    if (element.offsetParent !== undefined) {
        console.log(element.offsetLeft);
        do {
            offsetX = element.offsetLeft;
            offsetY = element.offsetTop;
        } while ((element = element.offsetParent));
    }

    if (document.defaultView && document.defaultView.getComputedStyle) {
        stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(mainCanvas, null)['paddingLeft'], 10) || 0;
        stylePaddingTop = parseInt(document.defaultView.getComputedStyle(mainCanvas, null)['paddingTop'], 10) || 0;
        styleBorderLeft = parseInt(document.defaultView.getComputedStyle(mainCanvas, null)['borderLeftWidth'], 10) || 0;
        styleBorderTop = parseInt(document.defaultView.getComputedStyle(mainCanvas, null)['borderTopWidth'], 10) || 0;
    }
    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
    offsetY += stylePaddingTop + styleBorderTop + htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return { x: mx, y: my };
}

// function fade(target) {
//     // create the fade animation
//     var animation = document.createElementNS(
//         "./images/flame-animation.svg", 'animate');
//     animation.setAttributeNS(null, 'attributeName', 'fill-opacity');
//     animation.setAttributeNS(null, 'begin', 'indefinite');
//     animation.setAttributeNS(null, 'to', 0);
//     animation.setAttributeNS(null, 'dur', 0.25);
//     animation.setAttributeNS(null, 'fill', 'freeze');
//     // link the animation to the target
//     target.appendChild(animation);
//     // start the animation
//     animation.beginElement();
// }

    function onMouseMove(e) {
        if (mouseClicked) {
         let mouse = getMouse(e);
            let mx = mouse.x;
            let my = mouse.y
            // fade(e)
            // ctx.fillStyle = "#ffffff";
            // ctx.fillRect(e.clientX, e.clientY, 50, 50);
            // ctx.font = '50pt helvetica';
            // ctx.fillText("🔥", e.clientX, e.clientY);
            ctx.drawImage(fire, mx - 200, my - 350);
        }
    }
