// Mount point for the app
const mountPoint = document.getElementById("screen");

// ====================
// MODEL
// ====================
//
// Constructing a basic model.
const MODEL = {
	search: {
		inputField: m.stream(""),
	},
	sources: {
		sourceList: m.stream([
			{
				name: "Github",
				url: "https://github.com/Godje"
			},
			{
				name: "YouTube",
				url: "https://youtube.com/TheComePot"
			}
		]),
	sourceMatches: null	}
}

// This stream combines two streams of inputValue and sourceList making it easier for me to auto-update information based on input
MODEL.sources.sourceMatches = m.stream.combine( function (sourceList, inputField){
	let arr = sourceList().filter( function (source){
		return source.name.toLowerCase().match(inputField().toLowerCase());
	});
	return arr;
}, [MODEL.sources.sourceList, MODEL.search.inputField]);


// ====================
// CONTROLLER
// ====================
//
// Constructing a basic controller.
const CTRL = {
	search: {
		processInput: function (e) {
			e.preventDefault();
			let value = e.target.value;
			MODEL.search.inputField(value);
		},
	}
}
// ====================
// VIEWS
// ====================
//
// Doing the Views. 
const Home = {
	mainNode: (vnode)=>{
		function view(vnode){
			let sourceOutput = MODEL.sources.sourceMatches().map(function (source){
				let {name, url} = source;
				return m(Home.sourceNode, {name, url});
			})
			return m(".container", [
				m(".title", m("h1", "PaDamTuts")),
				m(".subtitle", m("h2", "Исходники")),
				m(Home.inputNode),
				m(".output", sourceOutput)
			]);
		}
		return {view: view}
	},
	inputNode: (vnode)=>{
		function view(vnode){
			return m(".search-container", [
				m("form", {onsubmit: (e)=>e.preventDefault()},
					m("input[type=`text`]", {
						placeholder: "Type in the name of the video",
						oninput: CTRL.search.processInput,
						value: MODEL.search.inputField
					})
				)
			]);
		}
		return {view: view}
	},
	sourceNode: (vnode)=>{
		function oninit(vnode){
			this.open = false;
			let $this = this;
			this.CTRL = {
				toggleExpand: function (e){
					e.preventDefault();
					$this.open = !$this.open;
				}
			}
		}
		function view(vnode){
			return m(`div.output-block${ this.open ? ".open":"" }`, [
				m("button.output-title", { onclick: this.CTRL.toggleExpand }, vnode.attrs.name),
				m(".content",
					m(`a[href="${vnode.attrs.url}"]`, {
						target: "_blank"
					}, vnode.attrs.url)
				)
			])
		}
		return { oninit, view}
	}
}

// Mounting the main component.
// Subject to change if routing implemented

m.mount(mountPoint, Home.mainNode)



//
// Part of the Loading.
//
const owner = "Godje",
	repo = "pdt";

var getLastCommit = m.request({
	method: "GET",
	url: `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/master`
}).then( (res)=>{
	return res.object.sha;
});

var getUrls = getLastCommit.then( (sha) => {
	return m.request({
		method: "GET",
		url: `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`
	}).then(function(json){
		let arr = json.tree.filter(function (item){
			return item.path.match(/\[yt\]/);
		});
		arr = arr.map(function (item){
			let parts = item.path.split("[yt]");
			return {
				url: `https://github.com/Godje/pdt/tree/master/${parts[0]}`,
				name: parts[1]
			}
		});
		return arr;
	});
}).then(MODEL.sources.sourceList);

