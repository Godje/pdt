var items = [
		["[Canvas] Как сделать классную анимацию для фона в Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-animation__1"],
		["[Canvas] Как сделать рисование в Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-drawing"],
		["[Canvas] Как сделать Pixel Art в Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-pixel-art"],
		["[Canvas] Как создать сложенную анимацию в Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-animation__2"],
		["[Canvas] Как создать преследующие частицы в HTML5 Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/vector--pursuers"],
		['[Canvas] Как создать "Цветной Хаос" в канвасе', "https://github.com/Godje/pdt/tree/master/pdt-sources/vector--color-chaos"],
	],
	parent = document.getElementById("search--field"),
	input = document.getElementById("search--input");

renderItems(items, parent)
input.addEventListener("input", function(e) {
	const val = e.target.value.toLowerCase();
	if (val !== "") {
		let newArr = items.filter(function(e) {
			return e[0].toLowerCase().match(val);
		});
		renderItems(newArr, parent);
	} else {
		renderItems(items, parent)
	}
});

function renderItems(arr, parent) {
	parent.innerHTML = "";
	for (var i = 0; i < arr.length; i++) {
		let el = document.createElement("a");
		el.className = "search--item";
		el.href = arr[i][1];
		el.target = "_blank"
		el.innerHTML = "<p>" + arr[i][0] + "</p>"
		parent.appendChild(el);
	}
}
