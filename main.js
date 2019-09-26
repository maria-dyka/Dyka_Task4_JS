window.onload = function () {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let bubbles = new Array(20);
    for(let i =0; i<20; i++){
        bubbles[i] = new Bubble();
    }
    let counter = 0;
    animate();
    
    function animate() {
        if(counter<20){
            bubbles[counter].draw();
            counter++;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i<counter; i++){
            bubbles[i].move();
            bubbles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    function Bubble(){
        this.x = 50;
        this.y = 50;
        this.radius = 50;
        this.deltaX = getRandom(2, 15)/2;
        this.deltaY = getRandom(2, 15)/2;
        this.color = `hsl(${getRandom(0, 360)}, 100%, 85%`;
        this.draw = function () {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fill();
        };
        this.move = function () {
            let newX = this.x + this.deltaX;
            let newY = this.y + this.deltaY;
            let maxX=canvas.width-this.radius;
            let maxY = canvas.height-this.radius;

            if(newX > maxX || newX < this.radius) {
                this.deltaX = -this.deltaX;
            }
            if(newY > maxY || newY < this.radius) {
                this.deltaY = -this.deltaY;
            }

            this.x += this.deltaX;
            this.y += this.deltaY;
        }
    }

    window.requestAnimationFrame(animate);

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};