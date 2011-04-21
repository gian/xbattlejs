var board = [];

var gameCfg = {};

gameCfg.boardX = 10;
gameCfg.boardY = 28;
gameCfg.cellSize = 50;
gameCfg.tickInterval = 1000; // ms
gameCfg.fullTurns = 10; // At 100% productivity, how many ticks to fill a cell?
gameCfg.player = [];

gameCfg.player[0] = {};
gameCfg.player[1] = {};
gameCfg.player[2] = {};
gameCfg.player[3] = {};

gameCfg.player[0].color = '#abcdef';
gameCfg.player[1].color = 'red';
gameCfg.player[2].color = '#00ff00';
gameCfg.player[3].color = '#000000';

var localPlayer = 2;

// === Utilities ===

(function () {                                                                  
    var swapper =                                                               
        function (a,L,e) {                                                      
            var r = Math.floor(Math.random()*L);                                
            var x = a[e];                                                       
            a[e] = a[r];                                                        
            a[r] = x;                                                           
        };                                                                      
    Array.prototype.shuffle =                                                   
        function () {                                                           
            var i,L;                                                            
            i = L = this.length;                                                
            while (i--) swapper(this,L,i);                                      
        };                                                                      
})();


