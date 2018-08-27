document.addEventListener("DOMContentLoaded", () => {
    const mainCanvas = document.getElementById("mainCanvas");
    const ctx = mainCanvas.getContext("2d");
    let walls = new Walls(ctx, mainCanvas);
    walls.bindKeys();
    walls.draw();
})

class Walls {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.wallWidth = 5;
        this.wallHeight = canvas.height;
        this.wallWidth = 10;
        this.wallSpeed = 1;
        this.leftPos = 20;
        this.rightPos = canvas.width - 20;
        this.wallY = 0;
        this.hitMiddle = false;
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.boxSize = 30;
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

    }

    bindKeys() {
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        // document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
    }

    //keypress handling
    keyDownHandler(e) {
        if (e.keyCode === 39) {
            this.rightPressed = true;
        }
        else if (e.keyCode === 37) {
            this.leftPressed = true;
        }
        else if (e.keyCode === 38) {
            this.upPressed = true;
        }
        else if (e.keyCode === 40) {
            this.downPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.rightPressed = false;
        }
        else if (e.keyCode == 37) {
            this.leftPressed = false;
        }
        else if (e.keyCode === 38) {
            this.upPressed = false;
        }
        else if (e.keyCode === 40) {
            this.downPressed = false;
        }
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.drawSideWalls();

        if (this.leftPos + this.wallWidth + this.boxSize === this.rightPos) {
            this.wallSpeed =  -this.wallSpeed;
            this.hitMiddle = true;
        }

        if (this.leftPos + this.wallWidth < 0) {
            this.wallSpeed = 0;
        }

        // if (this.hitMiddle) {
        //     this.wallSpeed = 0;
        // } else {
        //     this.wallSpeed += 0.01;
        // }


        this.leftPos += this.wallSpeed;
        this.rightPos -= this.wallSpeed;


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




        window.requestAnimationFrame(this.draw.bind(this));
}

}