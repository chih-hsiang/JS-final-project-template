var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var towerbtnImg = document.createElement("img");
towerbtnImg.src = "images/tower-btn.png";
var slimeImg = document.createElement("img");
slimeImg.src = "images/slime.gif";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 60;
setInterval(draw,1000/FPS);
var isBuilding = false;
var path = [
  {x: 0, y: 0},
  {x: 352, y: 0},
  {x: 352, y: 32},
  {x: 448, y: 32},
  {x: 448, y: 160},
  {x: 512, y: 160},
  {x: 512, y: 0}
];
var enemy = {
  x:0,
  y:480-32,
  pathDes:0,
  speedx:0,
  speedy:-64,
  move:function(){
    this.x = this.x+this.speedx/FPS;
    this.y = this.y+this.speedy/FPS;
  }
};
var tower = {
  x:0,
  y:0
};
var cursor = {
  x:0,
  y:0
};
$("#game-canvas").on("mousemove",function(){
  tower.x = event.offsetX - event.offsetX%32;
  tower.y = event.offsetY - event.offsetY%32;
});
$("#game-canvas").on("click",function(event){
  if(tower.x >= 640-64 &&tower.y >= 480-64){
    if(isBuilding == false){
      isBuilding = true;
    }else if(isBuilding == true){
      isBuilding = false;
    }
  }else if(isBuilding == true){
    cursor.x = tower.x;
    cursor.y = tower.y;
    draw();
  }
});
function draw(){
  ctx.drawImage(bgImg,0,0);
  if(isBuilding == true){
    ctx.drawImage(towerImg,tower.x,tower.y);
  }
  ctx.drawImage(towerImg,cursor.x,cursor.y);
  ctx.drawImage(towerbtnImg,640-64,480-64,64,64);
  ctx.drawImage(slimeImg,enemy.x,enemy.y);
  enemy.move();
}
function isCollided(pathx,pathy,x,y,speed){
  if(pathx >= x && pathx <= x+speed && pathy >= y && pathy <= y+speed){
    return true;
  }else{
    return false;
  }
}
