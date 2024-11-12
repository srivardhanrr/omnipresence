<script lang="ts">
    import '../app.css';
    let { children } = $props();
    import { browser } from '$app/environment'
    import { onMount, onDestroy } from 'svelte'
    import { initLenis, destroyLenis } from '$lib/lenis'
    import Header from "$lib/components/Header.svelte";
    import Loader from "$lib/components/Loader.svelte";

    // Track initial load
    let isInitialLoad = $state(true);
    let contentVisible = $state(false);

    const handleLoaderComplete = () => {
        contentVisible = true;
    };

    onMount(() => {
        if (browser) {
            initLenis();
            document.addEventListener('loaderComplete', handleLoaderComplete);
        }
    });

    onDestroy(() => {
        if (browser) {
            destroyLenis();
            document.removeEventListener('loaderComplete', handleLoaderComplete);
        }
    });
</script>

{#if browser}
    {#if isInitialLoad}
        <Loader />
    {/if}

    <div class="font-montserrat"
         class:opacity-0={isInitialLoad && !contentVisible}
         class:transition-opacity={true}
         class:duration-500={true}>
        <Header />
        <main>
            {@render children()}
        </main>
    </div>
{/if}