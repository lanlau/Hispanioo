<script>
  import PageCard from "./PageCard.svelte";

  export let pages = [];
</script>

{#if pages}
  <section class="{$$props.class} block flex flex-wrap mt-5">
    {#each pages as page}
      <PageCard
        class="w-full lg:w-1/3 p-1 mb-4 mb-5"
        title={page.title}
        description={page.description ? page.description : ''}
        image={page.image}
        slug="page/{page.slug}" />
    {/each}
  </section>
{/if}
