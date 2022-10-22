<script>
    import { Chessboard } from "@discape/chessboardjs";
    import { Chess } from 'chess.js'

    export const params = {};

    let board = null;
    const game = new Chess();

    let pgn = '';

    const onDragStart = (source, piece, position, orientation) => {
	// do not pick up pieces if the game is over
	if (game.isGameOver()) {
	    return false;
	}

	// only pick up pieces for the side to move
	if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
	    (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
	    return false;
	}

	return true;
    }

    const onDrop = (source, target) => {
	// see if the move is legal
	var move = game.move({
	    from: source,
	    to: target,
	    //promotion: 'q' // NOTE: always promote to a queen for example simplicity
	})

	// illegal move
	if (move === null) {
	    return 'snapback';
	}

	pgn = game.pgn();
    }

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    const onSnapEnd = () => {
	board.position(game.fen())
    };

    const loadBoard = () => {
	board = Chessboard('board1', {
	    position: 'start',
	    draggable: true,
	    onDragStart: onDragStart,
	    onDrop: onDrop,
	    onSnapEnd: onSnapEnd,
	});
    };
</script>

<h1>Gambit</h1>

<div use:loadBoard id="board1" style="width: 400px"></div>
<div>{pgn}</div>

<style lang="scss" global>
@import "../../node_modules/@discape/chessboardjs/dist/build/chessboard";
</style>
