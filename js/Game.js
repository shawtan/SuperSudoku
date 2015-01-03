function Game(size) {
  this.size           = size; // Size of the grid
  this.board = new Board(size);
  this.graph = new Graph(this.board.regions);

  this.$cellMatrix = {};


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
    this.$cellMatrix[i] = {};

    for ( var j = 0; j < this.board.size; j++ ) {
          // Build the input
          this.$cellMatrix[i][j] = $( '<input>' )
          .attr( 'maxlength', 1 )
          .data( 'row', i )
          .data( 'col', j )
          .on( 'keyup', $.proxy( this.onKeyUp, this ) );

          $td = $( '<td>' ).append( this.$cellMatrix[i][j] );
          //this.$cellMatrix[i][j].val(this.board.grid[i][j]);
          //$td.html(this.board.grid[i][j]);
          
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
      $container.append($table);

    };