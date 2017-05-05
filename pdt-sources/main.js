var items = [
		["[#2] Стильный прелоадер (HTML/CSS) | Крутой UI", "https://github.com/Godje/ready-to-go-frontend-kit/tree/Cool-UI-%232"],
		["[#3] Крутая Кнопка Меню CSS/JS | Крутой UI", "https://github.com/Godje/ready-to-go-frontend-kit/tree/Cool-UI-%233"],
		["[#4] Прогресс Скроллинга страницы | Крутой UI", "https://github.com/Godje/ready-to-go-frontend-kit/tree/Cool-UI-%234"],
		["[#5] Слежение ввода | Крутой UI Tutorial", "https://github.com/Godje/ready-to-go-frontend-kit/tree/Cool-UI-%235"],
		["[#6] Проверка наличия ввода | Крутой UI Tutorial", "https://jsfiddle.net/Godje/yjvgfzux/"],
		["[Canvas] Как сделать классную анимацию для фона в Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-animation__1"],
		["[Canvas] Как сделать рисование в Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-drawing"],
		["[Canvas] Как сделать Pixel Art в Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-pixel-art"],
		["[Canvas] Как создать сложенную анимацию в Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-animation__2"],
		["[Canvas] Как создать преследующие частицы в HTML5 Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/vector--pursuers"],
		['[Canvas] Как создать "Цветной Хаос" в канвасе', "https://github.com/Godje/pdt/tree/master/pdt-sources/vector--color-chaos"],
		["[Canvas] Как сделать анимацию живых линий в HTML5 Canvas", "https://github.com/Godje/pdt/tree/master/pdt-sources/canvas-living-lines"],
	],
	parent = $("#search--field"),
	input = $("#search--input");

renderItems(items, parent);
fixHeight();

function fixHeight(){
	input.val("");
	let topOff = parent.children().last().offset().top;
	$("body").css("min-height", topOff+"px");
}
input.on("input", function(e) {
	const val = $(this).val();
	if (val !== "") {
		let newArr = items.filter(function(e) {
			return e[0].toLowerCase().match(val.toLowerCase());
		});
		renderItems(newArr, parent, val);
	} else {
		renderItems(items, parent)
	}
});

function renderItems(arr, parent) {
	parent.html("");
	for (var i = 0; i < arr.length; i++) {
		let el = document.createElement("a"),
        str = arr[i][0];
		el.className = "search--item";
		el.href = arr[i][1];
		el.target = "_blank"
		el.innerHTML = "<p>" + str + "</p>"
		parent.append(el);
	}
}
window.addEventListener("resize", function(){
	renderItems(items, parent);
	fixHeight();
});
