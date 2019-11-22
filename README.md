# Unbeatable Tic Tac Toe
Timber code challenge for an unbeatable game of tic tac toe. 

## Running the Demo
You can view the demo [here](https://cdrebin.github.io/demo/)
To run the demo locally, clone the repo and open index.html in Chrome

## How it works
To create an unbeatable Tic Tac Toe game, I used the Minimax algorithm referenced [here](https://towardsdatascience.com/tic-tac-toe-creating-unbeatable-ai-with-minimax-algorithm-8af9e52c1e7d). The frontend was created using HTML/CSS/JavaScript (with jQuery). 

Essentially, this algorithm works because there are only a finite number of moves that can be played on a tic tac toe board, so it is possible to recursively iterate through all possible moves that the computer can make. We can assign a score to each possible move by calculating the next moves (assuming the user will make the best possible move as well) until the game reaches an end state (a win, loss or draw for the user). This creates a tree-like structure of possible game states, with the best move being the one with the highest score at the lowest depth (smallest number of moves). 

The game begins by having the user select their symbol for the game (X or O). X will always go first. If the computer has the first move, it will always choose the middle square to avoid the longest iteration of the algorithm (calculating all possible game outcomes). The game automatically resets when the game is over, though the game can be reset in the middle of a game with the `reset` button. The user will choose a new symbol at the beginning of each game, but the running scoreboard at the bottom of the page will keep track of their wins vs. the computer's. 
