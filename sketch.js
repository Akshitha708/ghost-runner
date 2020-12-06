var climberGroup, doorGroup, invisibleClimberGroup;
var gameState = "play"
var score = 0;

function preload() {
 ghostimage1 = loadImage("ghost-jumping.png")
 ghostimage2 = loadImage("ghost-standing.png")
 towerimage = loadImage("tower.png")
 doorimage = loadImage("door.png")
 climberimage = loadImage("climber.png")
}

function setup() { 
  createCanvas (500, 600)
  
  towerSprite = createSprite(250, 200)
  towerSprite.addImage(towerimage)
  towerSprite.scale = 0.9
  
  ghostSprite = createSprite(75, 50)
  ghostSprite.addImage(ghostimage2)
  ghostSprite.scale = 0.3
  
  climberGroup = createGroup();
  doorGroup = createGroup();
  invisibleClimberGroup = createGroup();
}

function draw() {
  background(0);
  
  score = score + 1;
  
  if(gameState === "play"){
    
    
   if(keyDown("space")){
     ghostSprite.velocityY = -8
   }
    
    ghostSprite.velocityY = ghostSprite.velocityY+0.5
  
   if(keyDown("right_arrow") &&  ghostSprite.x<430 ){
     ghostSprite.x = ghostSprite.x+5
   }
    
    if(keyDown("left_arrow")&& ghostSprite.x>60){
    ghostSprite.x = ghostSprite.x-5
   }
    
    if(frameCount % 150 === 0)
      
    spawndoors();
    
    if(ghostSprite.isTouching(climberGroup)){
    ghostSprite.velocityY = 0
   }
    
    if(ghostSprite.isTouching(invisibleClimberGroup)){
    gameState = "end"
    }
    
    
    
  }
  else if(gameState === "end"){
    
    invisibleClimberGroup.destroyEach();
    climberGroup.destroyEach();
    doorGroup.destroyEach(); 
    towerSprite.visible = false;
    ghostSprite.visible = false;
    textSize (50);
    fill ("yellow");
    text ("game over", 150, 250);
    textSize (18);
    text ("press r to restart", 200, 350)
    if(keyDown("r")){
      reset();
    }
    
  }
    
  drawSprites();
  fill ("white");
  textSize (20);
  text("survival time "+score, 30, 40);
  
}
function reset(){
  gameState = "play";
  towerSprite.visible = true;
  ghostSprite.visible = true;
  score = 0;
}
function spawndoors(){
  doorSprite = createSprite(random(80, 420), 10)
  doorSprite.addImage(doorimage)
  
  climberSprite = createSprite(doorSprite.x, 20)
  climberSprite.addImage(climberimage)
  
  climberSprite.y = doorSprite.y + 50
  doorSprite.velocityY = 3
 climberSprite.velocityY =  doorSprite.velocityY 
   
  
 climberSprite.lifetime = 250;
 doorSprite.lifetime = 250;
  
  doorGroup.add( doorSprite);
  climberGroup.add(climberSprite);
  
  //doorSprite.depth = 1;
  //ghostSprite.depth = 2
  
  invisibleClimberSprite = createSprite(doorSprite.x, 75, 100, 5);
  invisibleClimberSprite.velocityY = 3;
  invisibleClimberSprite.visible = false;
  invisibleClimberSprite.lifetime = 250;
  
  invisibleClimberGroup.add(invisibleClimberSprite);
}
