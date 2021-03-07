var tHunter,tHunterImg
var bottleImage,bottlesGroup
var score=0;
var invGround;
var obstacleImage, obstaclesGroup;
var gameState = 'play'

function preload(){
    tHunterImg=loadAnimation("images/mario1.png","images/mario2.png","images/mario3.png")
    backgroundImage = loadImage("images/background.jpg");
    bottleImage = loadImage("images/Energydrink.jpg")

    obstacleImage = loadAnimation("images/obstacle1.png","images/obstacle2.png","images/obstacle3.png","images/obstacle4.png");
    flyImage = loadImage("images/sprite_0.png")
    jumpSound=loadSound("images/jump.mp3")
    dieSound=loadSound("images/die.mp3")
    scoreSound=loadSound("images/checkPoint.mp3")
  }

function setup() {
  createCanvas(800,400);

  
  
  ground = createSprite(0,00,800,400);
  ground.addImage("ground",backgroundImage);
  ground.x = ground.width /2;
  ground.scale=1.3;
  ground.velocityX=-4;
  tHunter=createSprite(84, 230, 50, 50);
 // backgroundImage = loadImage("background.jpg");
  tHunter.addAnimation("running",tHunterImg)
  tHunter.scale=0.5
  invGround = createSprite(100,320,400,20);
  invGround.visible=false;

  fly1 = new Fly(width/4,height/4)
  fly = new Fly(width/2,height/2)

  bottlesGroup = new Group();
  obstaclesGroup = new Group();


}

function draw() {
  //background() 
if (gameState==='play'){

  

  if (ground.x<150){
    ground.x=ground.width/2
  }
console.log(tHunter.y)  
  if (keyDown("space") && tHunter.y > 200){
    tHunter.velocityY=-14;
    jumpSound.play();
  }
  tHunter.velocityY+=0.8

  
     
  for (var i = 0; i < bottlesGroup.length; i++) {
    if (bottlesGroup.get(i).isTouching(tHunter)) {
      bottlesGroup.get(i).destroy()
      score++;
      scoreSound.play();

    }
  }

   // checking for collision of mario with obstacles
   if (obstaclesGroup.isTouching (tHunter)){
     dieSound.play();
        

    gameState = "end";
    bottlesGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    tHunter.velocityY=0; 
    ground.velocityX=0;
    bottlesGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
   }

  spawnBottle();
  spawnObstacles()
}
if (gameState==='end') {

console.log("game over")
}
tHunter.collide(invGround)

  drawSprites();

  fly.update();
  fly.display();
  fly1.update();
  fly1.display();


  text("Energydrinks "+score,600,50)
}


function spawnBottle(){

  if (frameCount % 80===0){
    var bottle =createSprite(800,200,20,20)
    bottle.y = Math.round(random(100,250))
    bottle.addImage(bottleImage)
    bottle.scale=0.2
    bottle.velocityX=-4
    bottle.lifetime = 200
    bottlesGroup.add(bottle)

  }   
}
//function to spawn obstacles        
function spawnObstacles(){
  
  if (frameCount%60===0) {

      var obstacle = createSprite(800,280,10,10);
      obstacle.addAnimation("moving",obstacleImage);
      obstacle.scale=1;
      obstacle.velocityX=- (6 + score/10);
      obstacle.lifetime=200;
      obstaclesGroup.add(obstacle);         
    
  }
  
}
// function spawngarbage(){
  
//   if (frameCount%60===0) {

//       var obstacle = createSprite(800,280,10,10);
//       obstacle.addAnimation("moving",obstacleImage);
//       obstacle.scale=1;
//       obstacle.velocityX=- (6 + score/10);
//       obstacle.lifetime=200;
//       obstaclesGroup.add(obstacle);         
    
//   }
  
// }


