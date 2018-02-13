(function() {
	var canvasBody = document.getElementById("canvas"),
		canvas = canvasBody.getContext("2d"),

		w = canvasBody.width = window.innerWidth,
		h = canvasBody.height = window.innerHeight,
		gui = new dat.GUI(),
		pi = Math.PI,
		pi2 = pi * 2,
		piD2 = pi / 2,
		tick = 0,
		opts = {
			bgc: "#222",
			showFPS: true
		};

	function setup() {

		stats = new Stats();
		stats.showPanel(0);
		gui.add(opts, 'showFPS')
		document.body.appendChild(stats.domElement);
		window.requestAnimationFrame(loop);
	};

	function loop() {
		stats.begin();
		canvas.fillStyle = opts.bgc;
		canvas.fillRect(0, 0, w, h);

		!opts.showFPS ? stats.domElement.style.display = "none" : stats.domElement.style.display = "block";
		window.requestAnimationFrame(loop);
		stats.end();
	};
	setup();

	window.addEventListener("resize", function() {
		w = canvasBody.width = window.innerWidth;
		h = canvasBody.height = window.innerHeight;
	});
})();
