class Ball {
    constructor(elem,speedX,speedY,x,y,diameter) {
        //use noise to change speed on collision 
        this._element = elem;
        this._speedX = speedX;
        this._speedY = speedY;
        this._x = x;
        this._y = y;
        this._diameter = diameter;
    }

    get element(){
        return this._element;
    }
    set element(element){
        this._element = element;
    }

    get x(){
        return this._x;
    }
    set x(x){
        this._x = x;
    }
    
    get diameter(){
        return this._diameter;
    }
    set diameter(d){
        this._diameter = d;
    }
    

    updateBallPosition(){
        this._x += this._speedX;
        this._y += this._speedY;

        this._element.style.left =`${this._x}px`;
        this._element.style.top = `${this._y}px`;
    }

    checkBrickCollision(){

    }

    checkCollision(){
        console.log(1)
        if (this._x + this._diameter/2 > window.innerWidth || this._x < this._diameter/2) this._speedX*=-1;
        if (this._y + this._diameter/2 > window.innerHeight || this._y < this._diameter/2) this._speedY*=-1;

        //checks slider collision
        if (this._y + this._diameter/2 > window.innerHeight - 50 -sliderHeigth && this._x + this._diameter/2 < slider.getBoundingClientRect().right && this._x - this._diameter/2 > slider.getBoundingClientRect().left) this._speedY*=-1;
    }
} 