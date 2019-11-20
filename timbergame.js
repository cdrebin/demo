
var state = {
    player: '',
    comp: '',
    curr: '',
    winner: 0,
    turns: 0,
    pieces: ["", "", "","", "", "","", "", ""],
    boardEnabled: false,
}

function selectSquare(num) {
    console.log(state)
    var id = num.id;
    if (state.boardEnabled) {
        state.pieces[id] = state.player;
        updateBoard(id);
        state.curr = state.player;
        state.turns++;
        checkWin();
    }
    computerMove();
}

function selectPlayer(symbol) {
    switch (symbol.id) {
        case 'x':
          state.player = "x";
          state.comp = "o";
          break;
    
        case 'o':
          state.player = "o";
          state.comp = "x";
          break;
    }
    
    $(".player-selection").hide();
    $(".your-symbol").html("Your symbol: " + symbol.id);
    state.boardEnabled = true;
    computerMove();

}

function computerMove() {
    state.curr = state.comp;
    state.pieces[4] = state.comp;
    state.turns++;
    console.log(state);
    updateBoard(4);
    checkWin();
}

function updateBoard(i) {
    $("#" + i).html(state.pieces[i]);

    switch(state.pieces[i]){
        case "x":
            $("#" + i).css("background-color", "green");
            break;
        case "o":
            $("#" + i).css("background-color", "red");
            break;
        default:
            $("#" + i).css("background-color", "aqua");
            break;

    }
}

function checkWin() {
    var currTurn;

    if (state.curr == state.player)
      currTurn = state.player;
    else if (state.curr == state.comp)
      currTurn = state.comp;
  
    switch (true) {
      case $("#1").html() == currTurn && $("#2").html() == currTurn && $("#3").html() == currTurn:
        show('#1', '#2', '#3');
        state.winner = 1;
        break;
  
      case $("#4").html() === currTurn && $("#5").html() === currTurn && $("#6").html() === currTurn:
        show('#4', '#5', '#6');
        state.winner = 1;
        break;
  
      case $("#7").html() === currTurn && $("#8").html() === currTurn && $("#9").html() === currTurn:
        show('#7', '#8', '#9');
        state.winner = 1;
        break;
  
      case $("#1").html() === currTurn && $("#4").html() === currTurn && $("#7").html() === currTurn:
        show('#1', '#4', '#7');
        state.winner = 1;
        break;
  
      case $("#2").html() === currTurn && $("#5").html() === currTurn && $("#8").html() === currTurn:
        show('#2', '#5', '#8');
        state.winner = 1;
        break;
  
      case $("#3").html() === currTurn && $("#6").html() === currTurn && $("#9").html() === currTurn:
        show('#3', '#6', '#9');
        state.winner = 1;
        break;
  
      case $("#1").html() === currTurn && $("#5").html() === currTurn && $("#9").html() === currTurn:
        show('#1', '#5', '#9');
        state.winner = 1;
        break;
  
      case $("#3").html() === currTurn && $("#5").html() === currTurn && $("#7").html() === currTurn:
        show('#3', '#5', '#7');
        state.winner = 1;
        break;
  
      default:
        draw();
    }

    if (state.winner === 1) {
        console.log(currTurn + " wins!");
        //display game winner
        reset();
    }
}

function draw() {
    if (state.turns === 9) {
        console.log("There is a tie!")
    }
}

function show(one, two, three) {
    console.log(one, two, three);
}

function reset() {
    state = {
        player: '',
        comp: '',
        curr: '',
        winner: 0,
        turns: 0,
        pieces: ["", "", "", "", "", "", "", "", ""],
        boardEnabled: false,
    }

    $(".player-selection").show();
    $(".your-symbol").html("");

    var i = 0;
    for(i; i < state.pieces.length; ++i) {
        updateBoard(i);
    }
}