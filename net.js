function updateBoard(state) {
	for(var i = 0; i<state.board.length; i++) {
		var c = state.board[i];

		if(board[c.y][c.x] != localPlayer || (board[c.y][c.x] != localPlayer && c.controller == localPlayer))
			board[c.y][c.x].spigot = c.spigot;

		board[c.y][c.x].controller = c.controller;
		board[c.y][c.x].troops = c.troops;
		board[c.y][c.x].terrain = c.terrain;
		board[c.y][c.x].productivity = c.productivity;
	}
}

function pollUpdate() {
		$.ajax({
		url: '/state/0/1',
		async: true,
		success: function(data) {
			update = []
			updateBoard(jQuery.parseJSON( data ));
	   	//alert(data);
		}
	});
}

function sendUpdate() {
	//alert(board);
	//window.location = 'http://foo.bar';
	//alert(jQuery.param(board));

	var update = [];

	for(var i = 0; i<board.length; i++) {
		for(var j = 0; j<board[i].length; j++) {
			if(board[i][j].controller == localPlayer) {
				var local = {};
				local.spigot = board[i][j].spigot;
				local.controller = board[i][j].controller;
				local.troops = board[i][j].troops;
				local.x = j;
				local.y = i;
				update.push(local);
			} 
		}
	} 

	$.ajax({
		url: '/state/0/1',
		type: 'post',
		async: true,
		data: "data=" + encodeURI(JSON.stringify(update)),
		success: function(data) {
			update = []
			updateBoard(jQuery.parseJSON( data ));
	   	//alert(data);
		}
	});
}

