<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import ContactForm from '$lib/components/ContactForm.svelte';

    let pageContent;

    onMount(() => {
        const tl = gsap.timeline();

        tl.fromTo('.background-image',
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
        )
            .fromTo('.content-wrapper',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                '-=1'
            );
    });
</script>

<svelte:head>
    <title>Contact | omniprésence</title>
</svelte:head>

<div class="min-h-screen relative overflow-hidden">
    <!-- Background Image -->
    <div
            class="background-image absolute inset-0 bg-black opacity-0"
            style="background-image: url('/images/waves.avif'); background-size: cover; background-position: center;"
    >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Main Content Container -->
    <div class="relative z-10 min-h-screen container mx-auto px-4">

        <!-- Centered Content Grid -->
        <div class="content-wrapper h-screen flex items-center justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl w-full">
                <!-- Left Column - Contact Info -->
                <div class="text-white space-y-6 pt-4">
                    <h1 class="text-5xl font-light tracking-wider mb-12">CONTACT</h1>

                    <div class="space-y-1">
                        <p>3392 Marine Drive</p>
                        <p>West Vancouver, BC</p>
                        <p>Canada V7V 1M9</p>
                    </div>

                    <div class="space-y-1">
                        <p>Tel: 604-925-5170</p>
                        <p>Fax: 604-925-5176</p>
                        <p>info@lamoureuxarchitect.ca</p>
                    </div>

                    <div class="mt-8 text-sm text-white/70 max-w-md">
                        <p>We are currently actively seeking applications from Architects, Architectural Technologists and Interior Designers. Please send Resumes and Portfolios (Max 10mb) to info@lamoureuxarchitect.ca.</p>
                    </div>
                </div>

                <!-- Right Column - Contact Form -->
                <div>
                    <ContactForm />
                </div>
            </div>
        </div>
    </div>
</div>

