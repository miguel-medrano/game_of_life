/*
Creates a Game of Life Board object.
@param length - integer board length
@param height - integer board height
@param aliveString - single string character that will represent alive cells when board is printed as string (optional)
@param deadString - single string character that will represent dead cells when board is printed as string (optional)
 */
var Board = function(length, height, aliveString, deadString){

    //assign prototype for comparisons
    var that = Object.create(Board.prototype);

    //instance variables/constants
    var ALIVE = 1;
    var DEAD = 0;
    var ALIVE_STRING = aliveString || "*";
    var DEAD_STRING = deadString || "-";

    //loop helper function from class
    var times = function (i, f) {
        if (i === 0) return;
        f(); times (i-1, f)
    };

    /*
    (Note: From piazza)
    creates the representation of board as array
    assigns a 2D array of the given length and height
    */
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

    /*
    @param i, row of cell
    //@param j, column of cell
    //@return boolean if cell at index i,j is alive
    */
    var isAlive = function(i,j){
        return board[i][j] === ALIVE;
    };

    /*
    Applies a given function to the 8 neighbors of a cell.
    @param f(r,c), function with parameters r,c to be neighbor indexes.
    @param i, row of cell
    @param j, column of cell
    */
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

    /*
    Counts the Number of Neighbors alive for a given cell
    @param i, row of cell
    @param j, column of cell
    @return integer number of alive neighbors
    */
    var aliveNeighbors = function(i,j){
        var aliveCounter = 0;
        neighborIterate(function(x,y){
            if(isAlive(x,y)){
                aliveCounter+=1;
            }
        },i,j);
        return aliveCounter;
    };
    /*
    functional applied to every cell element in board
    @param f - function with parameters r,c to be cell indexes
    */
    var forEachCell = function(f){
        board.forEach(function(dy,j){
             board.forEach(function(dx,i){
                 f(i,j);
             });
        });
    };

    /*
    Returns the next state of the cell (Alive/Dead)
    @param i, cell row
    @param j, cell column
    @return string character representing cell as alive or dead
    */
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

    /*
    Checks if there is a change if the vitalState of a given cell
    between the current step and the next step
    @param i, cell row
    @param j, cell column
    @return boolean, true if change in vital status, false otherwise
    */
    var changeInVitalStatus = function(i,j){
        return board[i][j] !== nextVitalStatus(i,j);
    };

    /*
    PUBLIC FUNCTION
    Changes the vital state of a given cell
    If dead, change to alive, if alive, change to dead
    @param i, cell row
    @param j, cell column
    */
    that.changeCell = function(i, j){
        board[i][j] = (board[i][j] === ALIVE? DEAD: ALIVE);
    };

    /*
    PUBLIC FUNCTION
    Changes the state of the current board to the next step in time
    */
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

    /*
    PUBLIC FUNCTION
    Returns a string representation of the board.
     */
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

/*@Override
 Creates a Game of Life Board Object
@param boardString, string representation of board.
Length of all rows must be equal.
Can only contain '*','-','\n' characters.
'*' - Alive Cells
'-' - Dead Cells
'\n' - end of row
@return Board object.
*/
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