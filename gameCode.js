/**
 * Game of Life
 *
 * @author Dennis Kronbügel
 */

const GRID_FIELD_SIZE = 10;
const GRID_X_COUNT = 100;
const GRID_Y_COUNT = 100;

var gameData = {
	grid : []
};

var gameCode = {
	"renderer" : null, /* CanvasRenderingContext2D */

	"init" : function() {
		this.renderer = document.getElementById("gameview").getContext("2d");
		this.initGrid();
	},

	"initGrid" : function() {
		gameData.grid = new Array(GRID_X_COUNT);
		for (var i = 0; i <= GRID_X_COUNT; i++) {
			gameData.grid[i] = new Array(GRID_Y_COUNT);
		}
	},

	"drawGrid" : function() {
		for (var x = 0; x <= 50; x = x + 1) {
			for (var y = 0; y <= 50; y = y + 1) {
				if (gameData.grid[x][y] === true) {
					this.renderer.fillRect(x * GRID_FIELD_SIZE, y * GRID_FIELD_SIZE, GRID_FIELD_SIZE, GRID_FIELD_SIZE);
				} else {
					this.renderer.rect(x * GRID_FIELD_SIZE, y * GRID_FIELD_SIZE, GRID_FIELD_SIZE, GRID_FIELD_SIZE);
				}
			}
		}
		this.renderer.strokeStyle = "rgb(240,240,240)";
		this.renderer.stroke();
	},

	"nextIteration" : function() {
		//1. berechnen auf grundlage von gameDate.grid -> Ergebnisse gehen aber in ein pufferGrid.
		//2. puffergrid auf das gameDate.grid bügeln.
		
		
		this.drawGrid();
	}
};

//-----------------------------
document.addEventListener("DOMContentLoaded", function() {
	gameCode.init();
	//Testdaten
	gameData.grid[1][2] = true;
	gameData.grid[2][2] = true;
	gameData.grid[2][3] = true;
	gameData.grid[3][4] = true;
	gameData.grid[3][1] = true;

});

