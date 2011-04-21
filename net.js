function nettest() {
	socket = new io.Socket('localhost');
	socket.connect();
	socket.on('connect', function(){
		alert("connect!");
	});
	socket.on('message', function(data){
		 // data here
		 alert("message: " + data);
	});
	socket.send('some data');
}

