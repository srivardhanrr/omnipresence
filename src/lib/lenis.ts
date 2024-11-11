import Lenis from 'lenis'

let lenis: Lenis | null = null

// Initialize lenis
export function initLenis() {
    if (typeof window === 'undefined') return

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    })

    function raf(time: number) {
        lenis?.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

// Clean up function
export function destroyLenis() {
    lenis?.destroy()
    lenis = null
}

// Export lenis instance
export function getLenis() {
    return lenis
}