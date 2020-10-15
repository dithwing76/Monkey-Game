
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var startframe
var floor
var END=0
var PLAY=1
var gameState = PLAY

function preload(){
  createCanvas(600,600)
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(100,300,40,60)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
  monkey.setCollider("circle",0,0,300)
  monkey.debug=false
  
  floor=createSprite(300,350,600,10)
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
  startframe=frameCount
}


function draw() {
  background("white")
  if (gameState===PLAY){
    if(keyDown("space")&&monkey.y>300){
      monkey.velocityY=-20
    }
    monkey.velocityY=monkey.velocityY+1
    monkey.collide(floor)
    createObstacle()
    createBanana()
    if(monkey.isTouching(obstacleGroup)){
      monkey.y=monkey.y-10
      monkey.scale=monkey.scale-0.02
      obstacleGroup.destroyEach()
      if(monkey.scale<0.01){
        gameState=END
      }
        
    }
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach()
      monkey.scale =monkey.scale+0.01

    }
    if(frameCount%30===0){
      score = score+1
      
    }
  }else if(gameState===END){
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setVelocityXEach(0)
    FoodGroup.setLifetimeEach(-1)
    text("you lost",200,200)
  }
  
  drawSprites()
  text(score,40,300)
}
function createObstacle(){
  if(frameCount%100===0){
    var obstacle=createSprite(600,340)
    obstacle.addImage("obstacle",obstaceImage)
    obstacle.scale=0.1
    obstacleGroup.add(obstacle)
    
    obstacleGroup.setVelocityXEach(-5)
    obstacleGroup.setLifetimeEach(120)
  }
}
function createBanana(){
  if(frameCount%200===0){
    var banana=createSprite(600,random(100,200))
    banana.addImage("dinner",bananaImage)
    banana.scale=0.1
    FoodGroup.add(banana)
    
    FoodGroup.setVelocityXEach(-10)
    FoodGroup.setLifetimeEach(60)
  }
}


