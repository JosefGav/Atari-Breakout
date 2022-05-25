const root = document.querySelector(':root');
const canvas = document.getElementById("canvas");

const wallElem = document.getElementById("wall");
let wall = []

const slider = document.getElementById("slider");
const sliderWidth = canvas.clientWidth/5;
const sliderHeigth = 50;
const brickWidth = 100;
let numberOfColumns;


const brickStatuses = {
    destroyed: "destroyed",
    active: "active",
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
}

setInterval(()=>{
    numberOfColumns = Math.floor(window.innerWidth / brickWidth);
    root.style.setProperty("--wallColumns",numberOfColumns)

    if (wall.length < 4 * numberOfColumns ||
        wall.length > 4 * numberOfColumns
        ) 
    {
        wall = [];
        wallElem.innerHTML = '';
        setup()

        for (let y = 0; y < wall.length;y++){
            for (let x=0;x<wall[y].length;x++) {
                wall[y][x].setBounds(wall[y][x].element.getBoundingClientRect())
            }
        } 
    }
},100)

function setup(){
    for (let r = 0; r < 4; r++) {
        const row = [];
        for(let c = 0; c < numberOfColumns;c++){
            const element = document.createElement("div");
            const text = document.createTextNode("");
            element.appendChild(text);
            element.className = "brick";
            wallElem.appendChild(element);
            
            //element doesnt load into dom before brick is created
            const brick = new Brick(c,r,element,brickStatuses.active);
            row.push(brick);
        }
        wall.push(row);
    }
}

setInterval(() => {
    slider.style.left = `${mouseX-sliderWidth/2}px`;




}, 1000/60);

