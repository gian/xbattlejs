function initialiseControl () {
	$("#mycanvas").click(function (e) {
		var x = Math.floor((e.pageX-$("#mycanvas").offset().left));
    	var y = Math.floor((e.pageY-$("#mycanvas").offset().top));
		var click = positionToCell(x,y);
	
		if(click && board[click.y][click.x].controller == localPlayer) {
			board[click.y][click.x].spigot[click.spigot] = 
				!board[click.y][click.x].spigot[click.spigot];
			updateDisplay();
		}

	});
}
