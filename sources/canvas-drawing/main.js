var canvasBody = document.getElementById("canvas"),
    canvas = canvasBody.getContext("2d"),

    w = canvasBody.width = window.innerWidth,
    h = canvasBody.height = window.innerHeight,

    opts = {
      radius: 50,
      color: "hsl(hue,100%,40%)"
    },

    tick = 0,
    currentHue = 0,

    painting = false;

canvasBody.addEventListener("mousedown", function(){
  painting = true;
  console.log(painting)
});

canvasBody.addEventListener("mouseup", function(){
  painting = false;
  console.log(painting);
});

canvasBody.addEventListener("mousemove", function(e){
  if(painting){
    var posX = e.pageX,
        posY = e.pageY;

    ++tick;
    if(!(tick%10)){
      if((currentHue !== 356)){
        currentHue++
      } else {
        currentHue = 0;
      }
      console.log("Change");
    }

    currentColor = opts.color.replace("hue", currentHue);
    canvas.fillStyle = currentColor;
    canvas.beginPath();
    canvas.arc(posX, posY, opts.radius, 0, Math.PI * 2);
    canvas.fill();
  }
})
