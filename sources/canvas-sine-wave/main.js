((c)=>{
	let $ = c.getContext('2d'),
		w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		opts = {
			maxHeight: 100,
			radius: 10,
			distance: 10,
			span: Math.PI*2,
			amount: 25,
			speed: Math.PI/180*2
		},
		arr = new Array(opts.amount + 1).fill().map( (el,ind) => {
			return {
				th: opts.span/opts.amount*ind,
				x: (opts.distance + opts.radius*2)*ind
			}
		}),
		width = (opts.distance + opts.radius*2)*opts.amount;
	function draw(){
		$.fillStyle = "#222";
		$.fillRect(0,0,w,h);
		arr.forEach((el,ind)=>{
			el.th += opts.speed;
			$.beginPath();
			$.arc(el.x + w/2 -width/2 , Math.sin(el.th)*opts.maxHeight + h/2, opts.radius, 0, Math.PI*2);
			$.closePath();
			$.fillStyle = "hsl("+el.th*30+",50%,50%)"
			$.fill();
		})
		requestAnimationFrame(draw)
	}
	draw();
})(c)
