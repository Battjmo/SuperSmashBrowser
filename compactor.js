document.addEventListener("DOMContentLoaded", () => {
    const mainCanvas = document.getElementById("mainCanvas");
    const ctx = mainCanvas.getContext("2d");
    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;
    let walls = new Walls(ctx, mainCanvas);
    walls.draw();
})

// These two functions are used to send data to the storage,
// They will be defined when we decided on what to send
// data() {
//
// }

// chrome.runtime.sendMessage(data);

class Walls {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.wallWidth = 5;
        this.wallHeight = canvas.height;
        this.wallWidth = 30;
        this.wallSpeed = 3;
        this.leftPos = 20;
        this.rightPos = canvas.width - 20;
        this.bottomPos = canvas.height - 20;
        this.topPos = 0;
        this.wallY = 0;
        this.hitMiddle = false;
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.boxSize = 100;
        this.startTop = false;
        this.stop = false;
    }

    drawSideWalls() {
        this.ctx.beginPath();
        this.ctx.rect(this.leftPos + 0.5, this.wallY + 0.5, this.wallWidth, this.wallHeight);
        this.ctx.fillStyle = "000000";
        this.ctx.strokeStyle = "000000";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.rect(this.rightPos - 0.5, this.wallY - 0.5, this.wallWidth, this.wallHeight);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawTopWalls() {
        this.ctx.beginPath();
        this.ctx.rect(this.wallY, this.topPos, this.canvasWidth, this.wallWidth );
        this.ctx.fillStyle = "000000";
        this.ctx.strokeStyle = "000000";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.rect(this.wallY - 0.5, this.bottomPos - 0.5, this.canvasWidth, this.wallWidth );
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    animateSideWalls() {
        if (!this.hitMiddle) {
            this.leftPos += this.wallSpeed;
            this.rightPos -= this.wallSpeed;
        } else {
            this.leftPos -= this.wallSpeed;
            this.rightPos += this.wallSpeed;
            }
        if (this.leftPos + this.wallWidth + this.boxSize >= this.rightPos) {
            this.wallSpeed = 0;
            this.hitMiddle = true;
            console.log("hit middle");
        }
        if (this.leftPos + this.wallWidth < 0) {
            this.startTop = true;
            this.hitMiddle = false;
            this.wallSpeed = 0;
            console.log("start top");
        }
    }
    animateTopWalls() {
        if (this.startTop && !this.hitMiddle) {
            this.topPos += this.wallSpeed;
            this.bottomPos -= this.wallSpeed;
        } else if (this.startTop && this.hitMiddle) {
            this.topPos -= this.wallSpeed;
            this.bottomPos += this.wallSpeed;
        }
        if (this.topPos + this.wallWidth + this.boxSize >= this.bottomPos) {
            this.wallSpeed = 0;
            this.hitMiddle = true;
            console.log("hit middle");
        }

        if (this.topPos + this.wallWidth < 0) {
            console.log("stahp");
            this.stop = true;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (!this.startTop) {
            this.drawSideWalls();
            this.animateSideWalls();
        } else if (this.startTop && !this.stop) {
            this.drawTopWalls();
            this.animateTopWalls();
        } else {
            return;
        }

        this.wallSpeed += .1

        window.requestAnimationFrame(this.draw.bind(this));
    }
    // bindKeys() {
    //     document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    //     document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    //     // document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
    // }

    // //keypress handling
    // keyDownHandler(e) {
    //     if (e.keyCode === 39) {
    //         this.rightPressed = true;
    //     }
    //     else if (e.keyCode === 37) {
    //         this.leftPressed = true;
    //     }
    //     else if (e.keyCode === 38) {
    //         this.upPressed = true;
    //     }
    //     else if (e.keyCode === 40) {
    //         this.downPressed = true;
    //     }
    // }

    // keyUpHandler(e) {
    //     if (e.keyCode == 39) {
    //         this.rightPressed = false;
    //     }
    //     else if (e.keyCode == 37) {
    //         this.leftPressed = false;
    //     }
    //     else if (e.keyCode === 38) {
    //         this.upPressed = false;
    //     }
    //     else if (e.keyCode === 40) {
    //         this.downPressed = false;
    //     }
    // }
        //MANUAL WALL MOVEMENT
        //moving the left and right walls
        // if (this.leftPos + this.wallWidth + this.boxSize === (this.rightPos)) {
        //     console.log("hit middle!")
        //     this.hitMiddle = true;
        // }
        // if (this.rightPressed && ((this.leftPos+ this.wallWidth + this.boxSize) <= this.rightPos)) {
        //     if (this.hitMiddle === false) {
        //         this.leftPos += this.wallSpeed;
        //     } else {
        //         this.leftPos -= this.wallSpeed;
        //     }
        // } else if (this.leftPressed && (this.rightPos >= this.leftPos + (this.wallWidth + this.boxSize))) {
        //     if (this.hitMiddle === false) {
        //         this.rightPos -= this.wallSpeed;
        //     } else {
        //         this.rightPos += this.wallSpeed;
        //     }
        // }






}
