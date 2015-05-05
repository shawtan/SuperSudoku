var s = "";
var size = 10;
//for (var size = 8; size <= 7; size++) {
	for (var i = 0; i < 3; i++) {
		  var b = new Board(size);
		  var str = b.outString(b.puzzle);
		  console.log(str);
		  s += b.outString(b.puzzle) + "\n";
		  console.log("i="+i);
	};
//};

document.getElementById('cmd').value = s;