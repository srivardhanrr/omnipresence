<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { fade } from 'svelte/transition';
    import { isGridView } from '$lib/stores/gridStore';

    let currentProject = 0;
    let mainContainer;
    let projectsContainer;
    let sliderContainer;
    let isDragging = false;
    let startX;
    let scrollLeft;
    let imageRefs = [];

    const projects = [
        {
            id: 1,
            title: 'URBAN LIVING',
            subtitle: 'CONTEMPORARY SPACES',
            description: 'Architecture and Interior Design',
            image: '/images/portfolio/interior.jpg',
            category: 'RESIDENTIAL'
        },
        {
            id: 2,
            title: 'URBAN LIVING',
            subtitle: 'CONTEMPORARY SPACES',
            description: 'Modern Urban Development Project',
            image: '/images/portfolio/heritage.png',
            category: 'RESIDENTIAL'
        },
        // Add more projects as needed
    ];

    let tl = gsap.timeline({ paused: true });

    onMount(() => {
        // Initialize zoom animation for the first image
        startImageZoom(currentProject);

        // Initialize the timeline for grid view transition
        tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.inOut" }
        });

        tl.to(mainContainer, {
            scale: 0.65,
            duration: 1.2,
        })
            .to(projectsContainer, {
                scale: 0.8,
                y: "-10%",
                duration: 1.2,
            }, "<")
            .to(".project-info", {
                opacity: 0,
                y: 20,
                duration: 0.5,
            }, "<")
            .to(".grid-projects", {
                opacity: 1,
                visibility: "visible",
                duration: 0.5,
            });

        // Initialize slider touch events
        if (sliderContainer) {
            sliderContainer.addEventListener('mousedown', startDragging);
            sliderContainer.addEventListener('touchstart', startDragging);
            window.addEventListener('mousemove', drag);
            window.addEventListener('touchmove', drag);
            window.addEventListener('mouseup', stopDragging);
            window.addEventListener('touchend', stopDragging);
        }

        return isGridView.subscribe(value => {
            if (value) {
                tl.play();
                document.body.style.overflow = 'hidden';
            } else {
                tl.reverse();
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                }, 1000);
            }
        });
    });

    function startImageZoom(index) {
        if (imageRefs[index]) {
            gsap.fromTo(imageRefs[index],
                { scale: 1 },
                {
                    scale: 1.1,
                    duration: 20,
                    ease: "none",
                    repeat: -1,
                    yoyo: true
                }
            );
        }
    }

    function selectProject(index) {
        if (currentProject === index) return;

        // Stop current zoom animation
        if (imageRefs[currentProject]) {
            gsap.killTweensOf(imageRefs[currentProject]);
        }

        gsap.to(sliderContainer, {
            scrollLeft: index * sliderContainer.offsetWidth,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
                // Start new zoom animation
                startImageZoom(index);
            }
        });

        currentProject = index;
        isGridView.set(false);
    }

    function startDragging(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        scrollLeft = sliderContainer.scrollLeft;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = (x - startX) * 2;
        sliderContainer.scrollLeft = scrollLeft - walk;
    }

    function stopDragging() {
        isDragging = false;
    }
</script>

<div class="relative w-full h-screen overflow-hidden bg-black" bind:this={mainContainer}>
    <!-- Main Project View -->
    <div
            bind:this={projectsContainer}
            class="relative w-full h-full"
    >
        <div
                bind:this={sliderContainer}
                class="w-full h-full flex snap-x snap-mandatory overflow-x-hidden"
                style="scroll-behavior: smooth;"
        >
            {#each projects as project, i}
                <div class="min-w-full h-full snap-center relative flex-shrink-0">
                    <img
                            bind:this={imageRefs[i]}
                            src={project.image}
                            alt={project.title}
                            class="absolute inset-0 w-full h-full object-cover transform-gpu"
                    />

                    <div class="absolute bottom-20 left-20 text-white z-10 project-info">
                        <div class="text-sm tracking-widest mb-2">{project.subtitle}</div>
                        <h1 class="text-6xl font-light mb-4">{project.title}</h1>
                        <p class="text-lg font-light max-w-md">{project.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Grid View -->
    {#if $isGridView}
        <div class="grid-projects fixed inset-0 invisible opacity-0 pt-32 pb-20 px-20">
            <div class="grid grid-cols-2 gap-8 h-full">
                {#each projects as project, i}
                    <button
                            class="relative aspect-video overflow-hidden group"
                            on:click={() => selectProject(i)}
                    >
                        <img
                                src={project.image}
                                alt={project.title}
                                class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div class="absolute inset-0 p-8 text-white flex flex-col justify-end group-hover:bg-black/20 transition-all duration-500">
                            <div class="text-sm tracking-widest mb-2">{project.category}</div>
                            <h3 class="text-2xl font-light">{project.title}</h3>
                        </div>
                    </button>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Project Navigation -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
        {#each projects as _, i}
            <button
                    class="w-12 h-1 bg-white/30 transition-all duration-300"
                    class:bg-white={currentProject === i}
                    on:click={() => selectProject(i)}
            ></button>
        {/each}
    </div>
</div>

<style>
    .grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    img {
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .snap-x::-webkit-scrollbar {
        display: none;
    }

    .snap-x {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>