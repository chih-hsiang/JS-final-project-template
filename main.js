var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var towerbtnImg = document.createElement("img");
towerbtnImg.src = "images/tower-btn.png";
var slimeImg = document.createElement("img");
slimeImg.src = "images/slime.gif";
var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 60;
setInterval(draw,1000/FPS);
var isBuilding = false;
var path = [
  {x:0, y:0},
  {x:96, y:0},
  {x:96, y:32},
  {x:128, y:32},
  {x:128, y:64},
  {x:192, y:64},
  {x:192, y:96},
  {x:256, y:96},
  {x:256, y:128},
  {x:288, y:128},
  {x:288, y:192},
  {x:160, y:192},
  {x:160, y:160},
  {x:128, y:160},
  {x:128, y:128},
  {x:64, y:128},
  {x:64, y:224},
  {x:96, y:224},
  {x:96, y:320},
  {x:64, y:320},
  {x:64, y:416},
  {x:224, y:416},
  {x:224, y:352},
  {x:160, y:352},
  {x:160, y:288},
  {x:256, y:288},
  {x:256, y:256},
  {x:352, y:256},
  {x:352, y:192},
  {x:384, y:192},
  {x:384, y:64},
  {x:320, y:64},
  {x:320, y:0},
  {x:480, y:0},
  {x:480, y:64},
  {x:544, y:64},
  {x:544, y:128},
  {x:448, y:128},
  {x:448, y:192},
  {x:480, y:192},
  {x:480, y:288},
  {x:416, y:288},
  {x:416, y:320},
  {x:320, y:320},
  {x:320, y:384},
  {x:288, y:384},
  {x:288, y:448},
  {x:512, y:448},
  {x:512, y:320},
  {x:608, y:320},
  {x:608, y:32}
];
function Enemy(){
  this.x = 0;
  this.y = 480-32;
  this.pathDes = 0;
  this.speedx = 0;
  this.speedy = -64;
  this.hp = 10;
  this.move = function(){
    if(isCollided(path[this.pathDes].x,path[this.pathDes].y,this.x,this.y,Math.abs(this.speedx/FPS),Math.abs(this.speedy/FPS))){
      this.x = path[this.pathDes].x;
      this.y = path[this.pathDes].y;
      this.pathDes = this.pathDes + 1;
      if(this.x < path[this.pathDes].x){
        this.speedx = 64;
        this.speedy = 0;
      }else if(this.x > path[this.pathDes].x){
        this.speedx = -64;
        this.speedy = 0;
      }else if(this.y < path[this.pathDes].y){
        this.speedy = 64;
        this.speedx = 0;
      }else if(this.y > path[this.pathDes].y){
        this.speedy = -64;
        this.speedx = 0;
      }
    }else{
      this.x = this.x+this.speedx/FPS;
      this.y = this.y+this.speedy/FPS;
    }
  };
}
var hp = 100;
var score = 0;
var money = 0;
var enemies = [];
var clock = 0;
var tower = {
  x:0,
  y:0
};
var cursor = {
  x:0,
  y:0,
  range:96,
  aimingEnemyId:null,
  waittime:1,
  shoottime:1,
  damage:5,
  searchEnemy:function(){
    this.shoottime -= 1/FPS;
    for(var i = 0;i < enemies.length;i++){
      var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2)+Math.pow(this.y-enemies[i].y,2));
      if(distance <= this.range){
        this.aimingEnemyId = i;
        if(this.shoottime <= 0){
          this.shoot(i);
          this.shoottime = this.waittime;
        }
        return;
      }
    }
    this.aimingEnemyId = null;
  },
  shoot:function(id){
    ctx.beginPath();
    ctx.moveTo(this.x + 32,this.y + 32);
    ctx.lineTo(enemies[id].x + 32,enemies[id].y + 32);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    enemies[id].hp -= this.damage;
  }
};
$("#game-canvas").on("mousemove",function(){
  tower.x = event.offsetX - event.offsetX%32;
  tower.y = event.offsetY - event.offsetY%32;
});
$("#game-canvas").on("click",function(event){
  enemies[0].hp = 0;
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
  for(var i = 0;i < enemies.length;i++){
    if(enemies[i].hp <= 0){
      enemies.splice(i,1);
    }else{
      enemies[i].move();
      ctx.drawImage(slimeImg,enemies[i].x,enemies[i].y);
    }
  }
  clock++;
  if(clock % 80 == 0){
    var newEnemy = new Enemy();
    enemies.push(newEnemy);
  }
  cursor.searchEnemy();
  if(cursor.aimingEnemyId != null){
    var id = cursor.aimingEnemyId;
    ctx.drawImage(crosshairImg,enemies[id].x,enemies[id].y);
  }
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("HP:" + hp,160,25);
  ctx.fillText("score:" + score,160,50);
  ctx.fillText("money:" + money,160,75);
}
function isCollided(pathx,pathy,x,y,speedx,speedy){
  if(pathx >= x && pathx <= x+speedx && pathy >= y && pathy <= y+speedy){
    return true;
  }else{
    return false;
  }
}
