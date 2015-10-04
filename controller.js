var CONTROLLER = (function(document){
    var pixSize = 5;
    var cellListener;
    var playListener;
    var restartListener;
    var play;
    var playing;
    var interval = 125;
    var boardTable = document.getElementById("board-table");
    var playButton = document.getElementById("play-button");
    var restartButton = document.getElementById("restart-button");
    var options = document.getElementById("options");


    restartButton.addEventListener('click', onRestartButtonClick, false);
    playButton.addEventListener('click',onPlayButtonClick, false);
    options.addEventListener('change', onOptionsClick, false);

    function createCellElement(x,y, color, onClick) {
        var td = document.createElement('td');
        td.x = x;
        td.y = y;
        td.width = pixSize;
        td.height = pixSize;
        td.bgColor = color;
        td.addEventListener('click', onClick, false);
        return td;
    }

    function createRowElement(){
        return document.createElement('tr');
    }

    function registerCellListener(listener){
        cellListener = listener;
    }

    function clearBoardTable(){
        boardTable.innerHTML = '';
    }

    function onCellClick(event){
        if(playing) onPauseButtonClick();
        cellListener(event.target.x,event.target.y);
    }

    function pause(){
        onPauseButtonClick();
    }

    function restart(event){
        onRestartButtonClick();
    }

    function onPlayButtonClick(){
        playButton.innerHTML = "Pause";
        playing = true;
        playButton.removeEventListener('click', onPlayButtonClick);
        playButton.addEventListener('click', onPauseButtonClick);
        play = setInterval(playListener, interval);
    }

    function onPauseButtonClick(){
        playButton.innerHTML = "Play";
        playing = false;
        playButton.removeEventListener('click', onPauseButtonClick);
        playButton.addEventListener('click', onPlayButtonClick);
        clearInterval(play);
    }

    function onRestartButtonClick(){
        restartListener();
    }

    function onOptionsClick(){
        optionsListener();
    }

    function registerPlayFunction(listener){
        playListener = listener;
    }

    function registerRestartListener(listener){
        restartListener = listener;
    }

    function registerOptionsListener(listener){
        optionsListener = listener;
    }


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