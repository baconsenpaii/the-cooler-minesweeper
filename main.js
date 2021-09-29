
const canvas = document.getElementById("🅱️ineswee🅱️er");

const display = {
	marginLeft: 32,
	marginTop: 32,
	cellWidth: 32,
	cellPadding: 4
};

const game = {
	width: 0,
	height: 0,
	tiles: []
};


function canvasToGrid (x, y) {
	// convert a canvas coordinate to a grid index

	let adjustedX = x - display.marginLeft - display.cellPadding;
	let adjustedY = y - display.marginTop - display.cellPadding;

	let cellTotalSize = display.cellWidth+display.cellPadding;

	if (adjustedX < 0 || adjustedX >= game.width * cellTotalSize - display.cellPadding ||
		adjustedY < 0 || adjustedY >= game.height * cellTotalSize - display.cellPadding) {

		return -1;
	}

	if (adjustedX%cellTotalSize >= display.cellWidth ||
		adjustedY%cellTotalSize >= display.cellWidth) {

		return -1;
	}

	return Math.floor(adjustedX/cellTotalSize) + Math.floor(adjustedY/cellTotalSize) * game.width;
}


function cellOnTopEdge (index) {
	return index < game.width;
}

function cellOnBottomEdge (index) {
	return index >= (game.height - 1)*game.width;
}

function cellOnLeftEdge (index) {
	return index % game.width == 0;
}

function cellOnRightEdge (index) {
	return index % game.width == game.width - 1;
}


function handleMouse (e) {
	e.preventDefault();

	// if in grid, you Clicked a Cell
	let gridIndex = canvasToGrid(e.offsetX, e.offsetY);

	if (gridIndex != -1) {
		let msg = e.button == 0 ? "left " : e.button == 1 ? "middle " : "right ";
		msg += "clicked cell " + gridIndex;
		console.log(msg);
		console.log(
			cellOnTopEdge(gridIndex) ? " " : "↑",
			cellOnLeftEdge(gridIndex) ?  " " : "←",
			cellOnRightEdge(gridIndex) ?  " " : "→",
			cellOnBottomEdge(gridIndex) ?  " " : "↓"
		);
	}
}


function drawBorder () {
	let ctx = canvas.getContext("2d");
	ctx.strokeStyle = "white";
	let cellSize = display.cellWidth+display.cellPadding;
	ctx.strokeRect(display.marginLeft, display.marginTop, cellSize*game.width+display.cellPadding, cellSize*game.height+display.cellPadding);
}

function drawGrid () {
	let ctx = canvas.getContext("2d");
	ctx.strokeStyle = "grey";

	for (x=0;x<game.width;x++) {
		let cellX = display.marginLeft+display.cellPadding+x*(display.cellWidth+display.cellPadding);
		for (y=0;y<game.height;y++) {
			let cellY = display.marginTop+display.cellPadding+y*(display.cellWidth+display.cellPadding);
			ctx.strokeRect(cellX, cellY, display.cellWidth, display.cellWidth);
		}
	}
}


function initGame (width, height) {
	game.width = width;
	game.height = height;

	game.tiles = Array(width*height);

	canvas.width = display.marginLeft*2 + (display.cellWidth+display.cellPadding)*game.width + display.cellPadding;
	canvas.height = display.marginTop*2 + (display.cellWidth+display.cellPadding)*game.height + display.cellPadding;

	canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);

	drawBorder();
	drawGrid();
}


window.onload = function () {
	initGame(9, 9);
};

window.addEventListener("keypress", e => { display.cellWidth++; window.onload(); });
canvas.addEventListener("contextmenu", e => { e.preventDefault(); } );
canvas.addEventListener("mousedown", handleMouse);