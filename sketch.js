var ship ,water;
var shipImg , bgImg , waterImg , helicopterImg , bombImg, gameOverImg;
var score;

var helicopterGroup , bombGroup ; 
var PLAY =1;
var END = 0;
var gamestate = PLAY ;


function preload(){
    shipImg = loadAnimation("images/ship.png" , "images/ship2.png", "images/ship.png");
    bgImg =loadImage("images/skybg.jpg");
    waterImg = loadImage ("images/waterbg.png");
    helicopterImg = loadImage("images/helicopter.png");
    bombImg = loadImage("images/bomb.png");
    gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
    createCanvas(800,500);
  
//creating water ground
    water = createSprite(400,380,20,20);
    water.addImage("water", waterImg);

    bombGroup = new Group();
    helicopterGroup = new Group();

    //slower speed of animation
    shipImg.frameDelay= 10;


    //water.debug = true;
    //console.log(water.width);


    //creating ship
    ship = createSprite(500,350,30,20);
    ship.addAnimation("ship",shipImg);
    ship.addImage("gameOver",gameOverImg);
    ship.scale =0.4;
    score = 0;



}

function draw(){

    background(bgImg);



    if (gamestate === PLAY){

        score = Math.round(frameCount/6);
        water.x = water.x - 3;
        if(water.x<400){
            water.x = water.width/2;
        }
        if(keyDown(LEFT_ARROW) && ship.x > 80){
            ship.x = ship.x -5 ;
        }
        if(keyDown(RIGHT_ARROW) && ship.x < 700){
            ship.x = ship.x + 5 ;
        }
        
        spawnHelicopter();
        if(ship.isTouching(bombGroup)){
            gamestate = END;
        }
          

    }

    if (gamestate === END){

        water.velocityX = 0;
       bombGroup.destroyEach();
       helicopterGroup.destroyEach();
        ship.changeAnimation("gameOver",gameOverImg);
        ship.x = 400;



    }
    
    textSize(20);
    fill("yellow");
    text("score  :  "+ score ,600,50);

    

    
    
    drawSprites();




}
function spawnHelicopter(){

    if (frameCount % 200 == 0){
        var xPos = (Math.round(random(50,750)));
        var helicopter = createSprite(xPos, 40 ,20 ,20);
        helicopter.addImage("helicopter",helicopterImg);
        helicopter.scale =0.5;
        helicopter.velocityX = -5;
        helicopterGroup.add(helicopter);
        helicopter.lifetime = 160;


        var bomb = createSprite(helicopter.x , 40 ,20,20);
        bomb.addImage("bomb",bombImg);
        bomb.scale = 0.1;
        bomb.velocityY = 5;
        bombGroup.add(bomb);
        bomb.lifetime = 100;

    }
    
}