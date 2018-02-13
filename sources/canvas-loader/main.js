(()=>{
  const $ = c.getContext("2d"),
        pi = Math.PI,
        pi2 = pi*2,
        opts = {
          bgc: "rgba(32,32,32,1)",
          radius: 100,
          thickness: 5
        };

  let w = c.width = window.innerWidth,
      h = c.height = window.innerHeight,
      circle;

  class Circle {
    constructor(){
      this.reverse = false;
      this.theta = 0;
    }
    update(){
      this.theta+=.5;

      if(this.theta > pi2){
        this.theta = 0;
        this.reverse ? this.reverse = false : this.reverse = true;
      }
    };

    draw(){
      this.update();

			$.beginPath();

			this.reverse ?
				$.arc(w/2, h/2, opts.radius, this.theta, pi2)
			: $.arc(w/2, h/2, opts.radius, 0, this.theta);

			$.strokeStyle = "red";
			$.lineWidth = opts.thickness;
			$.lineCap = "round";
			$.stroke();
    };
  }

  function setup(){
    circle = new Circle();

    requestAnimationFrame(loop);
  };
  function loop(){
    $.fillStyle = opts.bgc;
    $.fillRect(0,0,w,h);

    circle.draw();

    requestAnimationFrame(loop);
  };
  setup();
})()
