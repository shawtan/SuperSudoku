$( document ).ready( function() { 
	var game = new Game();
	game.setSize(5);

	$( '#solve').click( function() {
		game.solve();
	} );

	$( '#reset').click( function() {
		game.reset();
	} );

	$( '#new-game').click( function() {
		game.setSize($("#length").val());
	} );

} );