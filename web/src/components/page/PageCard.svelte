<script>
  import { getContext } from "svelte";
  $: defaults = getContext("defaults");

  export let title = "";
  export let description = "";
  export let image = "";
  export let slug = "";
  export let keywords = null;
  //export let categories=null
</script>

<div class=" {$$props.class}">
  <div class=" bg-white rounded-lg overflow-hidden shadow relative">

    <a rel="prefetch" href={slug} {title} class="m-0 p-0">
      <img
        class="h-56 w-full object-cover object-center"
        src="{image ? image : defaults.defaultImage}?w=1000&format=auto"
        alt="" />
    </a>

    <div class="p-4 h-auto ">
      <a
        href={slug}
        {title}
        class="block text-orange-500 hover:text-gray-800 font-semibold mb-2
        text-lg md:text-base lg:text-lg">
        {title}
      </a>
      <div
        class="w-full text-gray-600 text-sm leading-relaxed block md:text-xs
        lg:text-sm h-12 mb-1 ">
        {description}
      </div>
      {#if keywords}
        <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
          {#each keywords as keyword}
            <a
              class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase
              text-gray-700"
              title={keyword}
              href="blog/{keyword}">
              #{keyword}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
