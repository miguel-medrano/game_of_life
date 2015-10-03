var CONTROLLER = (function(document){
    var pixSize = 7;
    var cellListener;
    var playListener;
    var play;
    var playing;
    var interval = 175;
    var boardTable = document.getElementById("board-table");
    var playButton = document.getElementById("play-button");

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

    function onPlayButtonClick(){
        console.log("button");
        playButton.innerHTML = "Pause";
        playing = true;
        playButton.removeEventListener('click', onPlayButtonClick);
        playButton.addEventListener('click', onPauseButtonClick);
        play = setInterval(playListener, interval);
    }

    function onPauseButtonClick(){
        console.log("Play");
        playButton.innerHTML = "Play";
        playing = false;
        playButton.removeEventListener('click', onPauseButtonClick);
        playButton.addEventListener('click', onPlayButtonClick);
        clearInterval(play);
    }

    playButton.addEventListener('click',onPlayButtonClick, false);


    function showBoard(boardString){
        var rows = boardString.split('\n');
        rows.forEach(function(row,j){
                tr = createRowElement();
                row.split("").forEach(function(cell,i){
                    var color = (cell === "*"? "white" : "darkblue");
                    tr.appendChild(createCellElement(j,i,color, onCellClick));
                });
                boardTable.appendChild(tr);
            }
        );
    }

    function registerPlayFunction(listener){
        playListener = listener;
    }

    return {
        "showBoard": showBoard,
        "clearBoardTable": clearBoardTable,
        "registerCellListener": registerCellListener,
        "registerPlayFunction": registerPlayFunction,
    };


})(document);