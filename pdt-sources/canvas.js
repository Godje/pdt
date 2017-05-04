(function() {
	var canvasBody, $,
			w = window.innerWidth,
			h = window.innerHeight,
			tick = 0,
			pi = Math.PI,
			pi2 = pi*2,
			piD2 = pi/2,
			piD3 = pi/3,
			piD6 = pi/6,
			pi2D3 = pi2/3,
			piDeg = pi/180,
			particles = [],
			canvasStyles = {
				position: "absolute",
				top: "0px",
				left: "0px",
				"background-color": "#222",
				"z-index": -1,
				opacity: 0.25
			},
			Mouse = new Vector2(w/2, h/2),
			mousePressed = false,
			opts = {
				bgc: "#fcfcfc",
				showFPS: false,
				color: "#75b8d4",
				amount: 30,
				thickness: 5,
				radius: 12,
				rotSpeed: 0.4,
				gravity: 0.8,
				populate: function(){
						particles = [];
						for(var i =0; i < opts.amount; particles[i++]= new Shape());
					}
			},
			Shape = function(){
				this.vertices = Math.floor(Math.random()*5);
				this.pos = new Vector2(opts.radius/2 + Math.random()*w - opts.radius, Math.random()*h - opts.radius);
				this.angle=Math.random()*180;
				this.d=Math.random()<.5?1:-1
			};
	Shape.prototype = {
		update: function(){
			this.pos.y-opts.radius-opts.thickness<h?(
				this.pos.y+=opts.gravity,
				this.angle+=opts.rotSpeed*this.d
				):
				this.pos.set(Math.random()*w, -opts.radius);
		},
		render: function(){
			if(this.vertices>0){
				$.beginPath();
				$.moveTo(Math.cos(this.angle*piDeg)*opts.radius+this.pos.x,Math.sin(this.angle*piDeg)*opts.radius+this.pos.y);
				for(var i=1; i<this.vertices;i++){
					var a = pi2/this.vertices*i;
					var aa = this.angle*piDeg;
					$.lineTo(Math.cos(a+aa)*opts.radius+this.pos.x,
									Math.sin(a+aa)*opts.radius+this.pos.y);
				}
				$.closePath();
				$.lineCap = "round";
				$.lineJoin = "round";
				$.lineWidth = opts.thickness;
				$.strokeStyle = opts.color;
				$.stroke();
			} else {
				$.beginPath();
				$.arc(this.pos.x, this.pos.y, opts.radius, 0,pi2);
				$.closePath();
				$.lineWidth = opts.thickness;
				$.strokeStyle = opts.color;
				$.stroke();
			}
		}
	}
	function setup(){
		createCanvas();
		addListeners();
		opts.populate();

		window.requestAnimationFrame(loop);
	}
	function loop(){
		drawBg();
		particles.map(function(S){
			S.update();
			S.render();
		})
		window.requestAnimationFrame(loop);
	}
	function createCanvas() {
		var el = document.createElement("canvas"),
				ctx = el.getContext("2d");
		for (var style in canvasStyles) {
			el.style[style] = canvasStyles[style];
		}
		document.body.appendChild(el);
		canvasBody = el;
		$ = ctx;
		canvasBody.width = w;
		canvasBody.height = h;
		document.body.style["overflow"] = "hidden"
		return [el, ctx];
	}
	function drawBg() {
		$.fillStyle = opts.bgc;
		$.fillRect(0, 0, w, h);
	}

	function addListeners(){
		window.addEventListener("resize", resize);
		window.addEventListener("mousemove", mouseMove);
		canvasBody.addEventListener("mousedown", mouseDown);
		canvasBody.addEventListener("mouseup", mouseUp);
		canvasBody.addEventListener("touchmove", touchMove);
		canvasBody.addEventListener("touchstart", touchStart);
		canvasBody.addEventListener("touchend", touchEnd);
	}
	function resize(){
		w = canvasBody.width = window.innerWidth;
		h = canvasBody.height = window.innerHeight;
	}
	function mouseDown(event){
		mousePressed = true;
		Mouse.set(event.pageX, event.pageY);
	}
	function mouseUp(event){
		mousePressed = false;
	}
	function mouseMove(event){
		Mouse.set(event.pageX, event.pageY);
	}
	function touchMove(event){
		var touches = event.changedTouches;
		Mouse.set(touches[0].pageX, touches[0].pageY);
	}
	function touchStart(event){
		e.preventDefault();
		mousePressed = true;
		touchMove(event);
	}
	function touchEnd(event){
		mousePressed = false;
	}
	setup();
})()
