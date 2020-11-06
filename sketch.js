//Create variables here
var dogImage,dogImage1,dog;
var database,food,foodStock;

function preload()
{
  //load images here
  dogImage=loadImage("images/Dog.png");
  dogImage1=loadImage("images/happydog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() {  
  background("blue");

  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(dogImage1);
  }
  drawSprites();
  //add styles here
  fill("yellow");
  text("food remaining: "+food,170,200);
  textSize(15);
  text("press up arrow to feed the dog",300,20)
}

function readStock(data){
  food=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}


