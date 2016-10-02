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
  {x:0, y:0},
  {x:352, y:0},
  {x:352, y:32},
  {x:448, y:32},
  {x:448, y:160},
  {x:512, y:160},
  {x:512, y:0}
];
var enemy = {
  x:0,
  y:480-32,
  pathDes:0,
  speedx:0,
  speedy:-64,
  move:function(){
    console.log(isCollided(path[this.pathDes].x,path[this.pathDes].y,this.x,this.y,this.speedx/FPS,this.speedy/FPS));
    if(isCollided(path[this.pathDes].x,path[this.pathDes].y,this.x,this.y,this.speedx/FPS,this.speedy/FPS)){
      console.log("aaaaa");
      this.x = path[this.pathDes].x;
      this.y = path[this.pathDes].y;
      this.pathDes = this.pathDes + 1;
      if(this.x < path[this.pathDes].x){
        console.log("a");
        this.speedx = 64;
        this.speedy = 0;
      }else if(this.x > path[this.pathDes].x){
        console.log("b");
        this.speedx = -64;
        this.speedy = 0;
      }else if(this.y < path[this.pathDes].y){
        console.log("c");
        this.speedy = 64;
        this.speedx = 0;
      }else if(this.y > path[this.pathDes].y){
        console.log("d");
        this.speedy = -64;
        this.speedx = 0;
      }
    }else{
      this.x = this.x+this.speedx/FPS;
      this.y = this.y+this.speedy/FPS;
    }
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
  enemy.move();
  ctx.drawImage(slimeImg,enemy.x,enemy.y);
}
function isCollided(pathx,pathy,x,y,speedx,speedy){
  if(pathx >= x && pathx <= x+speedx && pathy >= y && pathy <= y+speedy){
    return true;
  }else{
    return false;
  }
}
