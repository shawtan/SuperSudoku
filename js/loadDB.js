
var size = 8;

var regions = [];
makeRegions();



// this.regions = [[1,1,1,5,5,2,2,2,2],
// [1,1,1,5,5,5,2,2,2],
// [1,1,5,5,5,5,8,2,2],
// [1,7,7,0,0,0,8,8,8],
// [7,7,7,0,0,0,8,8,8],
// [7,7,7,0,0,0,8,8,3],
// [4,4,7,6,6,6,6,3,3],
// [4,4,4,6,6,6,3,3,3],
// [4,4,4,4,6,6,3,3,3]];

// 	this.regions = [[1,1,1,1,5,5,2,2,2,2],
// [1,1,1,5,5,5,5,2,2,2],
// [1,1,5,5,5,5,9,9,2,2],
// [1,7,7,9,9,9,9,8,8,2],
// [7,7,7,9,9,9,9,8,8,8],
// [7,7,7,0,0,0,0,8,8,8],
// [4,7,7,0,0,0,0,8,8,3],
// [4,4,0,0,6,6,6,6,3,3],
// [4,4,4,6,6,6,6,3,3,3],
// [4,4,4,4,6,6,3,3,3,3]];


function makeRegions() {

	regions = [];

	for (var i = 0; i < size; i++) {
		regions[i] = [];
		for (var j=0; j < size; j++) {
			regions[i][j] = 0;
		}
	};

	makeRegionCorners();

	var section = 5;		//'0' is a valid section
	var direction = 0; 		//up, down, left, right
	while (section < size){
		makeRegionSpaces(section, direction);
		section++;
		direction++;
	}
};

function makeRegionCorners() {
	var count = 0;
	for (var sum = 0; sum < size; sum++) {
		for (var a = 0; a <= sum; a++) {

			regions[0 + (sum-a)][0 + a] = 1;
			regions[0 + a][size-1 - (sum-a)] = 2;
			regions[size-1 - (sum-a)][size-1 - a] = 3;
			regions[size-1 - a][0 + (sum-a)] = 4;
			count++;
			if (count >= size){
				return;
			}
		}
	}
};

function makeRegionSpaces(section, direction){

	direction = direction % 4;

	var count = 0;
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var a,b;
			a=b=0;
			switch (direction){
				case 0:
				a = i; b = j; break;
				case 1:
				a = size-1-i; b = size-1-j; break;
				case 2:
				a = j; b = i; break;
				case 3:
				a = size-1-j; b = size-1-i; break;
				default:
				console.log("Direction error");
			}
			if (regions[a][b] == 0){
				regions[a][b] = section;
				count++;
				if (count >= size){
					return;
				}
			}
		}		
	}
};


function generateBoard() {
	//console.log("generate");

	var positionArray = [];

	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			positionArray.push([i,j]);
		};
	};

	positionArray = shuffleArray(positionArray);

	var digits = [];
	for (var i=1; i<=size; i++) {
		digits[i-1] = i;
	};
	fillBoard(digits, positionArray);
};

function fillBoard(digits, positionArray) {

	if (positionArray.length == 0){
		return true;
	}

	var p = positionArray.pop();
		//console.log(p);
		digits = shuffleArray(digits);

		for (var i=0; i<size; i++){

			if (isValidNum(digits[i],p[0],p[1],this.puzzle)){
			//console.log("n="+digits[i]);
			puzzle[p[0]][p[1]] = digits[i];

			if (countSolutions(0,0,cloneArray(this.puzzle)) == 1){
				return true;
			} else if (fillBoard(digits,positionArray)){
				return true;
			}
			puzzle[p[0]][p[1]] = 0;
		}
	}
	return false;
}

function countSolutions(n, r, c, grid) {

	for (var i=1; i<=size; i++){
		if (i==n){
			continue;
		}
		grid[r][c] = i;
		if (solveGame(0,0,grid)){
			grid[r][c] = n;
			return 2;
		}
	}

	grid[r][c] = 0;
	return 1;

}

function solveGame(r, c, grid) {

	if (c >= size) {
		c = 0;
		r++;
	}

	if (r >= size) {
		return true;
	}

	if (grid[r][c] > 0) {
		return solveGame(r, c+1,grid);
	}

	var reg = regions[r][c];

	for (var i = 1; i <= size; i++) {

		if (isValidNum(i,r,c,grid)){

			grid[r][c] = i;

			if (solveGame(r, c+1, grid)){
				grid[r][c] = 0;
				return true;
			}

			grid[r][c] = 0;
		}
	}

	return false;
};


Board.prototype.findValidNums = function (r, c, grid) {

	var validNums = [];
	for (var i = 1; i <= size; i++) {
		if (this.isValidNum(i,r,c, grid)){
			validNums.push(i);
		}
	}
	//return validNums;
	return shuffleArray(validNums);

};

function shuffleArray(validNums) {
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

function isValidNum(n, r, c, grid) {
	//Check in columns and rows
	for (var i = 0; i < size; i++) {
		if (grid[r][i] == n || grid[i][c] == n){
			return false;
		}
	}
	
	//Check in region
	var reg = regions[r][c];
	
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			if (regions[i][j] == reg && grid[i][j] == n){
				return false;
			}
		}
	}
	
	return true;
};

function cloneArray(arr) {

	var c = [];
	for (var i = 0; i < arr.length; i++) {
		c[i] = arr[i].slice(0);
	};

	return c;

};

Board.createHoles = function (arr) {
	size = 8;
	// this.holes = 0;

	var limit = 50;

	this.puzzle = cloneArray(arr);
	var positionArray = [];

	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			positionArray.push([i,j]);
		};
	};

	positionArray = shuffleArray(positionArray);

	while (positionArray.length > 0 && limit>0) {
		limit--;

		var p = positionArray.pop();

		console.log("loop");

		if (this.puzzle[p[0]][p[1]] == 0){
			continue;
		}


		var n = this.puzzle[p[0]][p[1]];
		//console.log(p);
		this.puzzle[p[0]][p[1]] = 0;
		//console.log("position " + p[0] + ","+p[1]);
		if (countSolutions(n,p[0],p[1],this.puzzle) > 1) {
			//console.log(p[0] + ","+p[1] + " fails");
			this.puzzle[p[0]][p[1]] = n;
		} else {
			// this.holes++;
			// console.log("Hole found");
			this.puzzle[p[0]][p[1]] = 0;
		}

	};
	return this.puzzle;
};

Board.printBoard = function(arr) {
	var s = "{";
	for(var i = 0; i < arr.length; i++){
		s+="{"
		for(var j = 0; j < arr[i].length; j++){
			if (j > 0){
				s+=",";
			}
			s = s+arr[i][j];
		}
		s = s + "}";
		if (i<arr.length-1){
			s+=",";
		}
		s+="\n";
	}

	return s;

};
Board.outString = function(arr) {
	var s = "";
	for(var i = 0; i < arr.length; i++){
		for(var j = 0; j < arr[i].length; j++){
			s = s+arr[i][j];
		}
	}
	return s;

};


console.log(Board.printBoard(regions));
/*
var s = "";
var size = 8;
//for (var size = 8; size <= 7; size++) {
	for (var i = 0; i < 10; i++) {
		var b = new Board(size);
		var str = b.outString(b.puzzle);
		console.log(str);
		s += str + "\n";
		console.log("i="+i);
	};
//};

document.getElementById('cmd').value = s;

*/

// var request = new XMLHttpRequest();
// request.onload = function () {
// 	var s = "";
// 	var fileContentLines = this.responseText.split('\n');

// 	for (var index=0; index<fileContentLines.length; index++){
// 		var line = fileContentLines[index];
// 		var grid = [];
// 		for(var i=0; i<8; i++){
// 			grid[i] = [];
// 			for(var j=0; j<8; j++){
// 				grid[i][j] = line.charAt(i*8+j);
// 			// console.log(i+","+j+" = " + this.grid[i][j]);
// 		}
// 	}
// 	var str = Board.outString(Board.createHoles(grid));
// 	console.log(str);
// 	s +=str + "\n";
// 	console.log("i="+index);
// }
// document.getElementById('cmd').value = s;


// };

// request.open('GET', 'puzzle/8e.txt');
// request.send();
