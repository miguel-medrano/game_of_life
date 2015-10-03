var Board = function(length, height){
    var that = Object.create(Board.prototype);

    var ALIVE = 1;
    var DEAD = 0;
    var times = function (i, f) {
        if (i === 0) return;
        f(); times (i-1, f)
    };

    var board = function() {
        var rows = [];
        times(length, function () {
            var col = [];
            rows.push(col);
            times(height, function () {
                col.push(DEAD);
            })
        });
        return rows;
    }();


    var isAlive = function(i,j){
        return board[i][j] === ALIVE;
    };

    that.isAliveCheck = function(i,j){
        return isAlive(i,j);
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

    that.aliveNeighborsCheck = function(i,j){
        return aliveNeighbors(i,j);
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

    that.nextVitalStatusCheck = function(i,j){
        return nextVitalStatus(i,j);
    };

    var changeInVitalStatus = function(i,j){
        return board[i][j] !== nextVitalStatus(i,j);
    };

    that.changeInVitalStatusCheck = function(i,j){
        return changeInVitalStatus(i,j);
    };

    that.changeCell = function(i, j){
        board[i][j] = (board[i][j] === ALIVE? DEAD: ALIVE);
    };

    that.update = function(){
        var cellsToUpdate = [];
        forEachCell(function(i,j){
            if(changeInVitalStatus(i,j)){
                console.log('cells to update: ('+i+','+j+')');
                cellsToUpdate.push({'i':i,'j':j});
            }
        });
        cellsToUpdate.forEach(function(cell){
            that.changeCell(cell.i,cell.j);
        });
    };

    //temporary
    that.printBoard = function(){
        var boardString = "";
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < length; i++) {
                cell = (board[j][i] === ALIVE ? ' * ' : ' - ');
                if(i === length-1) cell+="\n"
                boardString+=cell;
            }
        }
        console.log(boardString);
    }

    Object.freeze(that);
    return that;
};