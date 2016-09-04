var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
setTimeout(draw,1000);
var tower = {
  x:0;
  y:0;
}
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(towerImg,tower.x,tower.y);
}
