((c)=>{
	let $ = c.getContext("2d"),
		w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		opts = {
			grid: 19,
			speed: Math.PI/180,
			size: 40,
			color: "white",
			bgc: "#222"
		},
		time = 0,
		arr = [],
		getDistance = function(p1, p2){
			let a = p1.x - p2.x,
				b = p1.y - p2.y;
			return Math.sqrt( a*a + b*b );
		},
		{sin, sqrt, random, cos} = Math;

	function setup(){
		for(let y = 0, a = 0; y < opts.grid; y++, a++){
			for(let x = 0; x < opts.grid - (a%2==0?0:1); x++){
				arr.push( {x: a%2 == 0? x : x + .5, y} );
			}
		}
		loop();
	}
	function loop(){
		$.fillStyle = opts.bgc;
		$.fillRect(0,0,w,h);
		time += opts.speed;
		let center = {x: opts.grid/2 -.5, y: opts.grid/2 -.5};
		let drawSquare = function ($, square, distance){
			let size = ( sin(time - (distance/3)) ) * opts.size;
			$.save();
			$.translate(w/2 - opts.grid*opts.size/2, h/2 - opts.grid*opts.size/2 + opts.size/2);
			let color = `hsl(${ (time - (distance/2))*180/20 }, 60%, 50%)`;
			$.fillStyle = color;
			$.shadowBlur = 10;
			$.shadowColor = color;
			$.fillRect(
				-size/2 + opts.size* square.x,
				-size/2 + opts.size* square.y,
				size,
				size
			);
			$.restore();
		}
		arr.forEach( (square)=>{
			let distance = getDistance(square, center);
			drawSquare($, square, distance);
		} )

		requestAnimationFrame(loop);
	}
	setup();
})(c)

