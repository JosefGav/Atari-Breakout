
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
    get y(){
        return this._y;
    }
    set y(y){
        this._y = y;
    }
    
    get diameter(){
        return this._diameter;
    }
    set diameter(d){
        this._diameter = d;
    }

    get speedX(){
        return this._speedX;
    }
    set speedX(speedX){
        this._speedX = speedX;
    }
    
    get speedY(){
        return this._speedY;
    }
    set speedY(speedY){
        this._speedY = speedY;
    }
    

    updateBallPosition(){
        this._x += this._speedX;
        this._y += this._speedY;

        this._element.style.left =`${this._x}px`;
        this._element.style.top = `${this._y}px`;
    }

    checkCollision(){
        if (this._x + this._diameter/2 > window.innerWidth || this._x < this._diameter/2) this._speedX*=-1;
        if (this._y < this._diameter/2) this._speedY*=-1;

        //checks slider collision
        if (this._y + this._diameter/2 > window.innerHeight - 50 -sliderHeigth && this._x - this._diameter/2 < slider.getBoundingClientRect().right && this._x + this._diameter/2 > slider.getBoundingClientRect().left && this._y < window.innerHeight - 100) {
            if (this._x < (slider.getBoundingClientRect().right+slider.getBoundingClientRect().left)/2 && Math.abs(this._speedX) === this._speedX) {
                this._speedY*=-1;
                this._speedX*=-1;
            } else if (this._x > (slider.getBoundingClientRect().right+slider.getBoundingClientRect().left)/2 && Math.abs(this._speedX) === this._speedX * -1) {
                this._speedY*=-1;
                this._speedX*=-1;
            } else if (this._x > (slider.getBoundingClientRect().right+slider.getBoundingClientRect().left)/2 && Math.abs(this._speedX) === this._speedX) {
                this._speedY*=-1;
            } else if (this._x < (slider.getBoundingClientRect().right+slider.getBoundingClientRect().left)/2 && Math.abs(this._speedX) === this._speedX * -1) {
                this._speedY*=-1;
            }
        }

        for (let y = 0; y < wall.length;y++){
            for (let x = 0; x < wall[y].length;x++){
                if (wall[y][x].status != brickStatuses.destroyed) {
                    wall[y][x].checkCollisionSides(x,y)
                }
            }
        }
    }
} 
