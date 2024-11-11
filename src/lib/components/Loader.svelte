<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';

    let loaderWrapper;
    let brandName;
    let letterElements = [];
    let overlayTop;
    let overlayBottom;

    export let onLoadComplete = () => {};

    const letters = "omniprésence".split('');

    onMount(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onLoadComplete();
            }
        });

        // Initial setup
        gsap.set(letterElements, {
            y: 100,
            opacity: 0
        });

        gsap.set([overlayTop, overlayBottom], {
            height: '50vh'
        });

        // Animation sequence
        tl.to(letterElements, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "power3.out"
        })
            .to(brandName, {
                scale: 0.9,
                duration: 1,
                ease: "power2.inOut"
            })
            .to([overlayTop, overlayBottom], {
                height: 0,
                duration: 1.2,
                ease: "power4.inOut",
            }, "-=0.5")
            .to(loaderWrapper, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
    });
</script>

<div
        bind:this={loaderWrapper}
        class="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
>
    <!-- Top overlay -->
    <div
            bind:this={overlayTop}
            class="absolute top-0 left-0 w-full bg-black"
    ></div>

    <!-- Bottom overlay -->
    <div
            bind:this={overlayBottom}
            class="absolute bottom-0 left-0 w-full bg-black"
    ></div>

    <!-- Brand name container -->
    <div
            bind:this={brandName}
            class="relative z-10 overflow-hidden"
    >
        <div class="flex items-center justify-center">
            {#each letters as letter, i}
                <span
                        bind:this={letterElements[i]}
                        class="inline-block text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-black"
                >
                    {letter}
                </span>
            {/each}
        </div>
    </div>
</div>