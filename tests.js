/*
TEST SUITE:
 BOARD ADT
   update()
    updates alive cells
        1,4,5,6,7,8 Neighbors > DEAD
        2,3 > ALIVE
    updates dead cells
        3 > ALIVE
        1,2,4,5,6,7,8 Neighbors > DEAD
    updates()
        table corners
        table edges
        table center
    changeCell(i,j)
        value change
            if dead > alive
            if alive > dead
        Only changes 1 cell
        Only changes cell at index i,j
  UI *tested visually
     Displays Options Selector
        selcted default: new board
        selected:
            new Board selected > Display blank board
            Board1 Selected > Display board1
            board2 selected > display board2
            board3 selected > display board3
        When selected changes:
            pause, and display new board
     Displays Play Button
        when clicked
            begins running board
            changes button to pause button
     Displays Pause Button
        when clicked
            pauses running board
            changes button to play button
     Displays Restart Button
        when clicked
            displays current board from initial state
     Displays Table
        table are white for alive and blue for dead
        when cell clicked
            pause game if running and change the state of cell
 */

QUnit.test( "updateEmptyBoard", function( assert ) {
    var boardA = Board(3,3);
    var boardAString = boardA.boardToString();
    boardA.update();
    var boardBString = boardA.boardToString();
    assert.ok(boardAString === boardBString, "Passed!" );
});

QUnit.test("testUpdateToDead",function(assert){
    var board = Board(3,3);
    board.changeCell(0,0);board.changeCell(0,1);board.changeCell(0,2);
    board.changeCell(1,0);board.changeCell(1,1);board.changeCell(1,2);
    board.changeCell(2,0);board.changeCell(2,1);board.changeCell(2,2);
    board.update();
    var expectedBoard = "*-*\n"+"---\n"+"*-*\n";
    assert.ok(board.boardToString() === expectedBoard, "Passed!");
});

QUnit.test("testUpdateToAlive",function(assert){
    var board = Board(3,3);
    board.changeCell(0,1); board.changeCell(2,0); board.changeCell(2,2);
    var expectedBoard = "---\n"+"-*-\n"+"---\n";
    assert.ok(board.boardToString() !== expectedBoard, "Passed!");
});

QUnit.test("changeCellAlive",function(assert){
    var board = Board(1,1);
    board.changeCell(0,0);
    assert.ok(board.boardToString() !== "-\n", "Passed!");
});

QUnit.test("changeCellDead",function(assert){
    var board = Board(1,1);
    board.changeCell(0,0);
    board.changeCell(0,0);
    assert.ok(board.boardToString() === "-\n", "Passed!");
});