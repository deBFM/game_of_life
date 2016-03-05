/**
 * @author Dennis Kronbügel
 */

const GRID_FIELD_SIZE = 10;
const GRID_X_COUNT = 100;
const GRID_Y_COUNT = 100;

var gameData = {
	grid : []
};

var gameCode = {

	"init" : function() {
		console.log("init");
		this.initGrid();
	},

	"initGrid" : function() {
		console.log("initGrid");
		gameData.grid = [["a1", "a2"], ["b1", "b2"]];

	},

	"nextIteration" : function() {
		var canvas = document.getElementById("gameview");
		var renderer = canvas.getContext("2d");

		for (var x = 0; x <= 50; x = x + 1) {
			for (var y = 0; y <= 50; y = y + 1) {
				renderer.rect(x * GRID_FIELD_SIZE, y * GRID_FIELD_SIZE, GRID_FIELD_SIZE, GRID_FIELD_SIZE);
			}
		}
		renderer.stroke();
	}
};

//----main----
gameCode.init();
