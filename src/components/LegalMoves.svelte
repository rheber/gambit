<script>
  export let moves;
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
    {#each moves as moveObject}
      <tr class="move">
	  <td class="right">{moveObject.move}</td>
	  {#await moveObject.lichessData then lichessData}
	    <th class="left">{lichessData.opening?.name || ""}</th>
	    <td class="right">
	      {
		(lichessData.white || 0) +
		(lichessData.draws || 0) +
		(lichessData.black || 0)
	      }
	    </td>
	    <td class="right">{lichessData.white}</td>
	    <td class="right">{lichessData.draws}</td>
	    <td class="right">{lichessData.black}</td>
	  {/await}
      </tr>
    {/each}
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
