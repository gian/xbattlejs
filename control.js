function initialiseControl () {
	$("#mycanvas").click(function (e) {
		var x = Math.floor((e.pageX-$("#mycanvas").offset().left));
    	var y = Math.floor((e.pageY-$("#mycanvas").offset().top));
		positionToCell(x,y);
	});
}
