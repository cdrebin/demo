var player = "";
var computer = "";
var current = "";
var gameboard = ["", "", "", "", "", "", "", "", ""];

var gameEnabled = false;
var blue = "#3f51b5";
var gray = "#bfc0c7";

var wins = 0;
var losses = 0;
var draws = 0;

// User selects their symbol, X always goes first
function selectPlayer(symbol) {
    switch (symbol.id) {
        case 'x':
          player = "x";
          computer = "o";
          break;
    
        case 'o':
          player = "o";
          computer = "x";
          break;
    }
    
    $(".player-selection").hide();
    $(".your-symbol").html("Your symbol: " + symbol.id);

    // game board disabled until symbol is chosen
    gameEnabled = true;

    if(player === "o") {
        // choose middle tile as first move
        gameboard[4] = computer;
        updateBoard(4);
    }
    $(".turn").html("It's your turn");

}

// User clicks on a square
function selectSquare(num) {
    var id = num.id;

    // Ensure that selected tile is clickable
    if (gameEnabled && gameboard[id] === "") {
        gameboard[id] = player;
        updateBoard(id);
        var draw = checkDraw(gameboard);
        var score = checkWin(gameboard, player);

        if(draw) {
            draws++;
            updateScore();
            reset();
        }

        if(score === -10) {
            $(".turn").html("");
            losses++;
            updateScore();
            reset();
        }
        else if(score === 10) {
            $(".turn").html("");
            wins++;
            updateScore();
            reset();
        }
        else if(score === 0){
            $(".turn").html("It's the computer's turn");
            setTimeout(function() {
                computerMove();
              }, 1000);
        }
    } 
}

// Computer chooses the best available move using the minimax algorithm
function computerMove() {
    // $(".turn").html("It's the computer's turn");
    var bestScore = -1000;
    var bestMove = -1;

    // calculate a minimax score for each empty tile, choose the max score
    for(var i = 0; i < 9; ++i) {
        if(gameboard[i] === "") {
            var board = gameboard.slice();
            board[i] = computer;
            var moveScore = miniMax(board, 0, false);
            // board[i] = "";

            if(moveScore > bestScore) {
                bestScore = moveScore;
                bestMove = i;
            }
        }
    }

    // Make the best move
    gameboard[bestMove] = computer;
    updateBoard(bestMove);
    
    var draw = checkDraw(gameboard);
    var score = checkWin(gameboard, computer);

    $(".turn").html("");
    
    if(computer === "") {
        score = 0;
        return;
    }

    if(draw) {
        draws++;
        updateScore();
        reset();
    }
    else if(score === 10) {
        losses++;
        updateScore();
        reset();
    }
    else if(score === -10) {
        wins++;
        updateScore();
        reset();
    }
    else {
        $(".turn").html("It's your turn");
    }
}

/* Minimax algorithm for finding the best move
* Recursively considers all possible ways the game can go 
* and calculates a score for each possible move
* assuming that the user plays perfectly as well
*/
function miniMax(board, depth, isMax) {
    var score = checkWin(board, computer);

    if (score === 10) {
        return score - depth;
    }
    else if (score === -10) {
        return score + depth;
    }
    else {
        if (checkDraw(board)) {
            return 0;
        }
    }

    if (isMax) {
        // Computer is the maximizer
        var best = -1000;

        // Try every possible move on blank tiles, call minimax 
        for(var i = 0; i < 9; ++i) {
            if(board[i] === "") {
                var boardWithMove = board.slice();
                boardWithMove[i] = computer;
                // maximized score
                best = Math.max(best, miniMax(boardWithMove, depth+1, !isMax));
            }
        }

        return best;
    }
    else {
        // Simulated player is the minimizer
        var best = 1000;

        // Try every possible move on blank tiles, call minimax 
        for(var i = 0; i < 9; ++i) {
            if(board[i] === "") {
                var boardWithMove = board.slice();
                boardWithMove[i] = player;
                // minimized score
                best = Math.min(best, miniMax(boardWithMove, depth+1, !isMax));
            }
        }

        return best;
    }
}

// 8 ways to win the game, check each for the given player
function checkWin(board, curr) {
    var winner = "";
    switch (true) {
        case board[0] !== "" && board[0] === board[1] && board[1] === board[2]:
          // show('#0', '#1', '#2');
          winner = board[0];
          break;
    
        case board[3] !== "" && board[3] === board[4] && board[4] === board[5]:
          // show('#3', '#4', '#5');
          winner = board[3];
          break;
    
        case board[6] !== "" && board[6] === board[7] && board[7] === board[8]:
          // show('#6', '#7', '#8');
          winner = board[6];
          break;
    
        case  board[0] !== "" && board[0] === board[3] && board[3] === board[6]:
          // show('#0', '#3', '#6');
          winner = board[0];
          break;

        case board[1] !== "" && board[1] === board[4] && board[4] === board[7]:
          // show('#1', '#4', '#7');
          winner = board[1];
          break;
    
        case board[2] !== "" && board[2] === board[5] && board[5] === board[8]:
          // show('#2', '#5', '#8');
          winner = board[2];
          break;
    
        case board[0] !== "" && board[0] === board[4] && board[4] === board[8]:
          // show('#0', '#4', '#8');
          winner = board[0];
          break;
    
        case board[2] !== "" && board[2] === board[4] && board[4] === board[6]:
          // show('#2', '#4', '#6');
          winner = board[2];
          break;
    
        default:
            winner = "";
            break;
      }

    if(winner === curr) {
        return 10;
    }
    else if(winner === "") {
        return 0;
    }
    return -10;
}

// There is a draw if there are no empty spaces without a winner
function checkDraw(board) {
    for(var i  = 0; i < 9; ++i) {
        if(board[i] === ""){
            return false;
        }
    }
    return true;
}


// Update the value of a given tile
function updateBoard(i) {
    $("#" + i).html(gameboard[i]);

    switch(gameboard[i]){
        case "x":
            $("#" + i).css("background-color", blue);
            break;
        case "o":
            $("#" + i).css("background-color", gray);
            break;
        default:
            $("#" + i).css("background-color", "white");
            break;
    }
}

function reset() {
    player = "";
    computer = "";
    current = "";
    gameboard = ["", "", "", "", "", "", "", "", ""];

    gameEnabled = false;

    $(".player-selection").show();
    $(".your-symbol").html("");

    for(var i = 0; i < 9; ++i) {
        updateBoard(i);
    }
}

function updateScore() {
    $(".win").html("Wins: " + wins);
    $(".loss").html("Losses: " + losses);
    $(".draw").html("Draws: " + draws);
}
