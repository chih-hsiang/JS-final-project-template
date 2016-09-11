var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var towerbtnImg = document.createElement("img");
towerbtnImg.src = "images/tower-btn.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
setInterval(draw,16);
var tower = {
  x:0,
  y:0
};
$("#game-canvas").on("mousemove",function(event){
  console.log(tower = {"x:" + event.offsetX + ",y:" + event.offsetY};);
});
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(towerImg,tower.x,tower.y);
  ctx.drawImage(towerbtnImg,640-64,480-64,64,64);
}
