<script context="module">
  import client from "../../sanityClient";
  import toHTML from "../../serialize/index.js";
  import SEO from "../../components/SEO.svelte";
  import JsonVisualizer from "../../components/Json-visualizer.svelte";

  import Hero from "../../components/Hero.svelte";

  const getDate = date => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString("fr-FR", { dateStyle: "long" });
  };

  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params;
    const filter = '*[_type == "blog_post" && slug.current == $slug][0]';

    const projection = `{
    
      ...,
      excerpt,
      categories[]->{_id,title, "slug":slug.current},
      tags[]->{_id,name, "slug":slug.current},
      author->{_id,name, "url":image.asset->.url   },
      "mainImage":mainImage.asset->.url,
      body[]{
        ...,
        _type=="File"=>{_type,asset->{url,originalFilename}},
        markDefs[]{...,_type=="pdf"=>{_type,asset->{url}}},
        children[]{
          ...,
          _type=="File"=>{_type,asset->{url,originalFilename}},
          _type == 'authorReference' => {
            author->
          }
          
        }
      }
    }`;

    const query = filter + projection;
    const post = await client
      .fetch(query, { slug })
      .catch(err => this.error(500, err));

    return {
      post: {
        ...post,
        body: toHTML(post.body)
      }
    };
  }
</script>

<script>
  export let post = { categories: [], tags: [] };
</script>

<style>

</style>

<SEO
  title={post.title}
  description={post.excerpt}
  image={post.mainImage}
  thumb={post.mainImage} />

<h1 class="title">{post.title}</h1>

<Hero image={post.mainImage} />
<p class="pt-5 mb-5 capitalize text-gray-600 text-xs">
  <span>{getDate(post.publishedAt)}</span>
  <span class="lowercase">dans</span>
  {#if post.categories}
    {#each post.categories as category, idx}
      {#if idx > 0},{/if}
      <a
        class="text-orange-600 capitalize text-xs font-light"
        rel="prefetch"
        href="category/{category.slug}">
        {category.title}
      </a>
    {/each}
  {/if}
</p>

{#if post}
  <div class="page-content">
    {@html post.excerpt}
    {#if post.body}
      {@html post.body}
    {/if}
  </div>
  {#if post.tags && post.tags.length > 0}
    <div class="mt-10">
      <span class="font-bold text-xs mb-5">Tags:</span>
      <p>
        {#each post.tags as tag}
          <a
            href="tag/{tag.slug}"
            class="helvetica text-white text-xs p-1 mr-2 bg-orange-600
            hover:bg-gray-800 capitalize">
            {tag.name}
          </a>
        {/each}
      </p>
    </div>
  {/if}
{/if}
