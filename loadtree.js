var defaultTreeData = [{
	"name": "Niclas Superlongsurname",
	"class": "man",
	"textClass": "emphasis",
	"marriages": [{
		"spouse": {
			"name": "Iliana",
			"class": "woman",
			"extra": {
				"nickname": "Illi"
			}
		},
		"children": [{
			"name": "James",
			"class": "man",
			"marriages": [{
				"spouse": {
					"name": "Alexandra",
					"class": "woman"
				},
				"children": [{
					"name": "Eric",
					"class": "man",
					"marriages": [{
						"spouse": {
							"name": "Eva",
							"class": "woman"
						}
					}]
				}, {
					"name": "Jane",
					"class": "woman"
				}, {
					"name": "Jasper",
					"class": "man"
				}, {
					"name": "Emma",
					"class": "woman"
				}, {
					"name": "Julia",
					"class": "woman"
				}, {
					"name": "Jessica",
					"class": "woman"
				}]
			}]
		}]
	}]
}]

function readTextFile(file) {
	let promise = new Promise(function (resolve, reject) {

		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = function () {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					var allText = rawFile.responseText;
					resolve(allText);
					// alert(allText);
				} else {
					reject(new Error("Failed to load file"));
				}
			}
		}
		rawFile.send(null);

	});

	return promise;
}


function createFamilyTreeDataSource(familyTreeText) {
	let lineageRe = /(?<gen>\d+? )(?<name>[\(\)\w -]+? )#(?<number>\d{0,4} )(?<birth>b\. [?\w-]{8}){0,1} {0,1}(?<birthlocation>[\w-, ]+ ){0,1} {0,1}(?<death>d\. [?\w-]{8}){0,1} {0,1}(?<deathlocation>[\w-, ]+ ){0,1} {0,1}/gm

	var matches = lineageRe.exec(familyTreeText);
	console.log("createFamilyTreeDataSource -> matches", matches)
}

readTextFile("family_tree.txt").then(
	function (result) {
		createFamilyTreeDataSource(result)
		loadTree(defaultTreeData);
	}
);

function loadTree(treeData) {
	dTree.init(treeData, {
		target: "#graph",
		debug: true,
		height: 800,
		width: 1200,
		callbacks: {
			nodeClick: function (name, extra) {
				console.log(name);
			},
			textRenderer: function (name, extra, textClass) {
				// THis callback is optinal but can be used to customize
				// how the text is rendered without having to rewrite the entire node
				// from screatch.
				if (extra && extra.nickname)
					name = name + " (" + extra.nickname + ")";
				return "<p align='center' class='" + textClass + "'>" + name + "</p>";
			},
			nodeRenderer: function (name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer) {
				// This callback is optional but can be used to customize the
				// node element using HTML.
				let node = '';
				node += '<div ';
				node += 'style="height:100%;width:100%;" ';
				node += 'class="' + nodeClass + '" ';
				node += 'id="node' + id + '">\n';
				node += textRenderer(name, extra, textClass);
				node += '</div>';
				return node;
			}
		}
	});
}
