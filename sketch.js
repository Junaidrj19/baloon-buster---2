var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud , cloudImage
var  obstacle , obstacle1Img , obstacle2Img ,obstacle3Img , obstacle4Img , obstacle5Img , obstacle6Img
var obstacleGroup , cloudsGroup
var play=1 
var end=0
var gameState=play
var score=0
var Gameover , GameoverImg
var Restart , RestartImg
var trexStandImg
var dieSound , checkpointSound , jumpSound


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png")
  obstacle1Img = loadImage("obstacle1.png")
  obstacle2Img = loadImage("obstacle2.png")
  obstacle3Img = loadImage("obstacle3.png")
  obstacle4Img = loadImage("obstacle4.png")
  obstacle5Img = loadImage("obstacle5.png")
  obstacle6Img = loadImage("obstacle6.png")
  GameoverImg=loadImage("gameOver.png")
  RestartImg=loadImage("restart.png")
  trexStandImg=loadAnimation("trex1.png")
  dieSound=loadSound("die.mp3")
  checkpointSound=loadSound("checkpoint.mp3")
  jumpSound=loadSound("jump.mp3")
}

function setup() {
  createCanvas(600, 200);

  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("standing",trexStandImg)
  edges = createEdgeSprites();
  trex.scale = 0.5;
  trex.x = 50
  ground = createSprite(600,180,600,20)
  ground.addImage(groundImage)
  ground.velocityX=-5
  trex.debug=false
  trex.setCollider("rectangle",0,0,250,50)
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(4+score/100);

  //create a invisibleGround
  invisibleGround = createSprite(200,195,600,20);
  invisibleGround.visible = false;

  Gameover=createSprite(300,100,50,50)
  Gameover.addImage(GameoverImg)
  Gameover.scale=0.5
  Gameover.visible=false

  Restart=createSprite(300,120,50,50)
  Restart.addImage(RestartImg)
  Restart.scale=0.5
  Restart.visible=false

   
  obstacleGroup = new Group()
  
  cloudsGroup = new Group()
}

function draw() {
  background(220);

  if(gameState===play){
    ground.velocityX = -(4+score/100);
    if(ground.x<0){
      ground.x=ground.width/2
      }
      
      trex.velocityY = trex.velocityY + 0.5;
      createcloud()
      createobstacle()
      if(obstacleGroup.isTouching(trex)){
        trex.velocityY = -10;
        jumpSound.play();
      }
      if(score<0&&score%100==0){
        checkpointSound.play()
      }
  }
  else if(gameState===end){
  ground.velocityX=0
  score=0
  cloudsGroup.setVelocityXEach(0)
  obstacleGroup.setVelocityXEach(0)
  Gameover.visible=true
  Restart.visible=true
  cloudsGroup.setLifetimeEach=-1
  obstacleGroup.setLifetimeEach=-1
  trex.changeAnimation("standing",trexStandImg)
  }

  //jump when the space button is pressed
  if (keyDown("space") && trex.y>150) { 
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  trex.collide(invisibleGround);
  drawSprites();
}

function createcloud(){
  if(frameCount%60==0){
   cloud = createSprite(600,60,50,50)
   cloud.velocityX=-(3+score/100)
   cloud.addImage(cloudImage)
   cloud.scale=0.5  
   cloud.y=Math.round(random(60,100))
   cloud.depth=trex.depth-1
   cloud.lifetime=140
   cloudsGroup.add(cloud)
  }   
} 
function createobstacle(){
 if(frameCount%60==0){
   obstacle = createSprite(600,160,50,50)  
   obstacle.velocityX=-(6+score/100)
   var num = Math.round(random(1,6))
   switch(num){
   case 1:obstacle.addImage(obstacle1Img);
   break;
   case 2:obstacle.addImage(obstacle2Img);
   break;
   case 3:obstacle.addImage(obstacle3Img);
   break;
   case 4:obstacle.addImage(obstacle4Img);
   break;
   case 5:obstacle.addImage(obstacle5Img);
   break;
   case 6:obstacle.addImage(obstacle6Img);
   break;

   }
   obstacle.scale=0.5
   obstacleGroup.add(obstacle)
 }
 
 
}    