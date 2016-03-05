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
		this.drawGrid();
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
		if (this.intervalID === null) {
			this.intervalID = window.setInterval(function() {
				console.log("x");
				gameCode.nextIteration();
			}, 50);
		}
	},

	"pauseGame" : function() {
		if (this.intervalID !== null) {
			window.clearInterval(this.intervalID);
			this.intervalID = null;
		}
	},

	"resetGame" : function() {
		if (this.intervalID !== null) {
			window.clearInterval(this.intervalID);
			this.intervalID = null;
		}
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

	"populateWithTestData1" : function() {
		gameData.grid[50][50] = new Cell(true);
		gameData.grid[50][51] = new Cell(true);
		gameData.grid[50][52] = new Cell(true);
		gameData.grid[50][53] = new Cell(true);
		gameData.grid[51][52] = new Cell(true);
		gameData.grid[52][52] = new Cell(true);
		gameData.grid[54][55] = new Cell(true);
		gameData.grid[49][50] = new Cell(true);
		gameData.grid[48][57] = new Cell(true);
		gameData.grid[47][50] = new Cell(true);
		gameData.grid[50][48] = new Cell(true);		
		gameData.grid[45][50] = new Cell(true);
		gameData.grid[47][50] = new Cell(true);
		gameData.grid[46][50] = new Cell(true);
		gameData.grid[49][52] = new Cell(true);
		gameData.grid[55][52] = new Cell(true);
		gameData.grid[57][52] = new Cell(true);
		gameData.grid[52][52] = new Cell(true);
		gameData.grid[60][60] = new Cell(true);
		gameData.grid[60][61] = new Cell(true);
		gameData.grid[60][62] = new Cell(true);
		gameData.grid[60][65] = new Cell(true);
		this.drawGrid();
	},

	"onCanvasClick" : function(event) {
		var mod = Math.round(GRID_FIELD_SIZE / 2);
		var x = Math.round((event.clientX - mod - event.target.offsetLeft) / GRID_FIELD_SIZE);
		var y = Math.round((event.clientY - mod - event.target.offsetTop) / GRID_FIELD_SIZE);
		gameData.grid[x][y] = new Cell(true);
		this.drawGrid();
	}
};

//-----------------------------
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("gameview").addEventListener("click", function(event) {
		gameCode.onCanvasClick(event);
	});
	gameCode.init();
});

