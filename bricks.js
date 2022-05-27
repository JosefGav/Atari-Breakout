const root = document.querySelector(':root');
const canvas = document.getElementById("canvas");

const wallElem = document.getElementById("wall");
let sliderWidth = window.innerWidth/5;
let ball;

let wall = []

const slider = document.getElementById("slider");
const sliderHeigth = 50;
const brickWidth = 100;
let numberOfColumns;



const brickStatuses = {
    destroyed: "destroyed",
    active: "active",
    red: "red",
    yellow: "yellow"
}



class Brick {
    constructor(x,y,elem,status,bounds){
        this._x = x;
        this._y = y;    
        this._element = elem;
        this._status = status;
    }

    get x(){
        return this._x;
    }
    set x(x){
        this._x = x;
    }

    get y(){
        return this._y;
    }
    set y(y){
        this._y = y;
    }

    get element(){
        return this._element;
    }
    set element(element){
        this._element = element;
    }

    get status(){
        return this._status;
    }
    set status(status){
        this._status = status
        this._element.classList.add(status)
    }

    setBounds(bounds) {
        this._topRight = {
            x: bounds.right,
            y: bounds.top,
        };
        this._bottomRight = {
            x: bounds.right,
            y: bounds.bottom,
        }
        this._bottomLeft = {
            x: bounds.left,
            y: bounds.bottom,
        }
        this._topLeft = {
            x: bounds.left,
            y: bounds.top,
        }

        
    }

    get topRight(){
        return this._topRight;
    }
    get topLeft(){
        return this._topLeft;
    }
    get bottomRight(){
        return this._bottomRight;
    }
    get bottomLeft(){
        return this._bottomLeft;;
    }

    checkCollisionSides(){
        if (
            ball.x - ball.diameter/2< this._topRight.x &&
            ball.x + ball.diameter/2> this._topLeft.x && 
            ball.y - ball.diameter/2< this._bottomLeft.y &&
            ball.y  + ball.diameter/2> this._topLeft.y
        )
    {
        if (this.status === brickStatuses.active)this.status = brickStatuses.yellow;
        else if (this.status === brickStatuses.yellow)this.status = brickStatuses.red;
        else if (this.status === brickStatuses.red)this.status = brickStatuses.destroyed;
        

        if (ball.x < this._topLeft.x  ||
        ball.x > this._topRight.x ){
            console.log("colx")
            ball.speedX *= -1;
        }
        if (
            ball.y < this._topLeft.y ||
            ball.y  > this._bottomLeft.y  
        ) {
            console.log("coly")
            ball.speedY *= -1;
        }
        
    }
         
    }
}


setInterval(()=>{
    numberOfColumns = Math.floor(window.innerWidth / brickWidth);
    root.style.setProperty("--wallColumns",numberOfColumns)

    let length = 0;
    for (let y = 0; y < wall.length;y++){
        for (let x = 0; x < wall[y].length;x++){
            length++;
        }
    }

    if (length < 4 * numberOfColumns ||
        length > 4 * numberOfColumns
        ) 
    {   
        console.log(wall.length)
        console.log(4*numberOfColumns)
        console.log(1)
        wall = [];
        wallElem.innerHTML = '';
        setup()

        for (let y = 0; y < wall.length;y++){
            for (let x=0;x<wall[y].length;x++) {
                wall[y][x].setBounds(wall[y][x].element.getBoundingClientRect())
            }
        } 
        sliderWidth = window.innerWidth/5;
    }
},500)

function setup(){
    ball = new Ball(document.getElementById("ball"),6,6,window.innerWidth/2,window.innerHeight*2/3,30)

    for (let r = 0; r < 4; r++) {
        const row = [];
        for(let c = 0; c < numberOfColumns;c++){
            const element = document.createElement("div");
            const text = document.createTextNode("");
            element.appendChild(text);
            element.className = "brick";
            wallElem.appendChild(element);
            
            const brick = new Brick(c,r,element,brickStatuses.active);
            row.push(brick);
        }
        wall.push(row);
    }
}

setInterval(() => {
    slider.style.left = `${mouseX-sliderWidth/2}px`;

    ball.updateBallPosition();
    ball.checkCollision();  
}, 1000/60);

