function Board(length) {

	this.length = length;
	this.regions = [length];

	this.makeRegions();
	//this.puzzle = generateBoard();
	this.printBoard(regions);
}

var init = function(n) {

	this.length = n;

	alert(this.regions[0][0]);
	this.printBoard(this.regions);
	this.makeRegions();
	alert(regions[0][0]);
	this.printBoard(regions);

};

Board.prototype.makeRegions = function () {

	for (var i = 0; i < length; i++) {
		this.regions[i] = [];
		for (var j=0; j < length; j++) {
			this.regions[i][j] = 0;
			alert(this.regions[0][0]);
		}
	};

	for (var i = 0; i < length; i++) {
		this.regions[i] = [];
		for (var j=0; j < length; j++) {
			this.regions[i][j] = 0;
			alert(this.regions[0][0]);
		}
	};

	this.makeRegionCorners();

	var section = 5;		//'0' is a valid section
	var direction = 0; 		//up, down, left, right
	while (section < length){
		makeRegionSpaces(section, direction);
		section++;
		direction++;
	}
};

Board.prototype.makeRegionCorners = function () {
	var count = 0;
	for (var sum = 0; sum < length; sum++) {
		for (var a = 0; a <= sum; a++) {

			regions[0 + (sum-a)][0 + a] = 1;
			regions[0 + a][length-1 - (sum-a)] = 2;
			regions[length-1 - (sum-a)][length-1 - a] = 3;
			regions[length-1 - a][0 + (sum-a)] = 4;
			count++;
			if (count >= length){
				return;
			}
		}
	}
};

Board.prototype.makeRegionSpaces = function(section, direction){

	direction = direction % 4;

	var count = 0;
	for (var i = 0; i < regions.length; i++) {
		for (var j = 0; j < regions.length; j++) {
			var a,b;
			a=b=0;
			switch (direction){
				case 0:
				a = i; b = j; break;
				case 1:
				a = length-1-i; b = length-1-j; break;
				case 2:
				a = j; b = i; break;
				case 3:
				a = length-1-j; b = length-1-i; break;
				default:
				System.out.prvarln("Direction error");
			}

			if (regions[a][b] == 0){
				regions[a][b] = section;
				count++;
				if (count >= length){
					return;
				}
			}
		}		
	}
};


Board.prototype.solveGame = function(grid, r, c, regNum) {

	if (c >= length) {
		c = 0;
		r++;
	}

	if (r >= length) {
		this.puzzle = grid;
		return true;
	}

	var reg = regions[r][c];

	for (var i = 0; i < regNum[reg].size(); i++) {

		var n = regNum[reg].remove(i);

		if (validNum(n, grid, r, c)){

			grid[r][c] = n;

			if (fillGrid(grid, r, c+1, regNum)){
				return true;
			}
		}

		grid[r][c] = 0;
		regNum[reg].add(n);
	}

	return false;


};

Board.prototype.printBoard = function(arr) {
	var s = "";
	for(var i = 0; i < arr.length; i++){
		for(var j = 0; j < arr[i].length; j++){
			s = s+arr[i][j]+",";
		}
		s = s + "\n";
	}

	alert(s);

};


