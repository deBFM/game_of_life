/**
 * Game of Life
 *
 * @author Dennis Kronbügel
 */

//-----Configuration-----//
const GRID_FIELD_SIZE = 4;
const GRID_X_COUNT = 200;
const GRID_Y_COUNT = 100;

//-----Classes-----//
function Cell(alive) {
	this.alive = alive;
	this.wasAlive = alive;
	this.nextIterationAlive = false;
}

Cell.prototype.testFunction = function() {

};

//-----Data-----//
var gameData = {
	grid : null // two dimensional Array of Cell´s
};

var gameCode = {
	"onCycle" : false,
	"intervalID" : null,
	"renderer" : null, /* CanvasRenderingContext2D */

	"init" : function() {
		this.renderer = document.getElementById("gameview").getContext("2d");
		this.initGrid();
		this.populateWithTestData();
		this.clearGrid();
	},

	"initGrid" : function() {
		gameData.grid = new Array(GRID_X_COUNT);
		for (var x = 0; x < GRID_X_COUNT; x++) {
			gameData.grid[x] = new Array(GRID_Y_COUNT);
			for (var y = 0; y < GRID_Y_COUNT; y++) {
				gameData.grid[x][y] = new Cell(false);
			}
		}
	},

	"startGame" : function() {
		this.intervalID = window.setInterval(function() {
			console.log("x");
			gameCode.nextIteration();
		}, 50);
	},

	"pauseGame" : function() {
		window.clearInterval(this.intervalID);
	},

	"resetGame" : function() {
		window.clearInterval(this.intervalID);
		this.init();
	},

	"drawGrid" : function() {
		//		this.renderer.clearRect(0, 0, GRID_X_COUNT * GRID_FIELD_SIZE, GRID_Y_COUNT * GRID_FIELD_SIZE);
		this.clearGrid();

		for (var x = 0; x < GRID_X_COUNT; x++) {
			for (var y = 0; y < GRID_Y_COUNT; y++) {
				if (gameData.grid[x][y].alive === true) {
					this.renderer.fillStyle = "#8BC34A";
					this.renderer.fillRect(x * GRID_FIELD_SIZE, y * GRID_FIELD_SIZE, GRID_FIELD_SIZE, GRID_FIELD_SIZE);
				} else if (gameData.grid[x][y].wasAlive === true) {
					this.renderer.fillStyle = "#FFAAFF";
					this.renderer.fillRect(x * GRID_FIELD_SIZE, y * GRID_FIELD_SIZE, GRID_FIELD_SIZE, GRID_FIELD_SIZE);
				}
			}
		}
		this.renderer.strokeStyle = "rgb(200,200,200)";
		this.renderer.stroke();
	},

	"clearGrid" : function() {
		this.renderer.clearRect(0, 0, GRID_X_COUNT * GRID_FIELD_SIZE, GRID_Y_COUNT * GRID_FIELD_SIZE);
	},

	"nextIteration" : function() {
		if (this.onCycle) {
			return;
		} else {
			this.onCycle = true;
		}

		//---Rules---
		//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
		//Any live cell with two or three live neighbours lives on to the next generation.
		//Any live cell with more than three live neighbours dies, as if by over-population.
		//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

		//Apply gamelogic
		for (var x = 0; x < GRID_X_COUNT; x++) {
			for (var y = 0; y < GRID_Y_COUNT; y++) {
				var neighborCount = this.util.getCountOfAliveNeighbors(x, y);
				var cell = gameData.grid[x][y];
				if (cell.alive === true) {
					if (neighborCount < 2) {
						cell.nextIterationAlive = false;
						//die by underpopulation
					} else if (neighborCount > 3) {
						cell.nextIterationAlive = false;
						//die overpopulation
					} else {
						cell.nextIterationAlive = true;
						cell.wasAlive = true;
					}
				} else {
					if (neighborCount == 3) {
						cell.nextIterationAlive = true;
						cell.wasAlive = true;

					} else {
						cell.nextIterationAlive = false;
						// stay dead
					}
				}
			}
		}
		// update grid wiht next iteration
		for (var x = 0; x < GRID_X_COUNT; x++) {
			for (var y = 0; y < GRID_Y_COUNT; y++) {
				gameData.grid[x][y].alive = gameData.grid[x][y].nextIterationAlive;
			}
		}

		this.drawGrid();
		this.onCycle = false;
	},

	"util" : {
		"getCountOfAliveNeighbors" : function(posX, posY) {
			var counter = 0;
			for (var x = posX - 1; x <= posX + 1; x++) {
				for (var y = posY - 1; y <= posY + 1; y++) {
					try {
						var cell = gameData.grid[x][y];
						if (!(posX == x && posY == y) && cell.alive === true) {
							counter++;
							//console.log("cell[" + posX + "][ " + posY + "] counter Up because of(" + x + "," + y + ")");
						}
					} catch(e) {
						//just out of bounds
					}
				}
			}

			return counter;
		}
	},

	"populateWithTestData" : function() {
		gameData.grid[0][0] = new Cell(true);
		gameData.grid[0][1] = new Cell(true);
		gameData.grid[1][1] = new Cell(true);
		gameData.grid[1][2] = new Cell(true);
		gameData.grid[1][3] = new Cell(true);
		gameData.grid[1][4] = new Cell(true);
		gameData.grid[2][1] = new Cell(true);
		gameData.grid[2][2] = new Cell(true);
		gameData.grid[2][3] = new Cell(true);
		gameData.grid[2][5] = new Cell(true);
		gameData.grid[4][1] = new Cell(true);
		gameData.grid[100][50] = new Cell(true);
		gameData.grid[100][51] = new Cell(true);
		gameData.grid[101][52] = new Cell(true);
		gameData.grid[101][53] = new Cell(true);
		gameData.grid[102][54] = new Cell(true);
		gameData.grid[103][99] = new Cell(true);
		gameData.grid[199][99] = new Cell(true);
		gameData.grid[198][99] = new Cell(true);
		gameData.grid[197][99] = new Cell(true);
		gameData.grid[196][99] = new Cell(true);
		gameData.grid[195][97] = new Cell(true);
		gameData.grid[194][97] = new Cell(true);
		gameData.grid[193][97] = new Cell(true);
		gameData.grid[100][50] = new Cell(true);
		gameData.grid[100][51] = new Cell(true);
		gameData.grid[100][52] = new Cell(true);
		gameData.grid[100][53] = new Cell(true);
		gameData.grid[101][51] = new Cell(true);
		gameData.grid[101][52] = new Cell(true);
		gameData.grid[101][53] = new Cell(true);
		gameData.grid[101][54] = new Cell(true);
		gameData.grid[101][55] = new Cell(true);
		gameData.grid[100][57] = new Cell(true);
		gameData.grid[100][58] = new Cell(true);
		gameData.grid[100][59] = new Cell(true);
		gameData.grid[102][57] = new Cell(true);
		gameData.grid[102][47] = new Cell(true);
		gameData.grid[102][37] = new Cell(true);
		gameData.grid[103][37] = new Cell(true);
		gameData.grid[99][67] = new Cell(true);
		gameData.grid[99][65] = new Cell(true);
		gameData.grid[99][64] = new Cell(true);
		gameData.grid[99][69] = new Cell(true);
		gameData.grid[98][69] = new Cell(true);
		gameData.grid[97][69] = new Cell(true);
		gameData.grid[97][67] = new Cell(true);						
		gameData.grid[96][67] = new Cell(true);
		gameData.grid[95][67] = new Cell(true);
		gameData.grid[94][67] = new Cell(true);
		gameData.grid[93][67] = new Cell(true);
	}
};

//-----------------------------
document.addEventListener("DOMContentLoaded", function() {
	gameCode.init();
	//Testdate

});

