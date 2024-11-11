
<script>
    let formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };
</script>

<form
        on:submit={handleSubmit}
        class="w-full space-y-8"
>
    <!-- Name Field -->
    <div class="relative">
        <input
                type="text"
                bind:value={formData.name}
                required
                class="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                placeholder="Name *"
        />
    </div>

    <!-- Email Field -->
    <div class="relative">
        <input
                type="email"
                bind:value={formData.email}
                required
                class="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                placeholder="Email *"
        />
    </div>

    <!-- Phone Field -->
    <div class="relative">
        <input
                type="tel"
                bind:value={formData.phone}
                class="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                placeholder="Phone Number"
        />
    </div>

    <!-- Message Field -->
    <div class="relative">
        <textarea
                bind:value={formData.message}
                required
                rows="4"
                class="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Message *"
        ></textarea>
    </div>

    <!-- Submit Button -->
    <div class="text-right">
        <button
                type="submit"
                class="border border-white/20 px-8 py-2 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider"
        >
            SUBMIT
        </button>
    </div>
</form>

<style>
    /* Autofill styles */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
        -webkit-text-fill-color: white;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset;
        transition: background-color 5000s ease-in-out 0s;
    }

    :global(input::placeholder),
    :global(textarea::placeholder) {
        color: rgba(255, 255, 255, 0.5);
    }

    /* Remove default focus outline and add custom one */
    :global(input:focus),
    :global(textarea:focus) {
        outline: none;
        border-color: rgba(255, 255, 255, 0.8);
    }
</style>