var canvasBody = document.getElementById("canvas"),
    canvas = canvasBody.getContext("2d"),

    w = canvasBody.width = window.innerWidth,
    h = canvasBody.height = window.innerHeight,

    opts = {
      pixelSize: 20
    },

    color = {
      "+": "black",
      y: "yellow",
      b: "blue",
      r: "red",
      h: "#84401a",
      s: "#ffbd71",
      "-": "rgba(0,0,0,0)"
    },

    picture = [
      "---rrrrrr----",
      "--rrrrrrrrrr-",
      "--hhhsss+s---",
      "-hshssss+sss-",
      "-hshhssss+sss",
      "-hhsssss++++-",
      "---ssssssss--",
      "--rrbrrrr----",
      "-rrrbrrbrrrr-",
      "rrrrbbbbrrrr-",
      "ssrbybbybrss-",
      "sssbbbbbbsss-",
      "ssbbbbbbbbss-",
      "--bbb--bbb---",
      "-hhh----hhh--",
      "hhhh----hhhh-"];

function initArt(){
  for(var i = 0; i < picture.length; i++){
    for(var f = 0; f < picture[i].length; f++){
      newRect(f, i, color[picture[i][f]])
    }
  }
}

function getMaxLength(array) {
  var allLengths = [];
  for( var i = 0; i < array.length; i++ ) {
    allLengths.push(array[i].length)
  }
  return Math.max.apply(null, allLengths);
}

function newRect(col, row, color) {
  canvas.fillStyle = color;
  canvas.fillRect(col*opts.pixelSize, row*opts.pixelSize, opts.pixelSize, opts.pixelSize);
  console.log(col, row)
}

function init(){
  w = canvasBody.width = getMaxLength(picture) * opts.pixelSize;
  h = canvasBody.height = picture.length * opts.pixelSize;
  initArt()
}

init()
