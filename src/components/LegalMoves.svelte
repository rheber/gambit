<script>
  export let moves;

  const totalGames = (row) => {
    return (row.lichessData.white || 0) +
      (row.lichessData.draws || 0) +
      (row.lichessData.black || 0);
  };

  const totalGamesCmp = (rowA, rowB) => {
    return totalGames(rowA) > totalGames(rowB) ? -1 : 1;
  };

  const percentResult = (row, amtGames) => {
    return `${Math.round(100 * amtGames / totalGames(row))}%`;
  };

  const usuallyDraw = (row) => {
    return row.lichessData.draws > row.lichessData.white && row.lichessData.draws > row.lichessData.black;
  }
  const usuallyWhite = (row) => {
    return row.lichessData.white > row.lichessData.draws && row.lichessData.white > row.lichessData.black;
  }
  const usuallyBlack = (row) => {
    return row.lichessData.black > row.lichessData.white && row.lichessData.black > row.lichessData.draws;
  }
</script>

<div class="root">
  <em>Legal Moves ({moves.length} total)</em>
  <table>
    <tr>
      <th>Move</th>
      <th>Name</th>
      <th>Games</th>
      <th>White</th>
      <th>Draw</th>
      <th>Black</th>
    </tr>
    {#await moves then rows}
      {#each rows.sort(totalGamesCmp) as row}
	<tr class="move">
	    <td class="right">{row.move}</td>
	      <th class="left">{row.lichessData.opening?.name || ""}</th>
	      <td class="right">{totalGames(row)}</td>
	      <td class="right" class:max="{usuallyWhite(row)}">{percentResult(row, row.lichessData.white)}</td>
	      <td class="right" class:max="{usuallyDraw(row)}">{percentResult(row, row.lichessData.draws)}</td>
	      <td class="right" class:max="{usuallyBlack(row)}">{percentResult(row, row.lichessData.black)}</td>
	</tr>
      {/each}
    {/await}
  </table>
</div>

<style>
  .root {
    flex-direction: column;
    width: 100%;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

  .max {
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>
