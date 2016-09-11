var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var tower-btnImg = document.createElement("img");
tower-btnImg.src = "images/tower-btn.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
setInterval(draw,16);
var tower = {
  x:0,
  y:0
};
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(towerImg,tower.x,tower.y);
  ctx.drawImage(tower-btnImg,608,448,32,32);
}
