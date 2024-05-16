//Enter your Javascript code here. You must rename this file with your initials for your first name and last name.
// Example John Doe will be jdscript.js

// Instructions from https://www.codebrainer.com/blog/tic-tac-toe-javascript-game

// Step One) This section is responsible for the combination of movements for winning the game.

const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
// Step Two) This section is responsible for the interactive elements of the game such as the restart button and the winning message text elements.

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

// Step Three) This section starts the game allowing the players to start as X while removing all previous characters left from the previous game.

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

//Step Four) The function "handleClick" we handle the mouse click events for the cells in the board.
// Most of the functions called herer will be separately explained. in short, the "currentClass" variable save
// the character (X or O), whose turn is at the moment. Another fuction is used in the if statement to check if 
// someone has already won by comparing the winning combinations to the gameplay. This way it determines wheather 
// there is a draw or not.

function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

//Step Five) The "game End()" function was mentioned previously. It is the function that ends the game.
// The function can either display a winner message which specifies which character won or a message 
// that states there is no winner - it is a draw depending on the outcome of the 'if statment.'

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = "It's a draw!"
	} else {
		winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "0's" : "X's"} wins!` 
	}
	winningMessageElement.classList.add('show')
}

// Step Six) Another function that was mentioned before "isDraw()" function. This one just returns the
// value in case there is a draw, meaning that neither of the players has won. There is also a nice 
// method hidden in the "isDraw" function named "every" that checks all elements of an array to confirm
// a condition by returning a boolean valu. It sia usaally defined as an array which tests the elements 
// of an array and returns true (1) if they pass the test. 

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

// Step Seven) "placeMark()" and "swapTurns()" are two short and simple functions. The "placeMark()" places
// the character in the cell, "currentClas" being either and X or an O depending on whose turn it is.  
// The second function is the one which swaps the turns after the character is placed in a cell.

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

// Intermediate Step "Making Tic-Tac-Toe JavaScript game more interactive") In thupcoming part of 
// our JavaScript code, we will set the cursor hoveering effct nto the board. This will make it 
// easier for the player to aim at the cells. It also makes our game a bit more responsive. 

// Step Eight) Since we want a character to appear in the cells while hovering over them with our 
// mouse cursor before placing them, the setBoardHoverClass() function takes care of the interactive 
// part of that. The interactive elements will make our Tic-Tac-Toe JavaScript game more intresting.

function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}

//Step Nine) Lastly out of our JavaScript is the function "checkWin()" which is called to check if our 
// board matches any of the winning combinations.

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}

// GO TO .CSS NEXT!