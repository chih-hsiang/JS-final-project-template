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
var isBuilding = false;
var hp = 100;
var score = 0;
var money = 250;
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
  this.speed = 32;
  this.speedx = 0;
  this.speedy = -64;
  this.hp = 10;
  this.move = function(){
    if(isCollided(path[this.pathDes].x,path[this.pathDes].y,this.x,this.y,Math.abs(this.speedx/FPS),Math.abs(this.speedy/FPS))){
      this.x = path[this.pathDes].x;
      this.y = path[this.pathDes].y;
      this.pathDes = this.pathDes + 1;
      if(this.pathDes == path.length){
        this.hp = 0;
        hp -= 10;
        return;
      }
      if(this.x < path[this.pathDes].x){
        this.speedx = 2*this.speed;
        this.speedy = 0*this.speed;
      }else if(this.x > path[this.pathDes].x){
        this.speedx = -2*this.speed;
        this.speedy = 0*this.speed;
      }else if(this.y < path[this.pathDes].y){
        this.speedy = 2*this.speed;
        this.speedx = 0;
      }else if(this.y > path[this.pathDes].y){
        this.speedy = -2*this.speed;
        this.speedx = 0*this.speed;
      }
    }else{
      this.x = this.x+this.speedx/FPS;
      this.y = this.y+this.speedy/FPS;
    }
  };
}
var levelOn = null;
var enemies = [];
var towers = [];
var clock = 0;
var tower = {
  x:0,
  y:0
};
function cursor(){
  this.level = 1;
  this.x = 0;
  this.y = 0;
  this.range = 96;
  this.aimingEnemyId = null;
  this.waittime = 1;
  this.shoottime = 1;
  this.damage = 2.5;
  this.searchEnemy = function(){
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
  };
  this.shoot = function(id){
    ctx.beginPath();
    ctx.moveTo(this.x + 16,this.y + 16);
    ctx.lineTo(enemies[id].x + 16,enemies[id].y + 16);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    enemies[id].hp -= this.damage;
  };
}
$("#game-canvas").on("mousemove",function(){
  tower.x = event.offsetX - event.offsetX%32;
  tower.y = event.offsetY - event.offsetY%32;
  if(){
    
  }
});
$("#game-canvas").on("click",function(event){
  if(tower.x >= 640-64 &&tower.y >= 480-64){
    if(isBuilding == false){
      isBuilding = true;
    }else if(isBuilding == true){
      isBuilding = false;
    }
  }else if(isBuilding == true){
    if(money >= 50){
      isBuilding = false;
      var newTower = new cursor();
      newTower.x = tower.x;
      newTower.y = tower.y;
      towers.push(newTower);
      money = money - 50;
    }
  }
});
var intervalID = setInterval(draw,1000/FPS);
function draw(){
  ctx.drawImage(bgImg,0,0);
  if(isBuilding == true){
    ctx.drawImage(towerImg,tower.x,tower.y);
  }
  for(var i = 0;i < towers.length;i++){
    towers[i].searchEnemy();
    if(towers[i].aimingEnemyId != null){
      var id = towers[i].aimingEnemyId;
      ctx.drawImage(crosshairImg,enemies[id].x,enemies[id].y);
    }
    ctx.drawImage(towerImg,towers[i].x,towers[i].y);
  }
  ctx.drawImage(towerbtnImg,640-64,480-64,64,64);
  for(var i = 0;i < enemies.length;i++){
    if(enemies[i].hp <= 0){
      if(enemies[i].pathDes != path.length){
        money = money + 25;
      }
      enemies.splice(i,1);
    }else{
      enemies[i].move();
      ctx.drawImage(slimeImg,enemies[i].x,enemies[i].y);
      if(hp <= 0){
        ctx.font = "72px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER",192,128);
        ctx.font = "24px Arial";
        ctx.fillText("you got",224,224);
        ctx.fillText(score,224,256);
        clearInterval(intervalID);
      }
    }
  }
  clock++;
  if(clock % 80 == 0){
    var newEnemy = new Enemy();
    if(clock >= 400){
      newEnemy.hp = newEnemy.hp + (clock - clock%400)/160;
      newEnemy.speed = newEnemy.speed + (clock - clock%400)/100;
      newEnemy.speedx = 0*newEnemy.speed;
      newEnemy.speedy = -2*newEnemy.speed;
    }
    enemies.push(newEnemy);
  }
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("HP:" + hp,224,24);
  ctx.fillText("score:" + score,224,48);
  ctx.fillText("money:" + money,224,72);
  score = score + 1;
}
function isCollided(pathx,pathy,x,y,speedx,speedy){
  if(pathx >= x && pathx <= x+speedx && pathy >= y && pathy <= y+speedy){
    return true;
  }else{
    return false;
  }
}
