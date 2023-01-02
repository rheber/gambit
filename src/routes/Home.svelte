<script>
    import { Chess } from 'chess.js'
    import Board from "../components/Board.svelte";
    import LegalMoves from "../components/LegalMoves.svelte";

    export const params = {};

    const game = new Chess();
    let pgn = '';

    const getFenForMove = (currentGame, move) => {
	const hypotheticalGame = new Chess(currentGame.fen());
	hypotheticalGame.move(move);
	return hypotheticalGame.fen();
    };

    const getDataFromLichess = async (fen) => {
	const response = await fetch(`https://explorer.lichess.ovh/masters?fen=${fen}`);
	const data = await response.json();
	return data;
    };

    const mapMove = async (move) => {
	const fen = getFenForMove(game, move);
	const lichessData = await getDataFromLichess(fen);
	return {
	    move,
	    fen,
	    lichessData,
	};
    };

    let moves = Promise.all(game.moves().map(mapMove));

    const update = () => {
	pgn = game.pgn();
	moves = Promise.all(game.moves().map(mapMove));
    };

    const worker = new Worker("worker.js");
</script>

<h1>Gambit</h1>

<div class="root">
    <Board game={game} update={update} />
    <LegalMoves moves={moves} />
    <div>{pgn}</div>
</div>

<style lang="scss" global>
@import "../../node_modules/@discape/chessboardjs/dist/build/chessboard";

.root {
    display: flex;
    justify-content: space-between;
}
</style>
