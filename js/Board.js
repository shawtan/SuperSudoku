function Board(size) {
	
	//Size should be bigger than 4
	this.size = size;

	this.regions = [];
	this.grid = [];
	this.puzzle = [];
	for (var i = 0; i < size; i++) {
		this.regions[i] = [];
		this.grid[i] = [];
		this.puzzle[i] = [];

		for (var j = 0; j < size; j++) {
			this.regions[i][j] = 0;
			this.grid[i][j] = 0;
			this.puzzle[i][j] = 0;
		}
	};


	this.regions = [[1,1,1,1,5,5,2,2,2,2],
[1,1,1,5,5,5,5,2,2,2],
[1,1,5,5,5,5,9,9,2,2],
[1,7,7,9,9,9,9,8,8,2],
[7,7,7,9,9,9,9,8,8,8],
[7,7,7,0,0,0,0,8,8,8],
[4,7,7,0,0,0,0,8,8,3],
[4,4,0,0,6,6,6,6,3,3],
[4,4,4,6,6,6,6,3,3,3],
[4,4,4,4,6,6,3,3,3,3]];


//	this.makeRegions();
//	console.log("Regions:\n"+this.printBoard(this.regions));

	this.generateBoard();
	//console.log("Grid:\n"+this.printBoard(this.grid));

	this.createHoles();
	//console.log("Puzzle:\n"+this.printBoard(this.puzzle));

}
/*
function Board(size, line) {
	console.log("HERE");
	//Size should be bigger than 4
	this.size = size;

	this.regions = [];
	this.grid = [];
	this.puzzle = [];
	for (var i = 0; i < size; i++) {
		this.regions[i] = [];
		this.grid[i] = [];
		this.puzzle[i] = [];

		for (var j = 0; j < size; j++) {
			this.regions[i][j] = 0;
			this.grid[i][j] = 0;
			this.puzzle[i][j] = 0;
		}
	};

	this.makeRegions();
	//console.log("Regions:\n"+this.printBoard(this.regions));

	for(var i=0; i<size; i++){
		for(var j=0; j<size; j++){
			this.grid[i][j] = line.charAt(i*size+j);
			this.puzzle[i][j] = line.charAt(i*size+j);
			console.log(i+","+j+" = " + this.grid[i][j]);
		}
	}

	this.solveGame(0,0);


}*/

Board.prototype.makeRegions = function () {

	for (var i = 0; i < this.size; i++) {
		this.regions[i] = [];
		for (var j=0; j < this.size; j++) {
			this.regions[i][j] = 0;
		}
	};

	this.makeRegionCorners();

	var section = 5;		//'0' is a valid section
	var direction = 0; 		//up, down, left, right
	while (section < this.size){
		this.makeRegionSpaces(section, direction);
		section++;
		direction++;
	}
};

Board.prototype.makeRegionCorners = function () {
	var count = 0;
	for (var sum = 0; sum < this.size; sum++) {
		for (var a = 0; a <= sum; a++) {

			this.regions[0 + (sum-a)][0 + a] = 1;
			this.regions[0 + a][this.size-1 - (sum-a)] = 2;
			this.regions[this.size-1 - (sum-a)][this.size-1 - a] = 3;
			this.regions[this.size-1 - a][0 + (sum-a)] = 4;
			count++;
			if (count >= this.size){
				return;
			}
		}
	}
};

Board.prototype.makeRegionSpaces = function(section, direction){

	direction = direction % 4;

	var count = 0;
	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			var a,b;
			a=b=0;
			switch (direction){
				case 0:
				a = i; b = j; break;
				case 1:
				a = this.size-1-i; b = this.size-1-j; break;
				case 2:
				a = j; b = i; break;
				case 3:
				a = this.size-1-j; b = this.size-1-i; break;
				default:
				console.log("Direction error");
			}
			if (this.regions[a][b] == 0){
				this.regions[a][b] = section;
				count++;
				if (count >= this.size){
					return;
				}
			}
		}		
	}
};

Board.prototype.generateBoard = function () {

	if (!this.solveGame(0, 0)) {
		console.log("No valid board can be made");
	}

};

Board.prototype.solveGame = function(r, c) {

	if (c >= this.size) {
		c = 0;
		r++;
	}

	if (r >= this.size) {
		return true;
	}

	if (this.grid[r][c] > 0) {
		return this.solveGame(r, c+1);
	}

	var reg = this.regions[r][c];
	var validNums = this.findValidNums(r, c, this.grid);

	for (var i = 0; i < validNums.length; i++) {

		this.grid[r][c] = validNums[i];

		if (this.solveGame(r, c+1)){
			return true;
		}

		this.grid[r][c] = 0;
	}

	return false;
};

Board.prototype.countSolutions = function (r, c, grid) {

	if (c >= this.size) {
		c = 0;
		r++;
	}

	if (r >= this.size) {
		return 1;
	}

	if (grid[r][c] > 0) {
		return this.countSolutions(r, c+1, grid);
	}

	var reg = this.regions[r][c];
	//var validNums = [1,2,3,4,5,6,7,8,9];

	var count = 0;

	for (var i = 1; i <= 9; i++) {

		if (!this.isValidNum(i,r,c,grid)){
			continue;
		}

		grid[r][c] = i;//validNums[i];

		count += this.countSolutions(r, c+1, grid);
		if (count > 1){
			return count;
		}
		grid[r][c] = 0;
	}

	return count;
}

Board.prototype.findValidNums = function (r, c, grid) {

	var validNums = [];
	for (var i = 1; i <= this.size; i++) {
		if (this.isValidNum(i,r,c, grid)){
			validNums.push(i);
		}
	}
	//return validNums;
	return shuffleArray(validNums);

};

var shuffleArray = function (validNums) {
	var counter = validNums.length, temp, index;

    // While there are elements in the validNums
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = validNums[counter];
        validNums[counter] = validNums[index];
        validNums[index] = temp;
    }

    return validNums;
}

Board.prototype.isValidNum = function (n, r, c, grid) {
	//Check in columns and rows
	for (var i = 0; i < this.size; i++) {
		if (grid[r][i] == n || grid[i][c] == n){
			return false;
		}
	}
	
	//Check in region
	var reg = this.regions[r][c];
	
	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			if (this.regions[i][j] == reg && grid[i][j] == n){
				return false;
			}
		}
	}
	
	return true;
};

var cloneArray = function (arr) {

	var c = [];
	for (var i = 0; i < arr.length; i++) {
		c[i] = arr[i].slice(0);
	};

	return c;

};

Board.prototype.createHoles = function () {

	this.holes = 0;

	this.puzzle = cloneArray(this.grid);
	var positionArray = [];

	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			positionArray.push([i,j]);
		};
	};

	positionArray = shuffleArray(positionArray);

	while (positionArray.length > 0) {
		var p = positionArray.pop();
		//console.log(p);
		this.puzzle[p[0]][p[1]] = 0;
		//console.log("position " + p[0] + ","+p[1]);
		if (this.countSolutions(0,0,this.puzzle) > 1) {
			//console.log(p[0] + ","+p[1] + " fails");
			this.puzzle[p[0]][p[1]] = this.grid[p[0]][p[1]];
		} else {
			this.holes++;
		}

	};
};

Board.prototype.createGraph = function () {

	this.graph = new Graph(this.regions);

};

Board.prototype.printBoard = function(arr) {
	var s = "[";
	for(var i = 0; i < arr.length; i++){
		s+="["
		for(var j = 0; j < arr[i].length; j++){
			if (j > 0){
				s+=",";
			}
			s = s+arr[i][j];
		}
		s = s + "]";
		if (i<arr.length-1){
			s+=",";
		}
		s+="\n";
	}

	return s;

};

Board.prototype.outString = function(arr) {
	var s = "";
	for(var i = 0; i < arr.length; i++){
		for(var j = 0; j < arr[i].length; j++){
			s = s+arr[i][j];
		}
	}
	return s;

};