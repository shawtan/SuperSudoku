function Game() {

  this.$cells = {};
};

Game.prototype.setSize = function(size) {

  this.size           = size; // Size of the grid

  var request = new XMLHttpRequest();
  request.onload = function (B) { return function () {

  	var fileContentLines = this.responseText.split('\n');
  	var index = Math.floor(Math.random() * fileContentLines.length);
  	var line = fileContentLines[index];

  	B.board = new Board(size, line);
    B.graph = new Graph(B.board.regions);
  	B.buildHTML();
    B.solveGame(0,0);

  }}(this);

  request.open('GET', 'puzzle/'+size+'.txt');
  request.send();

/*
  this.board = new Board(size);
  this.graph = new Graph(this.board.regions);
  this.buildHTML();
  */
}

Game.prototype.checkComplete = function () {
  if (this.isComplete()){
    alert("Congrats! You solved the puzzle!");
  }
}

Game.prototype.isComplete = function () {
    //alert("isComplete"+this.size);

    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if(!(/([1-9])+/).test(this.$cells[i][j]+"")){
          if (parseInt(this.$cells[i][j].val()) != this.board.grid[i][j]){
            return false;
          }
        }
      };
    };
    console.log("isComplete");
    return true;

  }


  cellInput = function (game) {
    this.game = game;
  // alert("keyup");
  //TODO: Keydown cancel key
  this.keyup = function () {
    if(!this.value.match(/([1-9])+/)) {
      this.value = "";
    } else {
      //console.log(this.$cells[0][0].html());
      game.checkComplete();
    }
  }
}

Game.prototype.solve = function () {


  for ( var i = 0; i < this.size; i++ ) {
    for ( var j = 0; j < this.size; j++ ) {

      if (this.board.puzzle[i][j] == 0){
        this.$cells[i][j].val(this.board.grid[i][j]);
      }

    }
  }
}

Game.prototype.reset = function () {

  for ( var i = 0; i < this.size; i++ ) {
    for ( var j = 0; j < this.size; j++ ) {

      if (this.board.puzzle[i][j] == 0){
        this.$cells[i][j].val("");
      }

    }
  }
}

Game.prototype.buildHTML = function () {

  var $container = $("#game-container");
  var $td, $tr,
  $table = $( '<table>' )
  .addClass( 'sudoku-container' );

  var ci = new cellInput(this);

  for ( var i = 0; i < this.size; i++ ) {
    $tr = $( '<tr>' );
    this.$cells[i] = {};

    for ( var j = 0; j < this.size; j++ ) {

      if (this.board.puzzle[i][j] > 0){
        this.$cells[i][j] = this.board.puzzle[i][j];
      } else {
          // Build the input
          this.$cells[i][j] = $( '<input>' )
          //.attr( 'type', 'number' )
          .attr( 'maxlength', this.size/10+1 )
          .data( 'row', i )
          .data( 'col', j )
          .on( 'keyup', ci.keyup);
          //child.addEventListener('keyup', cellInputHandler, false);
        }

        $td = $( '<td>' ).append( this.$cells[i][j] );
          //this.$cells[i][j].val(this.board.puzzle[i][j]);
          // if (this.board.puzzle[i][j] > 0){
          //   $td.html(this.board.puzzle[i][j]);
          // }
          
          // Calculate section ID
          //var reg = this.board.regions[i][j];
          // Set the design for different sections

          $td.addClass('sudoku-region-'+ this.graph.colorParts[this.board.regions[i][j]] );

          // Build the row
          $tr.append( $td );
        }
        // Append to table
        $table.append( $tr );
      }
      // Return the GUI table
      //return $table;
      $container.html($table);

    };
