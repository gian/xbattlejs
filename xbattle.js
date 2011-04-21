var board = [];

function drawHex(ctx, x, y, size, color) {
	var oneseg = (size / 4.0);
	var twoseg = (oneseg * 2.0);

	ctx.beginPath();
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = '#000000';
	
	ctx.moveTo(x, y + twoseg);
	ctx.lineTo(x + oneseg, y);
	ctx.lineTo(x + oneseg + twoseg, y);
	ctx.lineTo(x + size, y + twoseg);
	ctx.lineTo(x + oneseg + twoseg, y + size);
	ctx.lineTo(x + oneseg, y + size);
	ctx.lineTo(x, y + twoseg);
	ctx.fillStyle = color;

	ctx.fill();
	ctx.stroke();
}

function drawHexDetail(ctx, x, y, cell, size) {
	// Draw cities
	if(cell.productivity > 20) {
		// City size is productivity 20 - 100
		var cityRadius = Math.floor((size / 3.0) * (cell.productivity / 100.0));
		ctx.beginPath();		
		ctx.arc(x + (size/2.0), y + (size/2.0),cityRadius,0, 2*Math.PI,false);
		ctx.strokeStyle = '#000000';
		ctx.lineWidth = 1.0;
		ctx.stroke();
	}
}

function terrainToColor (terrain) {
	// Terrain is a height value between 0 and 100.

	var r = 0;
	var g = 0;
	var b = 0;

	
	// sea
	/*if(terrain <= 30) {
		var fct = (terrain / 30.0) * 60;
		r = 60-fct;
		g = 60-fct;
		b = 255 - fct;
	}

	// plains
	else if(terrain > 30 && terrain <= 70) {
		var fct = ((terrain - 30) / 40.0) * 60;
		r = 181-fct;
		g = 246-fct;
		b = 152-fct;
	}

	// mountains
	else {
		var fct = ((terrain - 70) / 30.0) * 60;
		r = 226-fct;
		g = 208-fct;
		b = 173-fct;
	}*/

	var fct = Math.floor((terrain / 100.0) * 255.0);

	return 'rgb('+fct+','+fct+','+fct+')';
}

// Draw a width * height grid (in cells) where each cell is size pixels wide
function drawGrid(ctx, width, height, size) {
	var offsetx = (size / 4) * 3;
	var offsety = size / 2;
	var sz2 = size * 1.5;

	for(var y = 0; y<height; y++) {
		if (y % 2 == 0) {
			yoff = offsety;
			xoff = offsetx;
		} else {
			yoff = offsety;
			xoff = 0;
		}

		for(var x = 0; x<width; x++) {
			var terrain = board[y][x].terrain;
			var color = terrainToColor(terrain);

			drawHex(ctx,xoff + x * sz2,  y * yoff, size, color);
			drawHexDetail(ctx, xoff + x * sz2, y * yoff, board[y][x], size);
		}
	}
}

function instantiateGame(boardX,boardY,nCities,rSea,rPlains,rMountains) {
	var boardX = 10;
	var boardY = 28;

	var prev = 0;

	for(var y = 0; y<boardY; y++) {
		board[y] = [];
		for(var x = 0; x<boardX; x++) {
			board[y][x] = {};
			var rnd = Math.floor(Math.random()*100);
			board[y][x].terrain = rnd;
			board[y][x].spigots = [0,0,0,0,0,0];
			board[y][x].productivity = Math.floor(Math.random() * 100);
		}
	}

	drawGrid(document.getElementById('mycanvas').getContext('2d'),boardX,boardY,50);
}

window.onload =
function () {
	instantiateGame(10,28);
};

