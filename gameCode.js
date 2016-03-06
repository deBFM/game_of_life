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
	"delay" : 30,
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

	"intervalDelay" : function(delay) {
		this.delay = delay;
		if (this.intervalID != null) {
			this.pauseGame();
			this.startGame();
		} 
	},

	"startGame" : function() {
		if (this.intervalID === null) {
			this.intervalID = window.setInterval(function() {
				gameCode.nextIteration();
			}, this.delay);
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
		// update grid with next iteration
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
		gameData.grid[45][50] = new Cell(true);
		gameData.grid[46][50] = new Cell(true);
		gameData.grid[47][50] = new Cell(true);
		gameData.grid[47][51] = new Cell(true);
		gameData.grid[48][57] = new Cell(true);
		gameData.grid[49][50] = new Cell(true);
		gameData.grid[49][52] = new Cell(true);
		gameData.grid[50][48] = new Cell(true);		
		gameData.grid[50][50] = new Cell(true);
		gameData.grid[50][51] = new Cell(true);
		gameData.grid[50][52] = new Cell(true);
		gameData.grid[50][53] = new Cell(true);
		gameData.grid[51][52] = new Cell(true);
		gameData.grid[52][51] = new Cell(true);
		gameData.grid[52][52] = new Cell(true);
		gameData.grid[54][55] = new Cell(true);
		gameData.grid[55][52] = new Cell(true);
		gameData.grid[57][52] = new Cell(true);
		gameData.grid[60][60] = new Cell(true);
		gameData.grid[60][61] = new Cell(true);
		gameData.grid[60][62] = new Cell(true);
		gameData.grid[60][65] = new Cell(true);
		this.drawGrid();
	},
	
	"populateWithTestData2" : function() {
		gameData.grid[70][51] = new Cell(true);		
		gameData.grid[70][49] = new Cell(true);
		gameData.grid[70][48] = new Cell(true);
		gameData.grid[70][49] = new Cell(true);
		gameData.grid[70][51] = new Cell(true);
		gameData.grid[70][52] = new Cell(true);
		gameData.grid[70][55] = new Cell(true);
		gameData.grid[75][49] = new Cell(true);
		gameData.grid[71][50] = new Cell(true);
		gameData.grid[72][50] = new Cell(true);
		gameData.grid[72][52] = new Cell(true);
		gameData.grid[73][50] = new Cell(true);
		gameData.grid[74][50] = new Cell(true);
		gameData.grid[75][47] = new Cell(true);
		gameData.grid[75][46] = new Cell(true);
		gameData.grid[75][48] = new Cell(true);
		gameData.grid[75][49] = new Cell(true);
		gameData.grid[75][50] = new Cell(true);
		gameData.grid[75][51] = new Cell(true);
		gameData.grid[75][50] = new Cell(true);
		gameData.grid[76][50] = new Cell(true);
		gameData.grid[77][50] = new Cell(true);
		gameData.grid[77][52] = new Cell(true);
		gameData.grid[78][50] = new Cell(true);
		gameData.grid[79][50] = new Cell(true);
		this.drawGrid();
	},
	
	"populateWithTestData3" : function() {
		gameData.grid[140][51] = new Cell(true);
		gameData.grid[140][52] = new Cell(true);
		gameData.grid[140][55] = new Cell(true);
		gameData.grid[145][49] = new Cell(true);
		gameData.grid[145][48] = new Cell(true);
		gameData.grid[145][47] = new Cell(true);
		gameData.grid[150][52] = new Cell(true);
		gameData.grid[150][42] = new Cell(true);
		gameData.grid[150][50] = new Cell(true);
		gameData.grid[150][51] = new Cell(true);
		gameData.grid[150][54] = new Cell(true);		
		gameData.grid[150][55] = new Cell(true);
		gameData.grid[150][56] = new Cell(true);
		gameData.grid[151][51] = new Cell(true);
		gameData.grid[152][52] = new Cell(true);
		gameData.grid[152][50] = new Cell(true);
		gameData.grid[153][53] = new Cell(true);
		gameData.grid[154][54] = new Cell(true);
		gameData.grid[155][41] = new Cell(true);
		gameData.grid[155][44] = new Cell(true);
		gameData.grid[155][45] = new Cell(true);
		gameData.grid[155][47] = new Cell(true);
		gameData.grid[155][48] = new Cell(true);
		gameData.grid[155][49] = new Cell(true);
		gameData.grid[155][53] = new Cell(true);
		gameData.grid[155][55] = new Cell(true);
		gameData.grid[156][51] = new Cell(true);
		gameData.grid[157][52] = new Cell(true);
		gameData.grid[157][53] = new Cell(true);
		gameData.grid[158][53] = new Cell(true);
		gameData.grid[159][54] = new Cell(true);

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

