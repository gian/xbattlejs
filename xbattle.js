
function instantiateGame(nCities,rSea,rPlains,rMountains) {
	var prev = 0;

	for(var y = 0; y<gameCfg.boardY; y++) {
		board[y] = [];
		for(var x = 0; x<gameCfg.boardX; x++) {
			board[y][x] = {};
			board[y][x].terrain = 0;
			board[y][x].spigot = [0,0,0,0,0,0];
			board[y][x].productivity = 0;
			board[y][x].troops = 0;
		}
	}

	sendUpdate();

	updateDisplay();
}

function gameTick() {
	/*var l = shuffleCells();

	for(var i = 0; i<l.length; i++) {
		var c = board[l[i].y][l[i].x];

		if(c.controller > 0 && c.productivity > 0 && c.troops < 100) {
			if(c.troops + (c.productivity / gameCfg.fullTurns) > 100)
				c.troops = 100;
			else
				c.troops += (c.productivity / gameCfg.fullTurns);
		}
	}*/


	sendUpdate();
	updateDisplay();
	setTimeout(gameTick, gameCfg.tickInterval);
}

function shuffleCells() {
	var l = [];

	for(var y = 0; y<gameCfg.boardY; y++) {
		for(var x = 0; x<gameCfg.boardX; x++) {
			var s = {x: x, y: y};
			l.push(s);
		}
	}

	l.shuffle();

	return l;
}

window.onload =
function () {
	instantiateGame();
	initialiseControl();

	setTimeout(gameTick, gameCfg.tickInterval);
};

