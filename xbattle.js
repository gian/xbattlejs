
function instantiateGame(nCities,rSea,rPlains,rMountains) {
	var prev = 0;

	for(var y = 0; y<gameCfg.boardY; y++) {
		board[y] = [];
		for(var x = 0; x<gameCfg.boardX; x++) {
			board[y][x] = {};
			var rnd = Math.floor(Math.random()*100);
			board[y][x].terrain = rnd;
			board[y][x].spigot = [0,0,0,0,0,0];
			board[y][x].productivity = Math.floor(Math.random() * 100);
			board[y][x].controller = 0;
		}
	}

	updateDisplay();
}

window.onload =
function () {
	instantiateGame();
};

