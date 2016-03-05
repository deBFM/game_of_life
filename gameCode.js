/**
 * Game of Life
 *
 * @author Dennis Kronbügel
 */

//-----Configuration-----//
const GRID_FIELD_SIZE = 10;
const GRID_X_COUNT = 100;
const GRID_Y_COUNT = 100;

//-----Classes-----//
function Cell(alive) {
	this.alive = alive;
	this.nextIterationAlive = false;
	this.wasAlive = false;
}

Cell.prototype.testFunction = function() {

};

//-----Data-----//
var gameData = {
	grid : null // two dimensional Array of Cell´s
};

var gameCode = {
	"renderer" : null, /* CanvasRenderingContext2D */

	"init" : function() {
		this.renderer = document.getElementById("gameview").getContext("2d");
		this.initGrid();
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

	"drawGrid" : function() {
		this.renderer.fillStyle = "#FFFFFF";
		this.renderer.fillRect(0, 0, GRID_X_COUNT * GRID_FIELD_SIZE, GRID_Y_COUNT * GRID_FIELD_SIZE);
		this.renderer.fillStyle = "#8BC34A";
		for (var x = 0; x < GRID_X_COUNT; x++) {
			for (var y = 0; y < GRID_Y_COUNT; y++) {
				if (gameData.grid[x][y].alive === true) {
					this.renderer.fillRect(x * GRID_FIELD_SIZE, y * GRID_FIELD_SIZE, GRID_FIELD_SIZE, GRID_FIELD_SIZE);
				}
				this.renderer.rect(x * GRID_FIELD_SIZE, y * GRID_FIELD_SIZE, GRID_FIELD_SIZE, GRID_FIELD_SIZE);
			}
		}

		this.renderer.strokeStyle = "rgb(200,200,200)";
		this.renderer.stroke();
	},

	"nextIteration" : function() {
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
						console.log("cell[" + x + "][ " + y + "] die by underpop");
						//die by underpopulation
					} else if (neighborCount > 3) {
						cell.nextIterationAlive = false;
						console.log("cell[" + x + "][ " + y + "] die by overpop");
						//die overpopulation
					} else {
						cell.nextIterationAlive = true;
						console.log("cell[" + x + "][ " + y + "] still alive");
					}
				} else {
					if (neighborCount == 3) {
						cell.nextIterationAlive = true;
						console.log("cell[" + x + "][ " + y + "] reborn");
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
	},

	"util" : {
		"getCountOfAliveNeighbors" : function(posX, posY) {
			var counter = 0;
			for (var x = posX - 1; x <= posX + 1; x++) {
				for (var y = posY - 1; y <= posY + 1; y++) {
					try {
						var cell = gameData.grid[x][y];
						if (posX != x && posY != y && cell && cell.alive === true) {
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
	}
};

//-----------------------------
document.addEventListener("DOMContentLoaded", function() {
	gameCode.init();
	//Testdate
	gameData.grid[0][0].alive = true;
	gameData.grid[0][1].alive = true;
	gameData.grid[1][1].alive = true;
	gameData.grid[1][2].alive = true;
	gameData.grid[1][3].alive = true;
	gameData.grid[1][4].alive = true;
	gameData.grid[2][1].alive = true;
	gameData.grid[2][2].alive = true;
	gameData.grid[2][3].alive = true;
	gameData.grid[2][5].alive = true;
	gameData.grid[4][1].alive = true;
	gameData.grid[4][2].alive = true;
	gameData.grid[4][3].alive = true;
	gameData.grid[4][4].alive = true;
	gameData.grid[6][4].alive = true;
	gameData.grid[6][6].alive = true;
	gameData.grid[6][7].alive = true;
	gameData.grid[6][8].alive = true;
	gameData.grid[8][7].alive = true;
	gameData.grid[8][9].alive = true;
	gameData.grid[9][9].alive = true;
	gameData.grid[10][9].alive = true;
	gameData.grid[10][10].alive = true;
});


