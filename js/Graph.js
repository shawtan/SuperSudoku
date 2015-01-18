function Graph(arr) {
	
	this.Ngraph = this.arrayToGraph(arr);
	this.colorParts = this.toColor(this.Ngraph);
	//console.log(this.colorParts);
}

Graph.prototype.arrayToGraph = function (arr) {

	var neighbours = {};

	for (var i=0;i<arr.length; i++) {
		neighbours[i] = [];   

	}

	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[0].length; j++) {

			var m = arr[i][j];

			if (i-1 >= 0) {
				var n = arr[i-1][j];


				if (n != m && neighbours[m].indexOf(n) < 0) {
					neighbours[m].push(n);
					neighbours[n].push(m);
				}
			}

			if (j-1 >= 0) {
				var n = arr[i][j-1];
				if (n != m && neighbours[m].indexOf(n) < 0) {
					neighbours[m].push(n);
					neighbours[n].push(m);
				}

			}
		};
	};
	return neighbours;
}

Graph.prototype.toColor = function (graph) {

	var isIndexUsed = function (index, colArr, n, arr) {
		//console.log("index="+index+" n="+n+" arr=" + arr);
		for (var i=0; i<arr.length; i++) {
			var key = arr[i];
			if ((key < n) && (colArr[key] == index)){
				//console.log("key="+key);
				return true;
			}
		}
		return false;
	}

	var color = [];

	for (var key in graph) {
		var index = 0;
		while (isIndexUsed(index, color, key, graph[key])) {
			index++;
		}
		color.push(index);
	}

	return color;
}


Graph.prototype.toString = function(){

	var s = "";

	for (var key in this.graph) {
		s = s + key + ": " + this.graph[key].toString() +"\n";   

	}

	return s;
}




