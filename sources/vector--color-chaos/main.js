(function(){
	var canvasBody = document.getElementById("canvas"),
			canvas = canvasBody.getContext("2d"),

			w = canvasBody.width = window.innerWidth,
			h = canvasBody.height = window.innerHeight,
			pi = Math.PI,
			pi2 = pi*2,
			piD2 = pi/2,
			tick = 0,
      Mouse = new Vector2(w/2, h/2),
      Colors = [
				"#2ecc71", //green
				"#3498db", //blue
				"#e67e22", //orange
				"#e74c3c", //red
				"#ecf0f1", //white
				"#9b59b6", //purple
				"#2c3e50", //night-blue
			],
			opts = {
				bgc: "#222",
				showFPS: true,
        spacing: 25,
        size: 6,
        affRad: 50,
        speedLimit: 5
			},
      particles = [],
      Particle = function(X, Y){
        this.pos = new Vector2(X, Y);
        this.speed = new Vector2();
        this.acc = new Vector2();
        this.color = Colors[Math.floor(Math.random()*Colors.length)];
      };
  Particle.prototype.update = function(){
    this.border();
    this.speed.add(this.acc);
    this.pos.add(this.speed);
    this.acc.set(0);

    return this;
  };
  Particle.prototype.border = function(){
    0 > this.pos.x ? (this.speed.x*=-1, this.pos.x = 0) :undefined;
		w < this.pos.x ? (this.speed.x*=-1, this.pos.x = w-opts.size) :undefined;
		0 > this.pos.y ? (this.speed.y*=-1, this.pos.y = 0) :undefined;
		h < this.pos.y ? (this.speed.y*=-1, this.pos.y = h-opts.size) :undefined;
  };
  Particle.prototype.render = function(){
    var size = opts.size;
    canvas.fillStyle = this.color;
    canvas.beginPath();
    canvas.arc(this.pos.x, this.pos.y, size, 0, pi2);
    canvas.fill();

    return this;
  };
  Particle.prototype.force = function(f){
    var tar = f.copy();
    this.acc.add(tar);

    return this;
  };
  Particle.prototype.runAway = function(t){
    if(this.pos.distanceTo(t)<opts.affRad){
      var tar = t.copy();
      tar.sub(this.pos);
      tar.mult(-1);
      var desired = tar.sub(this.speed);
      tar.limit(opts.speedLimit);
      this.force(desired);
    }
    this.speed.limit(opts.speedLimit);
    this.speed.div(1.05);
    return this;
  };

  function populate(){
    var spacing = opts.spacing;
    particles = [];
    for(var x = spacing/2; x<w; x+=spacing){
      for(var y = spacing/2; y<h; y+=spacing){
        particles.push(new Particle(x, y));
      }
    }
  }
	function setup(){
    populate();
		window.requestAnimationFrame(loop);
	};
	function loop(){
		canvas.fillStyle = opts.bgc;
		canvas.fillRect(0,0,w,h);
    particles.map(function(P){
      P.runAway(Mouse).update().render();
    })
		window.requestAnimationFrame(loop);
	};
	setup();

	window.addEventListener("resize", function(){
		w = canvasBody.width = window.innerWidth;
		h = canvasBody.height = window.innerHeight;
	});
  window.addEventListener("mousemove", function(e){
    Mouse.set(e.pageX, e.pageY);
  })
})();
