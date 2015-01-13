function Game(size) {
  this.size           = size; // Size of the grid
  this.board = new Board(size);
  this.graph = new Graph(this.board.regions);

  this.$cells = {};


  this.setup();
}

Game.prototype.setup = function () {

  this.won = false;

};


Game.prototype.buildHTML = function () {
  var $container = $("#container");
  var $td, $tr,
  $table = $( '<table>' )
  .addClass( 'sudoku-container' );

  for ( var i = 0; i < this.board.size; i++ ) {
    $tr = $( '<tr>' );
    this.$cells[i] = {};

    for ( var j = 0; j < this.board.size; j++ ) {
          // Build the input
          this.$cells[i][j] = $( '<input>' )
          .attr( 'maxlength', 1 )
          .data( 'row', i )
          .data( 'col', j )
          .on( 'keyup', $.proxy( this.onKeyUp, this ) );

          $td = $( '<td>' ).append( this.$cells[i][j] );
          //this.$cells[i][j].val(this.board.puzzle[i][j]);
          if (this.board.puzzle[i][j] > 0){
          $td.html(this.board.puzzle[i][j]);
        }
          
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