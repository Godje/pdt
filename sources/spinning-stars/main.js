(()=>{
  let $ = c.getContext("2d"),
      w = c.width = window.innerWidth,
      h = c.height = window.innerHeight,
      random = n=>Math.random()*n,
      stars = new Array(1000).fill().map(()=>{
        return {r: random(w), s: random(0.01), a: random(Math.PI*2)};
      });

  console.log(stars)
  function loop(){
    $.fillStyle = "rgba(0,0,8,.1)";
    $.fillRect(0,0,w,h);
    stars.forEach(e=>{
      e.a+=e.s;
      $.beginPath();
      $.arc(Math.cos(e.a)*e.r + w/2, Math.sin(e.a)*e.r + h/2, 1,0,Math.PI*2);
      $.closePath();
      $.fillStyle = "white";
      $.fill();
    })

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  window.addEventListener("resize", ()=>{
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  })
})()
