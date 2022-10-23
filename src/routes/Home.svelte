<script>
    import { Chess } from 'chess.js'

    import Board from "../components/Board.svelte";

    export const params = {};

    const game = new Chess();
    let pgn = '';
    let moves = game.moves();

    const update = () => {
	pgn = game.pgn();
	moves = game.moves();
    };
</script>

<h1>Gambit</h1>

<div class="root">
    <Board game={game} update={update} />
    <div>
	<em>Legal Moves ({moves.length} total)</em>
	{#each moves as move}
	    <div>{move}</div>
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
