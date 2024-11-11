<script lang="ts">
    import '../app.css';
    let { children } = $props();
    import { browser } from '$app/environment'
    import { onMount, onDestroy } from 'svelte'
    import { initLenis, destroyLenis } from '$lib/lenis'
    import Header from "$lib/components/Header.svelte";

    onMount(() => {
        if (browser) {
            initLenis()
        }
    })

    onDestroy(() => {
        if (browser) {
            destroyLenis()
        }
    })
</script>

<div class="font-montserrat">
    <Header />
    <main>
        {@render children()}
    </main>
</div>