<script>
    import { Chess } from 'chess.js'

    import Board from "../components/Board.svelte";

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

    const mapMove = (move) => {
	const fen = getFenForMove(game, move);
	getDataFromLichess(fen).then(console.log);
	return {
	    move,
	    fen,
	};
    };

    let moves = game.moves().map(mapMove);

    const update = () => {
	pgn = game.pgn();
	moves = game.moves().map(mapMove);
    };

</script>

<h1>Gambit</h1>

<div class="root">
    <Board game={game} update={update} />
    <div>
	<em>Legal Moves ({moves.length} total)</em>
	{#each moves as moveObject}
	    <div>{moveObject.move}</div>
	{/each}
    </div>
    <div>{pgn}</div>
</div>

<style lang="scss" global>
@import "../../node_modules/@discape/chessboardjs/dist/build/chessboard";

.root {
    display: flex;
    justify-content: space-between;
}
</style>
