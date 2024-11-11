<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { Instagram, Mail } from 'lucide-svelte';
    import { isGridView } from '$lib/stores/gridStore';

    let isMenuOpen = false;
    let isPortfolioOpen = false;
    let activeImage = '';
    let menuOverlay;
    let mainMenu;
    let submenuRef;
    let imagePreview;
    let menuTimeline;
    let submenuTimeline;

    const menuItems = [
        { title: 'SERVICES', path: '/services' },
        { title: 'PORTFOLIO >', path: '#', hasSubmenu: true },
        { title: 'ABOUT', path: '/about' },
        { title: 'CONTACT', path: '/contact' }
    ];

    const submenuItems = [
        {
            title: 'RESIDENTIAL',
            path: '/portfolio/residential',
            image: '/images/portfolio/residential.png'
        },
        {
            title: 'COMMERCIAL',
            path: '/portfolio/commercial',
            image: '/images/portfolio/commercial.png'
        },
        {
            title: 'CONSERVATION & HERITAGE',
            path: '/portfolio/conservation-heritage',
            image: '/images/portfolio/heritage.png'
        }
    ];

    onMount(() => {
        // Set initial positions
        gsap.set(submenuRef, { x: '100%' });

        // Initialize main menu timeline
        menuTimeline = gsap.timeline({
            paused: true,
            onReverseComplete: () => {
                isMenuOpen = false;
                if (isPortfolioOpen) {
                    isPortfolioOpen = false;
                    gsap.set([mainMenu, submenuRef], { clearProps: "all" });
                }
            }
        });

        // Main menu animation
        menuTimeline
            .fromTo(menuOverlay, {
                opacity: 0,
                visibility: 'hidden'
            }, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3,
                ease: "power2.inOut"
            })
            .fromTo('.menu-item', {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            }, "-=0.2")
            .fromTo('.footer-content', {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.8");

        // Initialize submenu timeline
        submenuTimeline = gsap.timeline({ paused: true });

        submenuTimeline
            .to(mainMenu, {
                x: '-25%',
                duration: 1,
                ease: "power3.inOut"
            })
            .to(submenuRef, {
                x: '0%',
                duration: 1,
                ease: "power3.inOut"
            }, "-=1")
            .fromTo('.submenu-item', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5");
    });

    function toggleMenu() {
        if (!isMenuOpen) {
            isMenuOpen = true;
            document.body.style.overflow = 'hidden';
            menuTimeline.play();
        } else {
            document.body.style.overflow = 'auto';
            if (isPortfolioOpen) {
                submenuTimeline.reverse();
                isPortfolioOpen = false;
            }
            menuTimeline.reverse();
            activeImage = '';
        }
    }

    function togglePortfolio() {
        isPortfolioOpen = !isPortfolioOpen;
        if (isPortfolioOpen) {
            submenuTimeline.play();
        } else {
            submenuTimeline.reverse();
            activeImage = '';
        }
    }

    function handleSubmenuHover(image) {
        if (!imagePreview) return;
        gsap.to(imagePreview, {
            opacity: 0,
            duration: 0.1,
            onComplete: () => {
                activeImage = image;
                gsap.to(imagePreview, {
                    opacity: 0.4,
                    duration: 0.1,
                });
                gsap.to(imagePreview, {
                    scale: 1.1,
                    duration: 6,
                    ease: "power1.inOut"
                });
            }
        });
    }

    function handleSubmenuLeave() {
        if (!imagePreview) return;
        gsap.to(imagePreview, {
            opacity: 0,
            duration: 0.1,
            ease: "power2.inOut",
            onComplete: () => {
                activeImage = '';
                gsap.set(imagePreview, { scale: 1 });
            }
        });
    }

    function toggleGridView() {
        isGridView.update(v => !v);
    }
</script>

<header class="fixed w-full z-50">
    <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center relative z-20">
            <!-- Brand Name -->
            <a href="/" class="text-2xl tracking-wider font-medium text-white hover:text-gray-200 transition-colors">
                omniprésence
            </a>

            <div class="flex items-center gap-4">
                <!-- Grid Toggle Button -->
                <button
                        class="w-10 h-10 flex items-center justify-center"
                        on:click={toggleGridView}
                >
                    <div class="w-6 h-6 grid grid-cols-2 gap-0.5">
                        {#each Array(4) as _}
                            <div class="bg-white"></div>
                        {/each}
                    </div>
                </button>

                <!-- Menu Button -->
                <button
                        class="w-10 h-10 flex flex-col justify-center items-center gap-1.5 relative z-50"
                        on:click={toggleMenu}
                        aria-label="Toggle menu"
                >
                    <span
                            class="w-7 h-0.5 bg-white transition-transform duration-300"
                            class:rotate-45={isMenuOpen}
                            class:translate-y-[6px]={isMenuOpen}
                    ></span>
                    <span
                            class="w-7 h-0.5 bg-white transition-transform duration-300"
                            class:-rotate-45={isMenuOpen}
                            class:-translate-y-[6px]={isMenuOpen}
                    ></span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Menu Overlay -->
    <div
            class="fixed inset-0 bg-black/95 backdrop-blur-sm invisible overflow-hidden"
            bind:this={menuOverlay}
    >
        <!-- Background Image Preview -->
        <div
                bind:this={imagePreview}
                class="absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-300 origin-center"
                style="background-image: url('{activeImage}'); z-index: 1;"
        ></div>

        <!-- Dark overlay for better text readability -->
        <div class="absolute inset-0 bg-black/40 z-2"></div>

        <div class="h-full relative z-10">
            <!-- Main Menu -->
            <div
                    class="h-full flex items-center justify-center z-10 relative"
                    bind:this={mainMenu}
            >
                <ul class="space-y-8">
                    {#each menuItems as item}
                        <li class="menu-item">
                            {#if item.hasSubmenu}
                                <button
                                        class="text-3xl xl:text-4xl text-white/90 hover:text-white transition-colors duration-500 font-medium tracking-wider"
                                        class:active={isPortfolioOpen}
                                        on:click={togglePortfolio}
                                >
                  <span class="inline-block hover:-translate-y-2 transition-transform duration-500">
                    {item.title}
                  </span>
                                </button>
                            {:else}
                                <a
                                        href={item.path}
                                        class="text-3xl xl:text-4xl text-white/90 hover:text-white transition-colors duration-500 font-medium tracking-wider"
                                >
                  <span class="inline-block hover:-translate-y-2 transition-transform duration-500">
                    {item.title}
                  </span>
                                </a>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Submenu Container -->
            <div
                    bind:this={submenuRef}
                    class="fixed top-0 right-0 h-full w-1/2 flex items-center pl-16 z-20"
            >
                <!-- Vertical Line -->
                <div class="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-primary"></div>

                <ul class="space-y-6 relative">
                    {#each submenuItems as item}
                        <li
                                class="submenu-item relative"
                                on:mouseenter={() => handleSubmenuHover(item.image)}
                                on:mouseleave={handleSubmenuLeave}
                        >
                            <a
                                    href={item.path}
                                    class="text-xl xl:text-2xl text-white hover:text-white transition-colors duration-500 font-normal tracking-widest relative z-10"
                            >
                <span class="inline-block hover:-translate-y-2 transition-transform duration-500">
                  {item.title}
                </span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Footer -->
            <div class="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-center z-20 footer-content">
                <!-- Copyright Text -->
                <div class="text-white/70 text-sm tracking-wide">
                    © 2024 Omnipresense Studio. All rights reserved.
                </div>

                <!-- Social Icons -->
                <div class="flex items-center gap-6">
                    <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-white/70 hover:text-white transition-colors duration-300"
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                            href="mailto:contact@email.com"
                            class="text-white/70 hover:text-white transition-colors duration-300"
                    >
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>

<style>
    .active {
        @apply text-white font-medium;
    }

    .bg-cover {
        background-size: cover;
        background-position: center;
        transition: opacity 0.3s ease-in-out;
    }

    :global(svg) {
        vertical-align: middle;
    }
</style>