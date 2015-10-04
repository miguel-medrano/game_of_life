var Board = function(length, height, aliveString, deadString){
    var that = Object.create(Board.prototype);

    var ALIVE = 1;
    var DEAD = 0;
    var ALIVE_STRING = aliveString || "*";
    var DEAD_STRING = deadString || "-";

    var times = function (i, f) {
        if (i === 0) return;
        f(); times (i-1, f)
    };

    var board = function() {
        var rows = [];
        times(height, function () {
            var col = [];
            rows.push(col);
            times(length, function () {
                col.push(DEAD);
            })
        });
        return rows;
    }();

    var isAlive = function(i,j){
        return board[i][j] === ALIVE;
    };

    var neighborIterate = function(f,i,j){
        var offsets = [-1, 0, 1];
        offsets.forEach(function(dy) {
            offsets.forEach(function(dx) {
                if(i+dx >= 0 && i+dx < length) {
                    if (j + dy >= 0 && j + dy < height) {
                        if(!(dx===0 && dy===0)) f(i + dx, j + dy);
                    }
                }
            });
        });
    };

    var aliveNeighbors = function(i,j){
        var aliveCounter = 0;
        neighborIterate(function(x,y){
            if(isAlive(x,y)){
                aliveCounter+=1;
            }
        },i,j);
        return aliveCounter;
    };

    var forEachCell = function(f){
        board.forEach(function(dy,j){
             board.forEach(function(dx,i){
                 f(i,j);
             });
        });
    };

    var nextVitalStatus = function(i,j){
        var vitalStatus = board[i][j];
        var aliveNeighborCount = aliveNeighbors(i,j);
        if(vitalStatus === ALIVE){
            if(aliveNeighborCount === 2 || aliveNeighborCount === 3){
                return ALIVE;
            } else {
                return DEAD;
            }
        } else {
            if(aliveNeighborCount === 3){
                return ALIVE;
            } else {
                return DEAD;
            }
        }
    };

    var changeInVitalStatus = function(i,j){
        return board[i][j] !== nextVitalStatus(i,j);
    };

    that.changeCell = function(i, j){
        board[i][j] = (board[i][j] === ALIVE? DEAD: ALIVE);
    };

    that.update = function(){
        var cellsToUpdate = [];
        forEachCell(function(i,j){
            if(changeInVitalStatus(i,j)){
                cellsToUpdate.push({'i':i,'j':j});
            }
        });
        cellsToUpdate.forEach(function(cell){
            that.changeCell(cell.i,cell.j);
        });
    };

    that.boardToString = function(){
        var boardString = "";
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < length; i++) {
                cell = (board[j][i] === ALIVE ? ALIVE_STRING : DEAD_STRING);
                if(i === length-1) cell+="\n";
                boardString+=cell;
            }
        }
        return boardString;
    };

    Object.freeze(that);
    return that;
};

var BoardFromString = function(boardString) {
    var rows = boardString.split('\n');
    var board = Board(rows[0].length, rows.length);
    var aliveCells = [];
    rows.forEach(function(row,i){
            row.split("").forEach(function(cell,j){
                if(cell === "*") aliveCells.push({"i":i,"j":j}) ;
            });
        }
    );
    aliveCells.forEach(function(cell){
        board.changeCell(cell.i,cell.j);
    });
    return board;
};