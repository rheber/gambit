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
	      <td class="right">{percentResult(row, row.lichessData.white)}</td>
	      <td class="right">{percentResult(row, row.lichessData.draws)}</td>
	      <td class="right">{percentResult(row, row.lichessData.black)}</td>
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

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>
