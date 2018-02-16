var canvasBody = document.getElementById("canvas"),
		canvas = canvasBody.getContext("2d"),

		gui = new dat.GUI(),
		w = canvasBody.width = window.innerWidth,
		h = canvasBody.height = window.innerHeight,
		opts = {
			canvas: {
				pAmount: 10,
				bgc: "#222"
			},
			particle: {
				speed: 2,
				directions: [
					[1, 0],
					[0, 1],
					[-1, 0],
					[0, -1]
				],
				size: 10,
				color: "#fff"
			},
			redraw: function(){
				canvas.fillStyle = opts.canvas.bgc;
				canvas.fillRect(0,0,w,h);
			}
		},
		particles = [],
		Particle = function(X, Y){
			this.x = X||0;
			this.y = Y||0;
			this.direction = opts.particle.directions[Math.floor(Math.random()*opts.particle.directions.length)];
			this.recalc = function(){
				this.direction =	opts.particle.directions[Math.floor(Math.random()*opts.particle.directions.length)];
			}
			this.update = function(){
				this.border();
				this.x+= this.direction[0]*opts.particle.speed;
				this.y+= this.direction[1]*opts.particle.speed;
				Math.random() < 0.01 ? this.recalc() : undefined;
			}
			this.render = function(){
				canvas.fillStyle = opts.particle.color;
				canvas.fillRect(this.x, this.y, opts.particle.size, opts.particle.size)
			}
			this.border = function(){
				if(this.x < 0){
						this.direction[0] *= -1;
						this.x = 0;
				}
				if(this.x > w - opts.particle.size){
					this.direction[0] *= -1;
					this.x = w - opts.particle.size;
				}
				if(this.y < 0){
					this.direction[1] *= -1;
					this.y = 0;
				}
				if(this.y > h - opts.particle.size){
					this.direction[1] *= -1;
					this.y = h - opts.particle.size;
				}
			}
		};
function setup(){
	for(var i = 0; i < opts.canvas.pAmount; i++){
		particles.push(new Particle(Math.random()*w, Math.random()*h));
	}
	gui.add(opts, "redraw");
	gui.add(opts.particle, "size", 1, 100).onChange(opts.redraw);
	canvas.fillStyle = opts.canvas.bgc;
	canvas.fillRect(0,0,w,h);
	window.requestAnimationFrame(loop);
}
function loop(){

	particles.map(function(P){
		P.update();
		P.render();
	})
	window.requestAnimationFrame(loop);
}
window.addEventListener("resize", function(){
	w = canvasBody.width = window.innerWidth;
	h = canvasBody.height = window.innerHeight;
});
setup();
