const items = [
	"Love",
	"Joy",
	"Peace",
	"Word",
	"Another one",
	"Success"
];
const parent = document.getElementById("items"),
			searchIn = document.getElementById("search--input");

searchIn.addEventListener("input", function(e){
	const val = e.target.value.toLowerCase();
	let newArr = items.filter(function(e){
		return e.toLowerCase().match(val);
	});
	renderItems(newArr, parent);
});

function renderItems(arr, parent){
	parent.innerHTML = "";
	for(var i = 0; i < arr.length; i++){
		let el = document.createElement("p");
		el.className = "item";
		el.innerHTML = arr[i];
		parent.appendChild(el);
	}
}

renderItems(items, parent)
