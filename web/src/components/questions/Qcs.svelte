<script>
  import { onMount } from "svelte";
  import exerciceStore from "../../routes/exercice/exercice/exercice_store.js";

  import PortableText from "../portableText/PortableText.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let data = {};

  let selected = null;
  onMount(async () => {
    selected = [];
  });
  $: checkIfGood = option => {
    let correctionMode = false;

    const result = $exerciceStore.results[$exerciceStore.currentQuestion._key]
      ? $exerciceStore.results[$exerciceStore.currentQuestion._key]
      : {};
    if (result.hasOwnProperty("isCorrect")) {
      correctionMode = true;
      if (result.isCorrect === true) {
        if (option.isCorrect === true && option._key === selected) {
          return true;
        } else {
          return null;
        }
      } else {
        if (option.isCorrect) return true;
        if (option._key === selected) return false;
        return null;
      }
    } else {
      return null;
    }
  };

  const check = () => {
    let isCorrect = false;
    Object.values($exerciceStore.currentQuestion.options).some(option => {
      if (option.isCorrect && option._key === selected) {
        isCorrect = true;
        return true;
      }

      isCorrect = false;
    });

    exerciceStore.doAction("check", {
      _key: data._key,
      answer: { selected },
      isCorrect: isCorrect
    });
  };
</script>

<style>
  label {
    display: block;
  }
  .good {
    background-color: green;
    color: #fff;
  }

  .wrong {
    background-color: red;
    color: #fff;
  }
</style>

<main id="main">
  <form>
    {#each $exerciceStore.currentQuestion.options as option (option._key)}
      <label
        class="p-5 mb-5 border border-gray-300"
        class:good={checkIfGood(option) === true}
        class:wrong={checkIfGood(option) === false}>
        <input
          type="radio"
          bind:group={selected}
          value={option._key}
          class="mr-5" />
        {option.text}
      </label>
    {/each}
    {#if !$exerciceStore.results || !$exerciceStore.results.hasOwnProperty($exerciceStore.currentQuestion._key)}
      <button
        class="primary-button mt-5"
        on:click|preventDefault
        type="submit"
        on:click={check}>
        Vérifier
      </button>
    {/if}

  </form>
</main>
