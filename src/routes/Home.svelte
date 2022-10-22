<script>
    import { Chessboard } from "@discape/chessboardjs";

    export const params = {};

    const loadBoard = () => {
	var board1 = Chessboard('board1', {
	    position: 'start',
	    draggable: true,
	});
    };
</script>

<h1>Gambit</h1>

<div use:loadBoard id="board1" style="width: 400px"></div>

<style lang="scss" global>
@import "../../node_modules/@discape/chessboardjs/dist/build/chessboard";
</style>
