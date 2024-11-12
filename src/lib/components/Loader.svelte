<!-- src/lib/components/Loader.svelte -->
<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { browser } from '$app/environment';

    let duration = 2.8;
    let loaderContainer;
    let textContainer;
    let completed = $state(false);

    // Text to animate
    const text = "omniprésence";
    const letters = text.split('');

    onMount(() => {
        if (!browser) return;

        // Get all letter elements
        const letterElements = textContainer.querySelectorAll('.letter');

        // Initial setup
        gsap.set(letterElements, {
            y: 100,
            opacity: 0
        });

        const tl = gsap.timeline({
            onComplete: () => {
                completed = true;
                // Use a custom event for completion
                const event = new CustomEvent('loaderComplete');
                document.dispatchEvent(event);
            }
        });

        // Animation sequence
        tl
            // Fade in the white background
            .from(loaderContainer, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            })
            // Animate in each letter
            .to(letterElements, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.05,
                ease: "power4.out"
            })
            // Short pause to show the complete text
            .to(letterElements, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.02,
                ease: "power4.in"
            }, "+=0.5")
            // Slide up the white background
            .to(loaderContainer, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut"
            }, "-=0.3");
    });
</script>

<div
        class="fixed inset-0 z-50 flex items-center justify-center bg-white"
        class:pointer-events-none={completed}
        bind:this={loaderContainer}
>
    <h1
            bind:this={textContainer}
            class="text-black text-4xl md:text-6xl lg:text-7xl font-light tracking-wider overflow-hidden flex items-center"
    >
        {#each letters as letter}
            <span class="letter inline-block">{letter}</span>
        {/each}
    </h1>
</div>

<style>
    .letter {
        will-change: transform;
        display: inline-block;
        min-width: 0.1em;
    }
</style>