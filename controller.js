var CONTROLLER = (function(document){
    //Constants for Pixel Size of Cell and timing of updating view.
    var PIXSIZE = 5;
    var INTERVAL = 125;

    var play; //true if currently playing
    var playing; //setInterval object when playing

    //DOM Objects
    var boardTable = document.getElementById("board-table");
    var playButton = document.getElementById("play-button");
    var restartButton = document.getElementById("restart-button");
    var options = document.getElementById("options");

    //DOM Object Listeners
    var cellListener;
    var playListener;
    var restartListener;
    var optionsListener;

    //Assign function to run for Cells
    function registerCellListener(listener){
        cellListener = listener;
    }
    //Assign function to run for playButton
    function registerPlayFunction(listener){
        playListener = listener;
    }
    //Assign function to run for restartButton
    function registerRestartListener(listener){
        restartListener = listener;
    }
    //Assign function to run for Board Options selector
    function registerOptionsListener(listener){
        optionsListener = listener;
    }

    //clears the boardTable
    function clearBoardTable(){
        boardTable.innerHTML = '';
    }
    //triggers a click to the pause button
    function pause(){
        onPauseButtonClick();
    }
    //triggers a click to the restart button
    function restart(event){
        onRestartButtonClick();
    }
    //function to be assigned as listener to restart button
    function onRestartButtonClick(){
        restartListener();
    }
    //function to be assigned as listener to options selector
    function onOptionsClick(){
        optionsListener();
    }
    //function to be assigned as listener to play button
    function onPlayButtonClick(){
        playButton.innerHTML = "Pause";
        playing = true;
        playButton.removeEventListener('click', onPlayButtonClick);
        playButton.addEventListener('click', onPauseButtonClick);
        play = setInterval(playListener, INTERVAL);
    }
    //function to be assigned as listener to pause button
    function onPauseButtonClick(){
        playButton.innerHTML = "Play";
        playing = false;
        playButton.removeEventListener('click', onPauseButtonClick);
        playButton.addEventListener('click', onPlayButtonClick);
        clearInterval(play);
    }
    //function to be assigned as listener to cell element
    function onCellClick(event){
        if(playing) onPauseButtonClick();
        cellListener(event.target.x,event.target.y);
    }

    /*
     Create a <td> html element to assign be assigned as child to a tr html element
     @param x,y row and column of cell
     @param color, color of cell
     @param onClick, function to register an event listener to the returned td element
     @return td element with given indeces, color, and eventListener
     */
    function createCellElement(x,y, color, onClick) {
        var td = document.createElement('td');
        td.x = x;
        td.y = y;
        td.width = PIXSIZE;
        td.height = PIXSIZE;
        td.bgColor = color;
        td.addEventListener('click', onClick, false);
        return td;
    }
    //creates an <tr> html element
    function createRowElement(){
        return document.createElement('tr');
    }

    //Assign Listener Functions to each DOM element
    restartButton.addEventListener('click', onRestartButtonClick, false);
    playButton.addEventListener('click',onPlayButtonClick, false);
    options.addEventListener('change', onOptionsClick, false);

    function showBoard(boardString){
        var rows = boardString.split('\n');
        rows.forEach(function(row,j){
                tr = createRowElement();
                row.split("").forEach(function(cell,i){
                    var color = (cell === "*"? "white": "darkblue");
                    tr.appendChild(createCellElement(j,i,color, onCellClick));
                });
                boardTable.appendChild(tr);
            }
        );
    }
    //Returns the public functions
    return {
        "showBoard": showBoard,
        "clearBoardTable": clearBoardTable,
        "registerCellListener": registerCellListener,
        "registerPlayFunction": registerPlayFunction,
        "registerRestartListener": registerRestartListener,
        "registerOptionsListener": registerOptionsListener,
        "pause": pause,
        "restart": restart
    };

})(document);