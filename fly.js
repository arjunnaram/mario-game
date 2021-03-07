class Fly{
    constructor(x,y){
      this.x = x;
      this.y = y;
      
      this.speedX = random(-6,6);
      this.speedY =  random(-3,3);
      
      if(this.speedX < 0){
        this.direction = -1;
      }
      else{
        this.direction = 1;
      }
      
    }
    update(){
      this.x+= this.speedX;
      if(this.x<0 || this.x>width){
        this.speedX *= -1;
        this.direction *= -1;
      }
      this.y+=  this.speedY;
       if(this.y<0 || this.y>height){
        this.speedY*= -1;
      }
    }
    display(){
      push();
      translate(this.x,this.y);
      scale(this.direction,0.5);
      imageMode(CENTER);
      image(flyImage,0,0);
      pop();
      
    }
  }