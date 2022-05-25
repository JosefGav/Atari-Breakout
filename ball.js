class Ball {
    constructor(elem,speedX,speedY,x,y,radius) {
        //use noise to change speed on collision 
        this._element = elem;
        this._speedX = speedX;
        this._speedY = speedY;
        this._x = x;
        this._y = y;
        this._radius = radius;
    }

    updateBallPosition(){
        this._x += this._speedX;
        this._y += this._speedY;

        this._element.style.left =`${this._x}px`;
        this._element.style.top = `${this._y}px`;
    }
} 