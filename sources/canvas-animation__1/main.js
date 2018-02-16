var opts = {
    count: 3, //Increases the spawn rate
    size: 50, //Minimal is one
    sizeRandom: 10, //Amount of pixels it can be randomed by
    sparkLife: 0.1, //Decreases the sparks life
    spawnOpacity: 1, //Sparks will spawn at this opacity

    //must be RGBA. alpha stands for opacity, usually 1
    color: "hsl(hue, 100%, 50%)" //The color of sparks.
  },

  canvasBody = document.getElementById("canvas"),
  canvas = canvasBody.getContext("2d"),
  w = canvasBody.width = window.innerWidth,
  h = canvasBody.height = window.innerHeight,

  tick = 0,

  currentHue = 0;

function anim() {
  setTimeout(function() {
    window.requestAnimationFrame(anim)
  }, 1000 / 30 ) //Setting the FPS by dividing the one second by <frames>
  step();

  ++tick;
  if(isNaturalNumber(tick/5)){
    currentHue++;
    console.log("change");
  };
  if(currentHue == 356){
    currentHue = 0;
  }
}

anim() //Calling the animation function

function step() {
  var fillColor = opts.color.replace("hue", currentHue);
  canvas.fillStyle = fillColor;
  for (var i = 0; i < Math.round(opts.count); i++) {
    var random = Math.random() * opts.sizeRandom;
    canvas.fillRect(-(opts.size/2) + Math.random() * w, -(opts.size/2) + Math.random() * h, opts.size + random, opts.size + random)
  }
  canvas.fillStyle = "rgba(255,255,255," + opts.sparkLife + ")"
  canvas.fillRect(0, 0, w, h)
}

window.addEventListener("resize", function(){ //Just in case someone resizes the window
  w = canvasBody.width = window.innerWidth;
  h = canvasBody.height = window.innerHeight;
});

function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}
