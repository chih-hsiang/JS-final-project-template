var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var towerbtnImg = document.createElement("img");
towerbtnImg.src = "images/tower-btn.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
setInterval(draw,16);
$("#canvas").mousemove(function(event){
  console.log("x:" + event.offsetX + ",y:" + event.offsetY);
});
var tower = {
  x:0,
  y:0
};
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(towerImg,tower.x,tower.y);
  ctx.drawImage(towerbtnImg,640-64,480-64,64,64);
}
