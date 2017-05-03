var canvasBody = document.getElementById("canvas"),
    canvas = canvasBody.getContext("2d"),

    w = canvasBody.width = window.innerWidth,
    h = canvasBody.height = window.innerHeight,

    opts = {
      bulbSize: 60,
      bulbLightColor: "#fcfcfc",
      bgc: "rgba(66,124,245,alpha)",
      bgcRedrawOpacity: 0.05,

      blinkChance: 0.5
    },

    tick = 0,
    bulbs = [],
    baseRad = Math.PI * 2,

    hAmount = Math.floor(w / opts.bulbSize),
    vAmount = Math.floor(h / opts.bulbSize);


function loop(){
  window.requestAnimationFrame(loop);

  ++tick;

  canvas.fillStyle = opts.bgc.replace("alpha", opts.bgcRedrawOpacity);
  canvas.fillRect(0,0,w,h);

  if(Math.random() < opts.blinkChance){
    var randomV = Math.floor(Math.random() * vAmount),
        randomH = Math.floor(Math.random() * hAmount);

    bulbs[randomV][randomH].spark();
  }
};

function initStuff(){
  console.log(vAmount, hAmount);
  for(var i = 0; i < vAmount; i++){
    var lineData = [];
    for( var f = 0; f < hAmount; f++){
      lineData.push( new Bulb() );
    }
    bulbs.push(lineData);
  }
  for( var b = 0; b < vAmount; b++){
    for( var g = 0; g < hAmount; g++){
      bulbs[b][g].reset(g, b);
    }
  }

  loop()
};

function Bulb(){


};

Bulb.prototype.reset = function (xPos, yPos) {
  this.radius = opts.bulbSize/2;
  this.color = opts.bulbLightColor;

  this.x = xPos * opts.bulbSize + this.radius;
  this.y = yPos * opts.bulbSize + this.radius;
};

Bulb.prototype.spark = function (){
  canvas.fillStyle = this.color;
  canvas.beginPath();
  canvas.arc( this.x, this.y, this.radius, 0, baseRad);
  canvas.fill();
};

initStuff();
