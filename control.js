var mxPos = 0;
var myPos = 0;

function initialiseControl () {
	$(document).bind("contextmenu",function(e){
      var x = Math.floor((e.pageX-$("#mycanvas").offset().left));
    	var y = Math.floor((e.pageY-$("#mycanvas").offset().top));
		var click = positionToCell(x,y);

		if(e.which == 3) {
			if(click && board[click.y][click.x].controller == localPlayer) {
				board[click.y][click.x].spigot = [0,0,0,0,0,0];
				board[click.y][click.x].spigot[click.spigot] = 
					!board[click.y][click.x].spigot[click.spigot];
				updateDisplay();
			}

			if (e.shiftKey) {
       		alert("TODO: March");
			} 
		}

		return false;
    });

	$("#mycanvas").click(function (e) {
		var x = Math.floor((e.pageX-$("#mycanvas").offset().left));
    	var y = Math.floor((e.pageY-$("#mycanvas").offset().top));
		var click = positionToCell(x,y);

		if(e.which == 1) {
			if(click && board[click.y][click.x].controller == localPlayer) {
				board[click.y][click.x].spigot[click.spigot] = 
					!board[click.y][click.x].spigot[click.spigot];
				updateDisplay();
			}

			if (e.shiftKey) {
	     		alert("TODO: March");
			} 
		}
	});

	$(document).keypress(function (e) {
		if(e.which == 97) { // Attack! (a key) 
			var cell = positionToCell(mxPos,myPos);
			if(cell == null) return;
			alert("TODO: attack: " + cell.x + "/" + cell.y);
		} else if (e.which == 102) { // Attack! (a key) 
			alert("TODO: fill");
		} else if (e.which == 100) { // Attack! (a key) 
			alert("TODO: dig");
		} else {
			alert(e.which);
		}
	});

	$(document).mousemove(function (e) {
		mxPos = Math.floor((e.pageX-$("#mycanvas").offset().left));
    	myPos = Math.floor((e.pageY-$("#mycanvas").offset().top));
	});
}
