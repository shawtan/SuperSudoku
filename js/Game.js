function Game(size) {
  this.size           = size; // Size of the grid
  this.board = new Board(size);
  this.graph = new Graph(this.board.regions);

  this.$cells = {};


  this.setup();



};


Game.prototype.checkComplete = function () {
  if (this.isComplete()){
    alert("Congrats! You solved the puzzle!");
  }
}

Game.prototype.isComplete = function () {
    //alert("isComplete"+this.size);

    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if(!(/^[1-9]$/).test(this.$cells[i][j]+"")){
          if (parseInt(this.$cells[i][j].val()) != this.board.grid[i][j]){
            return false;
          }
        }
      };
    };
    console.log("isComplete");
    return true;

  }

  Game.prototype.setup = function () {

    this.won = false;

  };

  cellInput = function (game) {
    this.game = game;
  // alert("keyup");
  //TODO: Keydown cancel key
  this.keyup = function () {
    if(!this.value.match(/^[1-9]$/)) {
      this.value = "";
    } else {
      //console.log(this.$cells[0][0].html());
      game.checkComplete();
    }
  }
}

Game.prototype.buildHTML = function () {

  var $container = $("#container");
  var $td, $tr,
  $table = $( '<table>' )
  .addClass( 'sudoku-container' );

  var ci = new cellInput(this);

  for ( var i = 0; i < this.board.size; i++ ) {
    $tr = $( '<tr>' );
    this.$cells[i] = {};

    for ( var j = 0; j < this.board.size; j++ ) {

      if (this.board.puzzle[i][j] > 0){
        this.$cells[i][j] = this.board.puzzle[i][j];
      } else {
          // Build the input
          this.$cells[i][j] = $( '<input>' )
          //.attr( 'type', 'number' )
          .attr( 'maxlength', 1 )
          .data( 'row', i )
          .data( 'col', j )
          .on( 'keyup', ci.keyup);
          //child.addEventListener('keyup', cellInputHandler, false);
        }

<<<<<<< HEAD
<<<<<<< HEAD
          $td = $( '<td>' ).append( this.$cells[i][j] );
          //this.$cells[i][j].val(this.board.puzzle[i][j]);
          if (this.board.puzzle[i][j] > 0){
          $td.html(this.board.puzzle[i][j]);
        }
=======
=======
>>>>>>> master
        $td = $( '<td>' ).append( this.$cells[i][j] );
          //this.$cells[i][j].val(this.board.puzzle[i][j]);
          // if (this.board.puzzle[i][j] > 0){
          //   $td.html(this.board.puzzle[i][j]);
          // }
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master
          
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