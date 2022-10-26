<script>
  export let moves;
</script>

<div class="root">
  <em>Legal Moves ({moves.length} total)</em>
  {#each moves as moveObject}
    <div class="move">
      <div>{moveObject.move}</div>
	{#await moveObject.lichessData then lichessData}
	  <div>{lichessData.opening.name}</div>
	  <div>{lichessData.white}</div>
	  <div>{lichessData.draws}</div>
	  <div>{lichessData.black}</div>
        {/await}
    </div>
  {/each}
</div>

<style>
  .root {
    flex-direction: column;
    width: 100%;
  }

  .move {
    display: flex;
    justify-content: space-between;
  }
</style>
