(function(){
	var canvasBody = document.getElementById("canvas"),
			canvas = canvasBody.getContext("2d"),
			w, h,
			resize = function(){
				w = canvasBody.width = window.innerWidth;
				h = canvasBody.height = window.innerHeight;
			},
			pi = Math.PI,
			pi2 = pi*2,
			piD2 = Math.PI/2,
			tick = 0,
			opts = {
				canvas: {
					amount: 30,
					bgc: "rgba(20,20,20,0.2)"
				},
				size: 10,
        minSpeed: 2,
        addedSpeed: 2
			},
			Colors = [
				"#2ecc71", //green
				"#3498db", //blue
				"#e67e22", //orange
				"#e74c3c", //red
				"#ecf0f1", //white
				"#9b59b6", //purple
				"#2c3e50", //night-blue
			],
			particles = [],
			Mouse = new Vector2(w/2, h/2),
			Particle = function(X, Y){
				this.pos = new Vector2(X||0, Y||0);
				this.acc = new Vector2();
				this.speed = new Vector2();
				this.color = Colors[Math.floor(Math.random()*Colors.length)];
				this.maxSpeed = opts.minSpeed + Math.random()*opts.addedSpeed;
			};

	Particle.prototype.update = function(){
		this.speed.add(this.acc);
		this.pos.add(this.speed);
		this.acc.set(0);

		return this;
	}
	Particle.prototype.render = function(){
		canvas.fillStyle = this.color;
		//canvas.fillRect(this.pos.x, this.pos.y, opts.size, opts.size);
    var d = this.speed.direction();
    canvas.beginPath();
    canvas.moveTo(Math.cos(d)*opts.size+this.pos.x, Math.sin(d)*opts.size+this.pos.y);
    canvas.lineTo(Math.cos(d+piD2)*(opts.size/2)+this.pos.x, Math.sin(d+piD2)*(opts.size/2)+this.pos.y);
    canvas.lineTo(Math.cos(d-piD2)*(opts.size/3)+this.pos.x, Math.sin(d-piD2)*(opts.size/3)+this.pos.y);
    canvas.lineTo(Math.cos(d)*opts.size+this.pos.x, Math.sin(d)*opts.size+this.pos.y);
    canvas.closePath();
    canvas.fill();
	}
	Particle.prototype.border = function(){}
	Particle.prototype.lookFor = function(tar){
    var dir = tar.copy();
    dir.sub(this.pos);
    var steer = dir.sub(this.speed);
    steer.limit(this.maxSpeed);
    this.force(steer);
    //Desired = Target - velocity
    return this;
  }
	Particle.prototype.force = function(f){
    this.acc.add(f);
    return this;
  }

	function populate(){
		particles = [];
		for(var i = 0; i < opts.canvas.amount; particles[i++] = new Particle(Math.random()*w, Math.random()*h));
	}
	function setup(){
		populate();
		window.requestAnimationFrame(loop);
	}
	function loop(){
		canvas.fillStyle = opts.canvas.bgc;
		canvas.fillRect(0,0,w,h);
		particles.map(function(P){
			P.lookFor(Mouse).update().render();
		})
		window.requestAnimationFrame(loop);
	}
	window.addEventListener("resize", resize);
  window.addEventListener("mousemove", function(e){
    Mouse.set(e.pageX, e.pageY);
  })
	resize();
	setup();
})()
