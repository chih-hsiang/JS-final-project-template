var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
varctx = canvas.getContext("2d");
setTimeout(draw,1000);
function draw(){
  ctx.drawImage(bgImg,0,0);
}
