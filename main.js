var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var towerbtnImg = document.createElement("img");
towerbtnImg.src = "images/tower-btn.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
setInterval(draw,16);
var isBuilding = false;
var tower = {
  x:0,
  y:0
};
$("#game-canvas").on("mousemove",function(){
  tower.x = event.offsetX;
  tower.y = event.offsetY;
});
$("#game-canvas").on("click",function(event){
  if(tower.x >= 640-64 &&tower.y >= 480-64){
    console.log("aaaa");
});
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(towerImg,tower.x,tower.y);
  ctx.drawImage(towerbtnImg,640-64,480-64,64,64);
}
